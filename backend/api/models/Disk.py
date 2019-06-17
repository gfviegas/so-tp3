class Disk(object):
    # Valores minimos e máximos, em unidades, da quantidade de blocos
    NUM_BLOCKS_MIN = 10
    NUM_BLOCKS_MAX = 100

    # Valores minimos e máximos, em bytes, do tamanho do bloco
    BLOCK_SIZE_MIN = 512 # 500 bytes
    BLOCK_SIZE_MAX = 4096 # 4 KB


    def __init__(self, numBlocks=100, blockSize=1024):
        self._numBlocks = int(numBlocks)
        if (self._numBlocks not in range(self.NUM_BLOCKS_MIN,
                                         self.NUM_BLOCKS_MAX)):
            raise Exception('numBlocks is out of range')

        self._blockSize = int(blockSize)
        if (self._blockSize not in range(self.BLOCK_SIZE_MIN,
                                         self.BLOCK_SIZE_MAX)):
            raise Exception('blockSize is out of range')

    def read(blocknumber, block):
        pass

    def write(blocknumber, block):
        pass

    def stop(removeFile):
        pass

d = Disk(23, '1000')
print(d._numBlocks, type(d._numBlocks))
print(d._blockSize, type(d._blockSize))
