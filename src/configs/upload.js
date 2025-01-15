// arquivo de configurações do upload que vamos utilizar

const path = require("path")
// biblioteca que vamos fazer o upload
const multer = require("multer")
// gera hash de forma aleatória
const crypto = require("crypto")

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads")

// dizemos onde ele vai salvar o arquivo (destination)
// e o nome do arquivo (filename)
const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback){
      // utilizando hash pra criar arquivos com nomes aleatórios pra não ter nomes iguais
      // garantir que cada usuário tenha um arquivo com nome único
      const fileHash = crypto.randomBytes(10).toString("hex")
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  })
}

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
}