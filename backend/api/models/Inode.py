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

    def set(self, id, content, pointers, flag):
        self._id = id
        self._fileSize = len(content)
        self._updatedAt = date.now()
        self._flag = flag
        self._pointers = pointers

    def getInodeId(x, y, iNumber):
        return ((x - 1) * iNumber) + y

    def appendInode(content, id, name):
        content = content.split("|")
        content[0] = content[0] + "/" + str(id) + ";" + name
        content = "|".join(content)
        return content

    def removeInode(content, id):
        content = content.split("|")
        content[0] = content[0].replace("/"+str(id), "")
        content = "|".join(content)
        return content

    def formatInode(self):
        line = str(self._flag) + ";" + str(self._fileSize) + ";["
        for i in range(len(self._pointers)):
            line = line + str(self._pointers[i])
            if (i != len(self._pointers) - 1):
                line = line + ","
        return line + "]"
