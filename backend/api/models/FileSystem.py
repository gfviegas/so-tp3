import operator

from Disk import Disk
from Inode import Inode
from InodeBlock import InodeBlock
from Item import Item
from SuperBlock import SuperBlock

class FileSystem:
    def _createRoot(self, name, content):
        self._root = Inode()
        id = self.getFirstFreeInode()
        pointers = self.fillBlocks(content)
        self._root.set(id, name, content, pointers)
        self.write(self._root, name, content)

    def fillBlocks(self, content):
        necessaryBlocks = int(len(content) / self._disk._blockSize) + 1
        blocks = []
        for i in range(necessaryBlocks):
            free = self._superBlock.getFirstFreeBlock()
            self._disk.write(free, content[i*self._disk._blockSize:(i+1)*self._disk._blockSize])
            self._superBlock.setFirstFreeBlock(self._disk.getFirstFreeBlock())
            blocks.insert(i, free)

        return blocks

    def __init__(self, numBlocks, blockSize, inodeSize):
        self._disk = Disk(numBlocks, blockSize)
        self.formatDisk(numBlocks, inodeSize)

        self._createRoot("/", "0|")
        self._current = self._root

    def formatDisk(self, numBlocks, inodeSize):
        self._superBlock = SuperBlock(numBlocks, inodeSize)
        self._disk.write(0, self._superBlock.formatBlock())
        for i in range(0, inodeSize):
            self._disk.write(i+1, InodeBlock(self._disk._blockSize).getInodeBlock())

    def appendInode(self, content, inode):
        content = content.split("|")
        content[0] = operator.concat(content[0], ";")
        content[0] = operator.concat(content[0], str(inode._id))
        content = "|".join(content)
        return content

    def create(self, name, content):
        inode = Inode()
        id = self.getFirstFreeInode()
        content = self.appendInode(content, inode)
        pointers = self.fillBlocks(content)
        inode.set(id, name, content, pointers)
        self.write(inode, name, content)

        inodeContent = self.seek(self._current)
        inodeContent = self.appendInode(inodeContent, self._current)
        self.write(self._current, "/", inodeContent)

    def writeInode(self, inode):
        blockSize = self._disk._blockSize
        currentInodeBlock = int(inode._id / int(blockSize / Inode.INODESIZE)) + 1
        currentInode = inode._id % int(blockSize / Inode.INODESIZE)

        block = self.read(currentInodeBlock)
        splitedBlock = block.replace("\n", "").split("|")
        splitedBlock[currentInode] = inode.formatInode()
        block = "|".join(splitedBlock)

        self._disk.write(currentInodeBlock, block)

    def write(self, inode, name, content):
        self.writeInode(inode)
        self._disk.write(0, self._superBlock.formatBlock())

    def read(self, blocknumber):
        return self._disk.read(blocknumber)

    def seek(self, inode):
        content = ""
        for dataBlock in inode._pointers:
            content = operator.concat(content, self.read(dataBlock).replace("X", ""))
        return content

    def getFirstFreeInode(self):
        for i in range(1, self._superBlock._inodeSize):
            block = self.read(i)
            id = InodeBlock.getFirstFreeInode(i, block)
            if(id != -1):
                return id
        return -1

    def shutdown():
        pass

    def close(fd):
        pass

    def delete(inumber):
        pass

fs = FileSystem(20, 100, 10)
fs.create("arquivo.txt", "|esse vai ser o arquivo mais foda que vc já viu na vida!!!")
fs.create("arquivo2.txt", "|esse vai ser o arquivo2 mais foda que vc já viu na vida!!!")
fs.create("arquivo3.txt", "|esse vai ser o arquivo3 mais foda que vc já viu na vida!!!")
fs.create("arquivo4.txt", "|esse vai ser o arquivo4 mais foda que vc já viu na vida!!!")
fs.create("arquivo5.txt", "|esse vai ser o arquivo5 mais foda que vc já viu na vida!!!")
