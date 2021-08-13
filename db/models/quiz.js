const mongoose = require('mongoose')

const quizScheme = mongoose.Schema({
    name:{
        type: String,
        default: 'failed'

    },
    desc:{
        type: String,
        default: 'failed'

    },
    code:{
        type: String,
        default: 'failed'

    },
    password:{
        type: String,
        default: 'failed'

    },
    questions:[
        {
            question:{
                type:String
            },
            options:[
                {
                    option:{
                        type:String
                    },
                    isRight:{
                        type:Boolean,
                        default:false
                    }
                }
            ]
        }
    ]
})

const quizModel = mongoose.model('quiz',quizScheme)

module.exports = quizModel