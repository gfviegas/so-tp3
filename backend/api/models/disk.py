from os import path

class Disk(object):
    # Valores minimos e máximos, em unidades, da quantidade de blocos
    NUM_BLOCKS_MIN = 20
    NUM_BLOCKS_MAX = 400

    # Valores minimos e máximos, em bytes, do tamanho do bloco
    BLOCK_SIZE_MIN = 100
    BLOCK_SIZE_MAX = 1024

    def __init__(self, numBlocks=100, blockSize=1024, simulationId=None):
        if (simulationId is None):
            raise Exception('SimulationId can\'t be none')

        self._id = simulationId

        self._numBlocks = int(numBlocks)
        if (self._numBlocks not in range(self.NUM_BLOCKS_MIN,
                                         self.NUM_BLOCKS_MAX)):
            raise Exception('numBlocks is out of range')

        self._blockSize = int(blockSize)
        if (self._blockSize not in range(self.BLOCK_SIZE_MIN,
                                         self.BLOCK_SIZE_MAX)):
            raise Exception('blockSize is out of range')

        self.createDisk()

    def getFilePath(self):
        dirname = path.dirname(__file__)
        filePath = path.join(dirname, '../disks/{}'.format(self._id))
        return path.abspath(filePath)

    def createDisk(self):
        file = open(self.getFilePath(), 'w')

        for i in range(self._numBlocks):
            for j in range(self._blockSize):
                file.write('X')
            file.write('\n')

        file.close()

    def read(self, blocknumber):
        with open(self.getFilePath(), 'r') as file:
            lines = file.readlines()
            lineIndex = 0
            for line in lines:
                if(lineIndex == blocknumber):
                    return line
                lineIndex += 1
        return -1

    def write(self, blocknumber, block):
        with open(self.getFilePath(), 'r') as file:
            lines = file.readlines()
            file = open(self.getFilePath(), 'w')

            lineIndex = 0
            for line in lines:
                if lineIndex == blocknumber:
                    for i in range(len(block), self._blockSize):
                        block += 'X'
                    file.write(block)
                    file.write('\n')
                else:
                    file.write(line)
                lineIndex += 1

        file.close()

    def getFirstFreeBlock(self):
        for i in range(self._numBlocks):
            with open(self.getFilePath(), 'r') as file:
                lines = file.readlines()
                lineIndex = 0
                for line in lines:
                    if(line[0] == 'X'):
                        return lineIndex
                    lineIndex += 1
        return -1

    def stop(removeFile):
        pass

#d = Disk(23, '1000')
#print(d._numBlocks, type(d._numBlocks))
#print(d._blockSize, type(d._blockSize))
