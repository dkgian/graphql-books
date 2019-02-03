const express = require('express')
const mongoose = require('mongoose')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const cors = require('cors')
const app = express()

const PORT = process.env.port || 3001
const dbuser = 'admin'
const dbpassword = 'admin123456'
const mlabUrl = `mongodb://${dbuser}:${dbpassword}@ds213665.mlab.com:13665/graphql-books`

mongoose.connect(mlabUrl, { useNewUrlParser: true })
mongoose.connection.once('open', (err) => {
  if(err){
    console.log(err)
  }
  console.log('Connected to mongoDB mLab Server...')
})

app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

app.use('*', (req, res, err) => {
  !err && res.redirect(`http://localhost:${PORT}/graphql`)
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} ...`)
})
