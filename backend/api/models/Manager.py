import operator

from FileSystem import FileSystem

class Manager:
    def __init__(self, numBlocks, blockSize):
        self._fileSystem = FileSystem(numBlocks, blockSize, int(numBlocks / 3))

    def createFile(name, content):
        pass

    def createDirectory(name):
        pass

    def open(inode, name):
        pass

    def rename(inode, name):
        pass

    def remove(inode):
        pass

    def close(inode):
        pass
