from api.settings.redis import um
import pickle
from flask import current_app as app

um.connect()
def get_simulations():
    return um.redis.smembers('simInstances')

def get_simulation(key):
    exists = um.redis.exists(key)

    if (not exists):
        raise Exception('Simulation Instance does not exists')

    unpickledSim = pickle.loads(um.redis.get(key))

    return unpickledSim


def push_simulation(key, sim):
    pickledSimulation = pickle.dumps(sim)
    return um.redis.set(key, pickledSimulation)
