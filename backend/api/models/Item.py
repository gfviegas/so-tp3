class Item:
    def __init__(self, name, inode):
        self._name = name
        self._inode = inode

    def rename(self, name):
        self._name = name

    def getName(self):
        return self._name

    def getInode(self):
        return self._inode
