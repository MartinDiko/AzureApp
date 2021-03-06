var express = require('express')
var { MongoClient } = require('mongodb')
var router = express.Router()

// const title = process.env.TITLE;

/* GET home page. */
router.get('/', function (req, res, next) {
  const dbName = 'jwebster-sandbox'
  const url = process.env.URL
  const password = process.env.PASSWORD
  const user = process.env.USER;

  (async function mongo () {
    let client

    try {
      client = await MongoClient.connect(url, {
        auth: {
          user,
          password
        }
      })

      const db = client.db(dbName)
      const books = await db.collection('books').find().toArray()
      //console.log(books)
      res.render('index', {books})
    } catch (err) {
      console.log(err)
    }
  }())
})

module.exports = router
