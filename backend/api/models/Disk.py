import uuid
import operator

class Disk(object):
    # Valores minimos e máximos, em unidades, da quantidade de blocos
    NUM_BLOCKS_MIN = 10
    NUM_BLOCKS_MAX = 100

    # Valores minimos e máximos, em bytes, do tamanho do bloco
    BLOCK_SIZE_MIN = 512 # 500 bytes
    BLOCK_SIZE_MAX = 4096 # 4 KB


    def createDisk(self):
        file = open(operator.concat("../disks/", self._id), "w")

        for i in range(self._numBlocks):
            for j in range(self._blockSize):
                file.write("X")
            file.write("\n")

        file.close()

    def __init__(self, numBlocks=100, blockSize=1024):
        self._id = str(uuid.uuid4())[:8]

        self._numBlocks = int(numBlocks)
        if (self._numBlocks not in range(self.NUM_BLOCKS_MIN,
                                         self.NUM_BLOCKS_MAX)):
            raise Exception('numBlocks is out of range')

        self._blockSize = int(blockSize)
        if (self._blockSize not in range(self.BLOCK_SIZE_MIN,
                                         self.BLOCK_SIZE_MAX)):
            raise Exception('blockSize is out of range')

        self.createDisk()

    def read(blocknumber, block):
        pass

    def write(self, blocknumber, block):
        with open(operator.concat("../disks/", self._id), "r") as file:
            lines = file.readlines()
            file = open(operator.concat("../disks/", self._id), "w")

            lineIndex = 0
            for line in lines:
                if lineIndex == blocknumber:
                    file.write(block)
                    for i in range(len(block), self._blockSize):
                        file.write("X")
                    file.write("\n")
                else:
                    file.write(line)
                lineIndex += 1

        file.close()

    def stop(removeFile):
        pass

#d = Disk(23, '1000')
#print(d._numBlocks, type(d._numBlocks))
#print(d._blockSize, type(d._blockSize))
