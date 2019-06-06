from flask_restful import Resource, reqparse

import uuid
from api.settings.redis import rm

class Simulations(Resource):
    def get(self):
        sim = list(rm.redis.smembers('simulations'))
        return {'simulations': sim}, 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('blockSize', type=int, required=True, help='Tamanho do bloco')
        parser.add_argument('numBlocks', type=int, required=True, help='Quantidade de blocos')

        args = parser.parse_args(strict=True)
        id = str(uuid.uuid4())[:8]

        # TODO: Criar simulacao...

        s = rm.redis.sadd('simulations', id)
        return {'status': s, 'id': id}, 201

    def delete(self, id):
        s = rm.redis.srem('simulations', id)
        return {'status': s}, 204
