const express = require('express')
const quizModel = require('./db/models/quiz')
const resultModel = require('./db/models/result')
const mainRouter = new express.Router()
const uniqueId = require('uniqid')
// create new quiz
mainRouter.post('/create_quiz', async (req, res) => {
    const password = require('generate-password').generate({
        length: 10,
        numbers: false
    }),
        code = uniqueId(),
        name = req.body.name,
        desc = req.body.desc,
        questions = req.body.questions
    const newQuiz = new quizModel({
        name, code, password, desc, questions
    })
    try {
        const newQuizInfo = await newQuiz.save()
        res.send({
            password: newQuizInfo.password,
            code: newQuizInfo.code
        });
    } catch (e) {
        res.send(e.message)
    }
})

// create result
const calculate_result = async (quiz_id, options_ids) => {
    const theQuiz = await quizModel.findById(quiz_id)
    let totalQuestions = 0,
        rightQuestions = 0
    for (i = 0; i <= theQuiz.questions.length - 1; i++) {
        const theQuestion = theQuiz.questions[i]
        totalQuestions += 1
        for (option of theQuestion.options) {
            if (option.id == options_ids[i] && option.isRight) {
                rightQuestions += 1
            }
        }
    }

    return {
        totalQuestions, rightQuestions,
        percentage: (rightQuestions / totalQuestions) * 100
    }
}
mainRouter.post('/create_result', async (req, res) => {
    const quizId = req.body.quiz_id,
        name = req.body.name
    options_ids = req.body.options_ids, // [id1,id2,id3]
        result = await calculate_result(quizId, options_ids),
        newResult = new resultModel({
            total: result.totalQuestions, right: result.rightQuestions, percentage: result.percentage, quiz_id: quizId, name
        })

    try {
        res.send(await newResult.save())
    } catch (e) {
        res.send(e)
    }

})

// get quiz 
mainRouter.get('/get_quiz', async (req, res) => {
    const quizCode = req.body.quiz_code,
        theQuiz = await quizModel.findOne({
            code: quizCode
        })
    if (theQuiz) {
        res.send({
            result: theQuiz
        })
    } else {
        res.send({
            result: false
        })
    }
})

// get quiz stats
mainRouter.get('/get_quiz_stats', async (req, res) => {
    const quizPassword = req.body.quiz_password,
        theQuiz = await quizModel.findOne({
            password: quizPassword
        })
    if (theQuiz) {
        const results = await resultModel.find({
            quiz_id:theQuiz._id
        })
        res.send({result:results})
    } else {
        res.send({
            result: false
        })
    }
})

module.exports = mainRouter
