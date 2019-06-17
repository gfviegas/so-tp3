import operator

from Block import Block
from Inode import Inode

class InodeBlock(Block):
    def __init__(self, blockSize):
        self._nodes = []
        for i in range(int(blockSize / Inode.INODESIZE)):
            self._nodes.insert(i, Inode())

    def getInodeBlock(self):
        line = ""
        for i in range(len(self._nodes)):
            line = operator.concat(line, self._nodes[i].formatInode())
            if(i != len(self._nodes) - 1):
                line = operator.concat(line, "|")
        return line
