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
        return self._fileSystem.listDirectory()

    def openFile(self, name):
        inode = self._fileSystem.getInode(name)
        if (inode == -1):
            raise Exception('Arquivo não encontrado')
        file = self._fileSystem.seek(inode)
        file = file.split('|')[1].replace('\n', '')
        return file

    def rename(self, oldName, newName):
        pass

    def returnCurrent(self):
        return this._self._currentName

    def remove(self, name):
        inode = self._fileSystem.getInode(name)
        if(inode == -1):
            raise Exception(name + ' não pôde ser removido')
        return self._fileSystem.delete(inode, name)
