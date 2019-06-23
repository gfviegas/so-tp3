from flask_restful import Resource, reqparse

from werkzeug import FileStorage
from io import TextIOWrapper, BytesIO
from random import randint
from re import findall
from flask import g

from api.settings.redis import rm
from api.settings.simulations import get_simulations

class SimulationExpress(Resource):
    def post(self, simulationId):

        parse = reqparse.RequestParser()
        parse.add_argument('file', type=FileStorage, location='files',
                           required=True, help='Arquivo de Entrada')

        args = parse.parse_args()
        output = list()
        output.append('ok')

        stream = args['file'].stream
        bytesData = stream.read()

        simulations = get_simulations()
        self.simManager = simulations[simulationId]

        f = TextIOWrapper(BytesIO(bytesData), 'utf-8')
        for line in f.readlines():
            command = line.rstrip()
            output.append('** Processando o comando: {}.'.format(command))
            output.append(self.processCommand(command))
            output.append('.')

        return {'output': output}, 201

    # Placeholder
    def emptyFunc(self, args=list()):
        return 'Argumentos: {}'.format(', '.join(str(x) for x in args))

    def getAssociatedCommands(self, args):
        return {
            'pwd': self.emptyFunc,
            'create': self.simManager.createFile(args[0], args[1]),
            'rm': self.simManager.remove(args[0]),
            'rn': self.simManager.rename(args[0], args[1]),
            'cat': self.simManager.rename(args[0]),
            'ls': self.emptyFunc,
            'mkdir': self.simManager.createDirectory(args[0]),
            'rndir': self.simManager.remove(args[0], args[1]),
            'rmdir': self.simManager.remove(args[0]),
            'cd': self.simManager.openDirectory(args[0])
        }


    def processCommand(self, command):
        commandSplitted = findall(r'(?:"[^"]*"|[^\s"])+', command)
        operation = commandSplitted[0]
        args = commandSplitted[1:]

        output = self.getAssociatedCommands(args)[operation]

        return 'Comando executado. \n Saída: {}'.format(output)
