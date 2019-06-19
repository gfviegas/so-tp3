from api.models.fileSystem import FileSystem

class Manager:
    def __init__(self, numBlocks, blockSize, simulationId):
        self.numBlocks = numBlocks
        self.blockSize = blockSize
        self.simulationId = simulationId

        self._fileSystem = FileSystem(numBlocks, blockSize, int(numBlocks / 3),
                                      simulationId)

    def createFile(self, name, content):
        return self._fileSystem.create(name, "|"+content)

    def createDirectory(self, name):
        return self._fileSystem.create(name, "|")

    def openDirectory(self, inode):
        if(inode == "root"):
            inode = self._fileSystem._root
        self._fileSystem.setCurrent(inode)

    def openFile(self, inode):
        file = self._fileSystem.seek(inode)
        file = file.split("|")[1].replace("\n", "")
        return file

    def rename(inode, name):
        pass

    def remove(self, inode):
        return self._fileSystem.delete(inode)
