from Disk import Disk
from InodeBlock import InodeBlock
from Item import Item
from SuperBlock import SuperBlock

class FileSystem:
    def __init__(self, numBlocks, blockSize, inodeSize):
        self._disk = Disk(numBlocks, blockSize)
        self.formatDisk(numBlocks, inodeSize)
        pass

    def formatDisk(self, numBlocks, inodeSize):
        self._superBlock = SuperBlock(numBlocks, inodeSize)
        self._disk.write(0, self._superBlock.formatBlock())
        for i in range(1, inodeSize):
            self._disk.write(i, InodeBlock(self._disk._blockSize).getInodeBlock())

    def shutdown():
        pass

    def create(name, content):
        pass

    def inumber(fd):
        pass

    def read(fd, buffer):
        pass

    def write(fd, buffer):
        pass

    def seek(fd, offset, whence):
        pass

    def close(fd):
        pass

    def delete(inumber):
        pass

fs = FileSystem(20, 512, 10)
