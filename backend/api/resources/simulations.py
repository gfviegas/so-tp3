from flask_restful import Resource, reqparse

import uuid
from api.settings.redis import rm
from api.models.manager import Manager
from api.settings.simulations import get_simulations


class SimulationsList(Resource):
    def get(self):
        sim = list(rm.redis.smembers('simulations'))
        return {'simulations': sim}, 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('blockSize', type=int, required=True, help='Tamanho do bloco')
        parser.add_argument('numBlocks', type=int, required=True, help='Quantidade de blocos')

        args = parser.parse_args(strict=True)
        id = str(uuid.uuid4())[:8]

        simulations = get_simulations()
        simManager = Manager(args['numBlocks'], args['blockSize'], id)
        simulations[id] = simManager
        print(simulations)

        # Adicionando ID no cache
        s = rm.redis.sadd('simulations', id)
        return {'status': s, 'id': id}, 201

    def delete(self, id):
        s = rm.redis.srem('simulations', id)
        return {'status': s}, 204

class Simulation(Resource):
    def get(self, simulationId):
        # Verifica se a simulacao existe
        exists = rm.redis.sismember('simulations', simulationId)

        if (not exists):
            return {'error': 'simulation_not_found'}, 404

        simulations = get_simulations()
        simManager = simulations[simulationId]

        return {
            'numBlocks': simManager.numBlocks,
            'blockSize': simManager.blockSize,
            'diskSize': simManager.blockSize * simManager.numBlocks
        }, 200
