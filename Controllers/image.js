const Clarifai = require("clarifai")

const app = new Clarifai.App({
    apiKey: "704d07936bf8431f99828c1c9671b6cc"
  })

const handleApiCall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
      res.json(data)
  }) 
  .catch(err => res.status(400).json("Unable to work with API!"))
}

const handleImage = (req, res, db) => {
	const { id } = req.body
	db("users").where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries)
		})
		.catch(err => res.status(400).json("Not found"))
}

module.exports = {
    handleImage,
    handleApiCall
}