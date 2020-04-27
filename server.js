const express = require("express")
const bcrypt = require("bcrypt-nodejs")
const cors = require("cors")
var knex = require('knex')

const register = require("./Controllers/register")
const signin = require("./Controllers/signin")
const profile = require("./Controllers/profile")
const image = require("./Controllers/image")

const db = knex({
	client: 'pg',
	connection: {
		host: "ec2-3-223-21-106.compute-1.amazonaws.com",
		user: "xilmmgxdvsygmr",
		password: "39ab9e6edd015fcb80afeb135a498f162910fd222c82f09d5fd82eee70bfe315",
		database: "d5tj9jhcqjd7p4",
		ssl: true
	}
});

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => { res.json("Working") })
app.post("/signin", (req, res) => { signin.handleSignIn(req, res, db, bcrypt) })
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get("/profile/:id", (req, res) => {profile.handleProfile(req, res, db) })
app.put("/image", (req, res) => { image.handleImage(req, res, db) })
app.post("/imageurl", (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on 3000 ${process.env.PORT}`)
})