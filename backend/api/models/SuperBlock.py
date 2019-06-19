from api.models.block import Block

class SuperBlock(Block):
    def __init__(self, totalSize, inodeSize):
        self._totalSize = totalSize
        self._inodeSize = inodeSize
        self._firstFreeBlock = self._inodeSize + 1

    def formatBlock(self):
        return str(self._totalSize) + "|" + str(self._inodeSize) + "|" + str(self._firstFreeBlock)

    def readBlock(self, block):
        pass

    def setFirstFreeBlock(self, firstFreeBlock):
        self._firstFreeBlock = firstFreeBlock

    def getFirstFreeBlock(self):
        return self._firstFreeBlock
