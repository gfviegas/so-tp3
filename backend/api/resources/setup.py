from flask_restful import Resource

from os import environ
from api.settings.redis import rm

class Setup(Resource):
    def get(self):
        teste = list(rm.redis.smembers('bar'))
        return {'Teste': environ.get('REDIS_HOST'), 'bar': teste}, 200

    def post(self):
        pass
