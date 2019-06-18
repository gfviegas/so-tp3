from flask_restful import Resource, reqparse

from werkzeug import FileStorage
from api.settings.redis import rm
from io import TextIOWrapper, BytesIO
from random import randint
from re import findall

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

        f = TextIOWrapper(BytesIO(bytesData), 'utf-8')
        for line in f.readlines():
            command = line.rstrip()
            output.append('** Processando o comando: {}.'.format(command))
            output.append(self.processCommand(command))

        return {'output': output}, 201

    # Placeholder
    def emptyFunc(self, args=list()):
        return 'Argumentos: {}'.format(', '.join(str(x) for x in args))

    def getAssociatedCommands(self):
        return {
            'pwd': self.emptyFunc,
            'create': self.emptyFunc,
            'rm': self.emptyFunc,
            'ls': self.emptyFunc,
            'mkdir': self.emptyFunc,
            'rmdir': self.emptyFunc,
            'cd': self.emptyFunc
        }


    def processCommand(self, command):
        commandSplitted = findall(r'(?:"[^"]*"|[^\s"])+', command)
        # commandSplitted = command.split(' ')
        operation = commandSplitted[0]
        args = commandSplitted[1:]

        commands = self.getAssociatedCommands()

        return commands[operation](args)
