import sys

from flask_restful import Resource, reqparse

from werkzeug import FileStorage
from io import TextIOWrapper, BytesIO
from random import randint
from re import findall
from flask import g

from api.settings.redis import rm
from api.settings.simulations import get_simulation

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

        self.simManager = get_simulation(simulationId)

        f = TextIOWrapper(BytesIO(bytesData), 'utf-8')
        for line in f.readlines():
            command = line.rstrip()
            print(command, flush=True, file=sys.stdout)
            output.append('** Processando o comando: {}.'.format(command))
            output.append(self.processCommand(command))

        return {'output': output}, 201

    # Placeholder
    def emptyFunc(self, args=list()):
        return 'Argumentos: {}'.format(', '.join(str(x) for x in args))

    def runAssociatedCommand(self, operation, args):
        if (operation == 'pwd'):
            return self.emptyFunc()
        elif (operation == 'create'):
            return self.simManager.createFile(args[0], args[1])
        elif (operation == 'rm'):
            return self.simManager.remove(args[0])
        elif (operation == 'rn'):
            return self.simManager.rename(args[0], args[1])
        elif (operation == 'cat'):
            return self.simManager.openFile(args[0])
        elif (operation == 'ls'):
            return self.simManager.listDirectory()
        elif (operation == 'mkdir'):
            return self.simManager.createDirectory(args[0])
        elif (operation == 'rndir'):
            return self.simManager.remove(args[0], args[1])
        elif (operation == 'rmdir'):
            return self.simManager.remove(args[0])
        elif (operation == 'cd'):
            return self.simManager.openDirectory(args[0])

        return 'Comando não encontrado: {}'.format(operation)

    def processCommand(self, command):
        commandSplitted = findall(r'(?:"[^"]*"|[^\s"])+', command)
        operation = commandSplitted[0]
        args = commandSplitted[1:]

        output = self.runAssociatedCommand(operation, args)

        return 'Comando executado. \n Saída: {}'.format(output)
