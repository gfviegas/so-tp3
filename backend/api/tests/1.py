from api.models.manager import Manager
import uuid

if __name__ == '__main__':
    idAleatorio = str(uuid.uuid4())[:8]
    manager = Manager(40, 100, idAleatorio)
    file1 = manager.createFile("arquivo.txt", "esse vai ser o arquivo mais foda que vc já viu na vida!!! Porém, ele vai ocupar dois blocos, mas pra isso tem que escrever mais")
    manager.createFile("arquivo2.txt", "esse vai ser o arquivo2 mais foda que vc já viu na vida!!!")
    manager.createFile("arquivo3.txt", "esse vai ser o arquivo3 mais foda que vc já viu na vida!!!")
    manager.createFile("arquivo4.txt", "esse vai ser o arquivo4 mais foda que vc já viu na vida!!!")
    manager.createFile("arquivo5.txt", "esse vai ser o arquivo5 mais foda que vc já viu na vida!!!")

    sofodao = manager.createDirectory("sofodao")
    manager.openDirectory(sofodao)
    manager.createFile("arquivo6.txt", "esse vai ser o arquivo6 mais foda que vc já viu na vida!!!")

    manager.openDirectory("root")
    manager.createFile("arquivo7.txt", "esse vai ser o arquivo7 mais foda que vc já viu na vida!!!")
    manager.remove(file1)
    manager.createFile("arquivo8.txt", "esse vai ser o arquivo8 mais foda que vc já viu na vida!!!")
    manager.createFile("arquivo.txt", "esse vai ser o arquivo mais foda que vc já viu na vida!!! Porém, ele vai ocupar dois blocos, mas pra isso tem que escrever mais")
