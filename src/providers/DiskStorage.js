const fs = require("fs")
const path = require("path")

const uploadConfig = require("../configs/upload")

class DiskStorage {
  async saveFile(file){
    await fs.promises.rename(
      // pegando o arquivo da pasta temporária
      path.resolve(uploadConfig.TMP_FOLDER, file),

      // movendo o arquivo para a pasta definitiva
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    )

    return file
  }

  async deleteFile(file){
    // buscando o arquivo lá na pasta UPLOADS_FOLDER
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

    try {
      // verifica o status do arquivo
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    // deletar o arquivo
    await fs.promises.unlink(filePath)
  }
}

module.exports = DiskStorage