from api.models.manager import Manager
import uuid

if __name__ == '__main__':
    idAleatorio = str(uuid.uuid4())[:8]
    manager = Manager(40, 100, idAleatorio)
    manager.createFile("arquivo.txt", "esse vai ser o arquivo mais foda que vc já viu na vida!!! Porém, ele vai ocupar dois blocos, mas pra isso tem que escrever mais")
    manager.rename("arquivo.txt", "renomeado.txt")
    manager.createFile("arquivo2.txt", "esse vai ser o arquivo2 mais foda que vc já viu na vida!!!")
    manager.createFile("arquivo3.txt", "esse vai ser o arquivo3 mais foda que vc já viu na vida!!!")
    manager.createFile("arquivo4.txt", "esse vai ser o arquivo4 mais foda que vc já viu na vida!!!")
    manager.createFile("arquivo5.txt", "esse vai ser o arquivo5 mais foda que vc já viu na vida!!!")

    manager.createDirectory("pasta")
    manager.openDirectory("pasta")
    manager.createFile("arquivo6.txt", "esse vai ser o arquivo6 mais foda que vc já viu na vida!!!")
    manager.rename("arquivo6.txt", "renomeado6.txt")

    manager.openDirectory("root")
    manager.createFile("arquivo7.txt", "esse vai ser o arquivo7 mais foda que vc já viu na vida!!!")
    manager.remove("arquivo4.txt")
    manager.createFile("arquivo8.txt", "esse vai ser o arquivo8 mais foda que vc já viu na vida!!!")
    manager.createFile("arquivo.txt", "esse vai ser o arquivo mais foda que vc já viu na vida!!! Porém, ele vai ocupar dois blocos, mas pra isso tem que escrever mais")
    #print(manager.listDirectory())
    manager.openDirectory("pasta")
    #print(manager.listDirectory())
    manager.createDirectory("pasta dentro de pasta")
    #print(manager.listDirectory())
    manager.openDirectory("pasta dentro de pasta")
    manager.createFile("tpdeso.txt", "esse vai ser o tpdeso mais foda que vc já viu na vida!!!")
    #print(manager.listDirectory())
    #não consegue abrir arquivo que não existe
    manager.openDirectory("root")
    print(manager.openFile("renomeado.txt"))
