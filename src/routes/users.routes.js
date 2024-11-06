const UsersController = require("../controllers/UsersController")
const usersController = new UsersController()

const { Router } = require("express")

const usersRoutes = Router()

usersRoutes.post("/", usersController.create)
usersRoutes.put("/:id", usersController.update)

module.exports = usersRoutes