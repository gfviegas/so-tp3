import operator
from Block import Block

class SuperBlock(Block):
    def __init__(self, totalSize, inodeSize):
        self._totalSize = totalSize
        self._inodeSize = inodeSize
        self._firstFreeBlock = self._inodeSize + 1

    def formatBlock(self):
        line = operator.concat(str(self._totalSize), "|")
        line = operator.concat(line, str(self._inodeSize))
        line = operator.concat(line, "|")
        line = operator.concat(line, str(self._firstFreeBlock))
        return line

    def readBlock(self, block):
        pass

    def setFirstFreeBlock(self, firstFreeBlock):
        self._firstFreeBlock = firstFreeBlock

    def getFirstFreeBlock(self):
        return self._firstFreeBlock
