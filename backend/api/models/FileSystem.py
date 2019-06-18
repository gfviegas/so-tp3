import operator

from Disk import Disk
from Inode import Inode
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
        self.write(0, self._superBlock.formatBlock())
        for i in range(0, inodeSize):
            self.write(i+1, InodeBlock(self._disk._blockSize).getInodeBlock())

        self._root = self.create("/", "")
        self._current = self._root

    def shutdown():
        pass

    def createFile(self, name, content):
        file = operator.concat(self._current._id, "|")
        file = operator.concat(file, content)
        inode = self.create(name, file)

    def create(self, name, content):
        blockSize = self._disk._blockSize
        pointers = self.fillBlocks(name, content)

        inode = Inode()
        inode.set(name, content, pointers)

        currentBlock = int(inode._id / int(blockSize / Inode.INODESIZE)) + 1
        currentInode = inode._id % int(blockSize / Inode.INODESIZE)

        block = self.read(currentBlock)
        splitedBlock = block.replace("\n", "").split("|")
        splitedBlock[currentInode] = inode.formatInode()
        block = "|".join(splitedBlock)

        self.write(currentBlock, block)
        return inode

    def fillBlocks(self, name, content):
        verify = int(len(content) / self._disk._blockSize) + 1
        blocks = []
        for i in range(verify):
            free = self._superBlock.getFirstFreeBlock()
            self.write(free, content[i*self._disk._blockSize:(i+1)*self._disk._blockSize])
            self._superBlock.setFirstFreeBlock(self._disk.getFirstFreeBlock())
            blocks.insert(i, free)

        self.write(0, self._superBlock.formatBlock())

        return blocks

    def inumber(fd):
        pass

    def read(self, blocknumber):
        return self._disk.read(blocknumber)

    def write(self, blocknumber, block):
        self._disk.write(blocknumber, block)

    def seek(fd, offset, whence):
        pass

    def close(fd):
        pass

    def delete(inumber):
        pass

fs = FileSystem(20, 100, 10)
