import express from 'express'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const personRoutes = require('./routes/person.routes')
app.use('/person', personRoutes)

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)
