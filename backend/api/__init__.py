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
from api.resources.setup import Setup

# Boot Flask App e API
app = Flask(__name__)
bp = Blueprint('api', __name__)
api = Api(bp)

# Adicionando Resources
api.add_resource(Setup, '/')

# Registrando Blueprint
app.register_blueprint(bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
