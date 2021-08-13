const express = require('express'),
app = express()
port = process.env.PORT || 3000
//parsing json
app.use(express.json())
//runing mongoose
require('./db/mongoose')

//routs
const mainRoute = require('./routs')


//using routs
app.use(mainRoute)
//runing the app
app.listen(port, () => {
    console.log('server is up on port:' + port)
});