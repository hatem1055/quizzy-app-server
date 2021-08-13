const mongoose = require('mongoose')

const resultSchema = mongoose.Schema({
    name:{
        type: String,
        default: 'failed'

    },
    percentage:{
        type: Number,
    },
    total:{
        type: Number,
    },
    right:{
        type: Number,
    },
    quiz_id:{
        type:mongoose.Schema.Types.ObjectId
    }
})

const resultModel = mongoose.model('result',resultSchema)

module.exports = resultModel