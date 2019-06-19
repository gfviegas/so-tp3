import operator

from Disk import Disk
from Inode import Inode
from InodeBlock import InodeBlock
from Item import Item
from SuperBlock import SuperBlock

class FileSystem:
    def _createRoot(self, name, content):
        self._root = Inode()
        id = self._getFirstFreeInode()
        pointers = self._fillBlocks(content)
        self._root.set(id, content, pointers, 1)
        self.write(self._root)

    def __init__(self, numBlocks, blockSize, inodeSize):
        self._disk = Disk(numBlocks, blockSize)
        self.formatDisk(numBlocks, inodeSize)

        self._createRoot("/", "/0|")
        self._current = self._root

    def _fillBlocks(self, content):
        necessaryBlocks = int(len(content) / self._disk._blockSize) + 1
        blocks = []
        for i in range(necessaryBlocks):
            free = self._superBlock.getFirstFreeBlock()
            self._disk.write(free, content[i*self._disk._blockSize:(i+1)*self._disk._blockSize])
            self._superBlock.setFirstFreeBlock(self._disk.getFirstFreeBlock())
            blocks.insert(i, free)

        return blocks

    def formatDisk(self, numBlocks, inodeSize):
        self._superBlock = SuperBlock(numBlocks, inodeSize)
        self._disk.write(0, self._superBlock.formatBlock())
        for i in range(0, inodeSize):
            self._disk.write(i+1, InodeBlock(self._disk._blockSize).getInodeBlock())

    def create(self, name, content):
        inode = Inode()
        id = self._getFirstFreeInode()
        content = Inode.appendInode(content, self._current._id)

        #para diretórios, adiciona os inodes da pasta atual e raíz (cd .. e cd)
        if(content.split("|")[1] == ''):
            if(self._root._id != self._current._id):
                content = Inode.appendInode(content, self._root._id)

        content = Inode.appendInode(content, id)
        pointers = self._fillBlocks(content)
        inode.set(id, content, pointers, 1)
        self.write(inode)

        inodeContent = self.seek(self._current)
        inodeContent = Inode.appendInode(inodeContent, id)
        inodeContent = inodeContent.replace("\n", "")

        for inodeBlock in self._current._pointers:
            self._disk.write(inodeBlock, inodeContent)

        self.write(self._current)
        return inode

    def _writeInode(self, inode):
        blockSize = self._disk._blockSize
        currentInodeBlock = int(inode._id / int(blockSize / Inode.INODESIZE)) + 1
        currentInode = inode._id % int(blockSize / Inode.INODESIZE)

        block = self.read(currentInodeBlock)
        splitedBlock = block.replace("\n", "").split("|")
        splitedBlock[currentInode] = inode.formatInode()
        block = "|".join(splitedBlock)

        self._disk.write(currentInodeBlock, block)

    def write(self, inode):
        self._writeInode(inode)
        self._disk.write(0, self._superBlock.formatBlock())

    def read(self, blocknumber):
        return self._disk.read(blocknumber)

    def seek(self, inode):
        content = ""
        for dataBlock in inode._pointers:
            content = content + self.read(dataBlock).replace("X", "")
        return content

    def _getFirstFreeInode(self):
        for i in range(1, self._superBlock._inodeSize):
            block = self.read(i)
            id = InodeBlock.getFirstFreeInode(i, block)
            if(id != -1):
                return id
        return -1

    def getCurrent(self):
        return self._current

    def setCurrent(self, inode):
        self._current = inode

    def shutdown():
        pass

    def close(fd):
        pass

    def delete(self, inode):
        inodeContent = self.seek(self._current)
        inodeContent = Inode.removeInode(inodeContent, inode._id)
        inodeContent = inodeContent.replace("\n", "")

        for inodeBlock in self._current._pointers:
            self._disk.write(inodeBlock, inodeContent)

        free = Inode()
        free.set(inode._id, "", [0,0,0,0], 0)
        for inodeBlock in inode._pointers:
            self._disk.write(inodeBlock, "")
        self.write(free)
        self._superBlock.setFirstFreeBlock(self._disk.getFirstFreeBlock())
        self._disk.write(0, self._superBlock.formatBlock())


#fs = FileSystem(20, 100, 10)
#fs.create("arquivo.txt", "|esse vai ser o arquivo mais foda que vc já viu na vida!!! Porém, ele vai ocupar dois blocos, mas pra isso tem que escrever mais")
#fs.create("arquivo2.txt", "|esse vai ser o arquivo2 mais foda que vc já viu na vida!!!")
#fs.create("arquivo3.txt", "|esse vai ser o arquivo3 mais foda que vc já viu na vida!!!")
#fs.create("arquivo4.txt", "|esse vai ser o arquivo4 mais foda que vc já viu na vida!!!")
#fs.create("arquivo5.txt", "|esse vai ser o arquivo5 mais foda que vc já viu na vida!!!")
