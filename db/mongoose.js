const mongoose = require('mongoose')
console.log(process.env.db)
mongoose.connect(process.env.db,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true ,
    useFindAndModify:false
})