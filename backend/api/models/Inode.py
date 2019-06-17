import operator
import datetime

date = datetime.datetime

class Inode:
    INODESIZE = 20
    CURRENTID = 0

    def __init__(self):
        self._id = self.CURRENTID
        self.CURRENTID += 1
        self._createdAt = date.now()
        self._updatedAt = date.now()
        self._flag = 0 #int
        self._fileSize = 0 #int
        self._pointer = [] #int[]
        for i in range(4):
            self._pointer.insert(i, 0)

    def set(self, name, content, pointers):
        self._fileSize = len(content)
        self._updatedAt = date.now()
        self._flag = 1
        self._pointer = pointers

    def formatInode(self):
        line = operator.concat(str(self._flag), ";")
        line = operator.concat(line, str(self._fileSize))
        line = operator.concat(line, ";")
        line = operator.concat(line, "[")
        for i in range(len(self._pointer)):
            line = operator.concat(line, str(self._pointer[i]))
            if (i != len(self._pointer) - 1):
                line = operator.concat(line, ",")
        line = operator.concat(line, "]")
        return line
