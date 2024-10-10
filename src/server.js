const express = require("express")

const app = express()

app.get("/users", (request, response) => {
  const { page, limit } = request.query

  response.send(`página: ${page}. Mostrar: ${limit}`)
})

const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
