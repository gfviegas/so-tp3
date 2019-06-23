from api.models.disk import Disk
from api.models.inode import Inode
from api.models.inodeBlock import InodeBlock
from api.models.superBlock import SuperBlock

class FileSystem:
    def _createRoot(self, name, content):
        self._root = Inode()
        self._rootName = name
        id = self._getFirstFreeInode()
        content = Inode.appendInode(content, self._root._id, name)
        pointers = self._fillBlocks(content)
        self._root.set(id, content, pointers, 1)
        self.write(self._root)

    def __init__(self, numBlocks, blockSize, inodeSize, simulationId):
        self._disk = Disk(numBlocks, blockSize, simulationId)
        self.formatDisk(numBlocks, inodeSize)

        self._createRoot("root", "|")
        self._current = self._root
        self._currentName = self._rootName

    def _fillBlocks(self, content):
        necessaryBlocks = int(len(content) / self._disk._blockSize) + 1
        blocks = []
        for i in range(necessaryBlocks):
            free = self._superBlock.getFirstFreeBlock()
            self._disk.write(free, content[i * self._disk._blockSize:(i+1)*self._disk._blockSize])
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

        #para diretórios, adiciona os inodes da pasta atual e raíz (cd .. e cd)
        if(content.split("|")[1] == ''):
            content = Inode.appendInode(content, self._root._id, self._rootName)

        content = Inode.appendInode(content, id, name)
        pointers = self._fillBlocks(content)
        inode.set(id, content, pointers, 1)
        self.write(inode)

        inodeContent = self.seek(self._current)
        inodeContent = Inode.appendInode(inodeContent, id, name)
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
        splitedBlock = block.replace("X", "").replace("\n", "").split("|")
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

    def getInode(self, name):
        content = ""
        for dataBlock in self._current._pointers:
            content = content + self.read(dataBlock).replace("X", "")

        inodes = content.split("|")[0]
        folders = inodes.split("/")
        for folder in folders:
            if(name in folder):
                inodeId = int(folder.split(";")[0])
                blockSize = self._disk._blockSize
                inodeBlock = int(inodeId / int(blockSize / Inode.INODESIZE)) + 1
                currentInode = inodeId % int(blockSize / Inode.INODESIZE)

                block = self.read(inodeBlock)
                splitedBlock = block.replace("X", "").replace("\n", "").split("|")
                return Inode.read(splitedBlock[currentInode], inodeId)
        return -1

    def listDirectory(self):
        content = self.seek(self._current)
        files = content.replace("|\n", "").split("/")
        ls = []
        for file in files:
            if(len(file) > 0):
                file = file.split(";")[1]
                if(len(file.split(".")) > 1):
                    ls.append({'type': file, 'name': 'file'})
                else:
                    ls.append({'type': file, 'name': 'folder'})
        ls.pop(0)
        if (self._current._id != self._root._id):
            ls.pop(0)
        return ls

    def getCurrent(self):
        return self._current

    def setCurrent(self, inode, name):
        self._current = inode
        self._currentName = name

    def shutdown():
        pass

    def delete(self, inode, name):
        inodeContent = self.seek(self._current)
        inodeContent = Inode.removeInode(inodeContent, inode._id, name)
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
