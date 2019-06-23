from api.models.fileSystem import FileSystem

class Manager:
    def __init__(self, numBlocks, blockSize, simulationId):
        self.numBlocks = numBlocks
        self.blockSize = blockSize
        self.simulationId = simulationId

        self._fileSystem = FileSystem(numBlocks, blockSize, int(numBlocks / 3),
                                      simulationId)

    def createFile(self, name, content):
        return self._fileSystem.create(name, '|{}'.format(content))

    def createDirectory(self, name):
        return self._fileSystem.create(name, '|')

    def openDirectory(self, name):
        inode = self._fileSystem.getInode(name)
        if(inode == -1):
            raise Exception('Diretório não encontrado')
        self._fileSystem.setCurrent(inode, name)

    def listDirectory(self):
        d = self._fileSystem.listDirectory()
        d.sort(key=lambda i: i['name'])
        d.sort(key=lambda i: i['type'], reverse=True)
        return d

    def openFile(self, name):
        inode = self._fileSystem.getInode(name)
        if (inode == -1):
            raise Exception('Arquivo não encontrado')

        file = self._fileSystem.seek(inode)
        content = file.split('|')
        name = content[0].split(";")[1]
        file = content[1].replace('\n', '')

        return {
            'name': name,
            'content': file,
            'size': inode._fileSize,
            'createdAt': inode._createdAt.isoformat(),
            'updatedAt': inode._updatedAt.isoformat()
        }

    def rename(self, oldName, newName):
        return self._fileSystem.rename(oldName, newName)

    def returnCurrent(self):
        return self._fileSystem._currentName

    def remove(self, name):
        inode = self._fileSystem.getInode(name)
        if(inode == -1):
            raise Exception(name + ' não pôde ser removido')
        return self._fileSystem.delete(inode, name)
