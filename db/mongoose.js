const mongoose = require('mongoose')
console.log(process.env.db)
const connect = async () => {
try{
    await mongoose.connect(process.env.db,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology: true ,
        useFindAndModify:false
    })
    console.log('CONNECTED')
}catch(e){
    console.log(e)
}
}

connect()