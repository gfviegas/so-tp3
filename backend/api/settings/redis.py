# Configurando Redis
import os
import redis

class RedisManager(object):
    def __init__(self):
        self.redis = None

    def is_redis_available(self):
        if self.redis is None:
            return False

        try:
            self.redis.client_list()
        except (redis.ConnectionError):
            return False

        return True

    def connect(self):
        if not self.is_redis_available():
            self.redis = redis.Redis(host=os.environ.get('REDIS_HOST'),
                                     charset='utf-8', decode_responses=True)
            self.redis.sadd('bar', 'foo')


rm = RedisManager()
