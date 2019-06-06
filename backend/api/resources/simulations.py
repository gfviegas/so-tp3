from flask_restful import Resource

import uuid
from api.settings.redis import rm

class Simulations(Resource):
    def get(self):
        sim = list(rm.redis.smembers('simulations'))
        return {'simulations': sim}, 200

    def post(self):
        id = str(uuid.uuid4())[:8]
        s = rm.redis.sadd('simulations', id)

        # Criar simulacao...
        return {'status': s, 'id': id}, 201

    def delete(self, id):
        s = rm.redis.srem('simulations', id)
        return {'status': s}, 204
