from flask import current_app as app

def get_simulations():
    if not 'simulations' in app.config:
        app.config['simulations'] = {}

    print(app.config['simulations'], flush=True)
    return app.config['simulations']
