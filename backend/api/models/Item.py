import datetime

date = datetime.datetime

class Item:
    def __init__(self, name, inode):
        self._createdAt = date.now()
        self._uptadetAt = date.now()
        self._name = name
        self._inode = inode

    def rename(self, name):
        self._name = name
        self._uptadetAt = date.now()

    def getCreatedAt(self):
        return self._createdAt

    def getUpdatedAt(self):
        return self._uptadetAt

    def getName(self):
        return self._name

    def getInode(self):
        return self._inode

item = Item("Arquivo 1", 324324543)
print(item.getUpdatedAt())
