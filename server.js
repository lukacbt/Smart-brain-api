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
		connectionString: "postgres://rriwkqowfgcvyd:e7f5f7e2f307fbb00753782707086808b6506439f9c72f6c0f3f8d4bd33b25c3@ec2-52-7-39-178.compute-1.amazonaws.com:5432/d72rk0le0bii6i",
		ssh: true
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