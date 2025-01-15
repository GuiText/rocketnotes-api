const { verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")

function ensureAuthenticated(request, response, next){
  // pegando o token do usuário na requisição
  const authHeader = request.headers.authorization

  if(!authHeader) {
    throw new AppError("JWT Token não informado", 401)
  }

  // quando ele pegar o token ele vai separar o token por espaço com split
  // ai pegamos só o token que é o que nos interessa
  const [, token] = authHeader.split(" ")

  try {
    // verificando se é um token válido com o verify
    // se o token for válido ele devolve o sub, que eu vou renomear de user_id
    const { sub: user_id } = verify(token, authConfig.jwt.secret)

    request.user = {
      // convertendo o user_id de volta para número
      id: Number(user_id)
    }

    return next()
  } catch(error) {
    throw new AppError("JWT Token inválido", 401)
  }
}

module.exports = ensureAuthenticated