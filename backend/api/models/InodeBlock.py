from api.models.block import Block
from api.models.inode import Inode

class InodeBlock(Block):
    def __init__(self, blockSize):
        self._nodes = []
        for i in range(int(blockSize / Inode.INODESIZE)):
            self._nodes.insert(i, Inode())

    def getInodeBlock(self):
        line = ""
        for i in range(len(self._nodes)):
            line = line + self._nodes[i].formatInode()
            if(i != len(self._nodes) - 1):
                line = line + "|"
        return line

    def getFirstFreeInode(line, block):
        inodes = block.split("|")
        for i in range(len(inodes)):
            if(inodes[i][0] == '0'):
                return Inode.getInodeId(line, i, len(inodes))
        return -1
