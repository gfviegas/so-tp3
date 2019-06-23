from flask import current_app

def get_simulations():
    if not 'simulations' in current_app.config:
        current_app.config['simulations'] = {}

    print(current_app.config.simulations, flush=True)
    return current_app.config.simulations
