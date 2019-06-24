from flask_restful import Resource, reqparse

import uuid
from os import path, listdir, remove

from api.settings.redis import rm, um
from api.models.manager import Manager
from api.settings.simulations import get_simulation, push_simulation


class SimulationsList(Resource):
    def get(self):
        sim = list(rm.redis.smembers('simulations'))
        return {'simulations': sim}, 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('blockSize', type=int, required=True,
                            help='Tamanho do bloco')
        parser.add_argument('numBlocks', type=int, required=True,
                            help='Quantidade de blocos')

        args = parser.parse_args(strict=True)
        id = str(uuid.uuid4())[:8]

        simManager = Manager(args['numBlocks'], args['blockSize'], id)
        push_simulation(id, simManager)

        # Adicionando ID no cache
        s = rm.redis.sadd('simulations', id)
        return {'status': s, 'id': id}, 201

    def delete(self):
        # Limpa o cache
        rm.redis.flushdb()

        # Remove tudo da pasta disks
        dirname = path.dirname(__file__)
        dir = path.join(dirname, '../disks')
        for f in listdir(dir):
            if not f.endswith('.gitkeep'):
                remove(path.join(dir, f))

        return {}, 204

class Simulation(Resource):
    def get(self, simulationId):
        # Verifica se a simulacao existe
        exists = rm.redis.sismember('simulations', simulationId)

        if (not exists):
            return {'error': 'simulation_not_found'}, 404

        simManager = get_simulation(simulationId)

        return {
            'numBlocks': simManager.numBlocks,
            'blockSize': simManager.blockSize,
            'diskSize': simManager.blockSize * simManager.numBlocks
        }, 200

    def delete(self, simulationId):
        rm.redis.srem('simulations', simulationId)
        um.redis.delete(simulationId)
        return {}, 204

class SimulationFile(Resource):
    def get(self, simulationId):
        # Verifica se a simulação existe
        exists = rm.redis.sismember('simulations', simulationId)

        if (not exists):
            return {'error': 'simulation_not_found'}, 404

        parser = reqparse.RequestParser()
        parser.add_argument('file', type=str, required=True,
                            help='Nome do Arquivo')

        args = parser.parse_args(strict=True)
        simManager = get_simulation(simulationId)

        return simManager.openFile(args['file']), 200

    def post(self, simulationId):
        # Verifica se a simulação existe
        exists = rm.redis.sismember('simulations', simulationId)

        if (not exists):
            return {'error': 'simulation_not_found'}, 404

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True,
                            help='Nome do Arquivo')
        parser.add_argument('content', type=str, required=True,
                            help='Conteúdo do Arquivo')

        args = parser.parse_args(strict=True)
        simManager = get_simulation(simulationId)

        simManager.createFile(args['name'], args['content'])

        # Atualiza instancia da simulacao no cache
        push_simulation(simulationId, simManager)

        return simManager.listDirectory(), 201

class SimulationDirectory(Resource):
    def get(self, simulationId):
        # Verifica se a simulação existe
        exists = rm.redis.sismember('simulations', simulationId)

        if (not exists):
            return {'error': 'simulation_not_found'}, 404

        simManager = get_simulation(simulationId)

        return simManager.listDirectory(), 200

    def post(self, simulationId):
        # Verifica se a simulação existe
        exists = rm.redis.sismember('simulations', simulationId)

        if (not exists):
            return {'error': 'simulation_not_found'}, 404

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True,
                            help='Nome do Diretório')

        args = parser.parse_args(strict=True)
        simManager = get_simulation(simulationId)

        simManager.createDirectory(args['name'])

        # Atualiza instancia da simulacao no cache
        push_simulation(simulationId, simManager)

        return simManager.listDirectory(), 201

    def put(self, simulationId):
        # Verifica se a simulação existe
        exists = rm.redis.sismember('simulations', simulationId)
        if (not exists):
            return {'error': 'simulation_not_found'}, 404

        parser = reqparse.RequestParser()
        parser.add_argument('directory', type=str, required=True,
                            help='Diretório de Destino')

        args = parser.parse_args(strict=True)
        simManager = get_simulation(simulationId)

        simManager.openDirectory(args['directory'])

        # Atualiza instancia da simulacao no cache
        push_simulation(simulationId, simManager)

        return simManager.listDirectory(), 200

class SimulationItem(Resource):
    def patch(self, simulationId):
        # Verifica se a simulação existe
        exists = rm.redis.sismember('simulations', simulationId)

        if (not exists):
            return {'error': 'simulation_not_found'}, 404

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True,
                            help='Nome do Item Atual')
        parser.add_argument('new_name', type=str, required=True,
                            help='Nome novo do Item')

        args = parser.parse_args(strict=True)
        simManager = get_simulation(simulationId)

        simManager.rename(args['name'], args['new_name'])

        # Atualiza instancia da simulacao no cache
        push_simulation(simulationId, simManager)

        return simManager.listDirectory(), 201

    def delete(self, simulationId):
        # Verifica se a simulação existe
        exists = rm.redis.sismember('simulations', simulationId)

        if (not exists):
            return {'error': 'simulation_not_found'}, 404

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True,
                            help='Nome do Item')

        args = parser.parse_args(strict=True)
        simManager = get_simulation(simulationId)

        simManager.remove(args['name'])

        # Atualiza instancia da simulacao no cache
        push_simulation(simulationId, simManager)

        return simManager.listDirectory(), 201
