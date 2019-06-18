from FileSystem import FileSystem

class Manager:
    def __init__(self, numBlocks, blockSize):
        self._fileSystem = FileSystem(numBlocks, blockSize, int(numBlocks / 3))

    def createFile(self, name, content):
        return self._fileSystem.create(name, "|"+content)

    def createDirectory(self, name):
        return self._fileSystem.create(name, "|")

    def open(inode, name):
        pass

    def rename(inode, name):
        pass

    def remove(inode):
        pass

    def close(inode):
        pass

manager = Manager(20, 100)
manager.createFile("arquivo.txt", "esse vai ser o arquivo mais foda que vc já viu na vida!!! Porém, ele vai ocupar dois blocos, mas pra isso tem que escrever mais")
manager.createFile("arquivo2.txt", "esse vai ser o arquivo2 mais foda que vc já viu na vida!!!")
manager.createFile("arquivo3.txt", "esse vai ser o arquivo3 mais foda que vc já viu na vida!!!")
manager.createFile("arquivo4.txt", "esse vai ser o arquivo4 mais foda que vc já viu na vida!!!")
manager.createFile("arquivo5.txt", "esse vai ser o arquivo5 mais foda que vc já viu na vida!!!")
manager.createDirectory("sofodao")
