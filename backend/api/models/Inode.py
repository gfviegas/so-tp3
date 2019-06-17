import operator

class Inode:
    INODESIZE = 64

    def __init__(self):
        self._flag = 0 #int
        self._fileSize = 0 #int
        self._pointer = list() #int[]

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
