# Primeira coisa: carregar variáveis de ambiente
from dotenv import load_dotenv
load_dotenv()

# Importando FW
from flask import Flask, Blueprint
from flask_restful import Resource, Api

# Conectando Redis
from api.settings.redis import rm
rm.connect()

# Carregando RESTful Resources
from api.resources.setup import SetupList
from api.resources.simulations import (SimulationsList, Simulation,
                                       SimulationDirectory, SimulationFile)
from api.resources.express import SimulationExpress

# Boot Flask App e API
app = Flask(__name__)
bp = Blueprint('api', __name__)
api = Api(bp)

# Adicionando Resources
api.add_resource(SetupList, '/')
api.add_resource(SimulationsList, '/simulations')
api.add_resource(Simulation, '/simulations/<string:simulationId>')
api.add_resource(SimulationDirectory,
                 '/simulations/<string:simulationId>/directory')
api.add_resource(SimulationFile,
                 '/simulations/<string:simulationId>/file')
api.add_resource(SimulationExpress,
                 '/simulations/<string:simulationId>/express')

# Registrando Blueprint
app.register_blueprint(bp, url_prefix='/api')

if __name__ == '__main__':
    app.config['simulations'] = {}
    app.run(host='0.0.0.0', debug=True, threaded=False)
