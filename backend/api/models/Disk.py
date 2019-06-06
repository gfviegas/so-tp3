class Disk(object):
    # Valores minimos e máximos, em unidades, da quantidade de blocos
    NUM_BLOCKS_MIN = 10
    NUM_BLOCKS_MAX = 100

    # Valores minimos e máximos, em bytes, do tamanho do bloco
    BLOCK_SIZE_MIN = 512 # 500 bytes
    BLOCK_SIZE_MAX = 4096 # 4 KB


    def __init__(self, num_blocks=100, block_size=1024):
        self.num_blocks = int(num_blocks)
        if (self.num_blocks not in range(self.NUM_BLOCKS_MIN,
                                         self.NUM_BLOCKS_MAX)):
            raise Exception('num_blocks is out of range')

        self.block_size = int(block_size)
        if (self.num_blocks not in range(self.NUM_BLOCKS_MIN,
                                         self.NUM_BLOCKS_MAX)):
            raise Exception('num_blocks is out of range')

        self.atributoDinamico = 'nao foi declarado antes'

d = Disk(23, '1000')
print(d.num_blocks, type(d.num_blocks))
print(d.block_size, type(d.block_size))
print(d.atributoDinamico)
