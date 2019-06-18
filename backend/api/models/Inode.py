import operator
import datetime

date = datetime.datetime

class Inode:
    INODESIZE = 20

    def __init__(self):
        self._id = 0
        self._createdAt = date.now()
        self._updatedAt = date.now()
        self._flag = 0 #int
        self._fileSize = 0 #int
        self._pointers = [] #int[]
        for i in range(4):
            self._pointers.insert(i, 0)

    def set(self, id, name, content, pointers):
        self._id = id
        self._fileSize = len(content)
        self._updatedAt = date.now()
        self._flag = 1
        self._pointers = pointers

    def getInodeId(x, y, iNumber):
        return ((x - 1) * iNumber) + y

    def formatInode(self):
        line = operator.concat(str(self._flag), ";")
        line = operator.concat(line, str(self._fileSize))
        line = operator.concat(line, ";")
        line = operator.concat(line, "[")
        for i in range(len(self._pointers)):
            line = operator.concat(line, str(self._pointers[i]))
            if (i != len(self._pointers) - 1):
                line = operator.concat(line, ",")
        line = operator.concat(line, "]")
        return line
