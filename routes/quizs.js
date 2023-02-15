const express = require('express');
const quizModel = require('../models/quiz');

const router = express.Router();

router.get('/', (req, res) => {
    const randomQuiz = quizModel.readRandomQuiz();
    return res.json(randomQuiz);
});
router.get('/allQuiz', (req, res) => {
    const allQuiz = quizModel.readAllQuiz();
    return res.json(allQuiz);
});

router.post('/', (req, res) => {

    const newQuiz = quizModel.createOneQuiz(req.body.question, req.body.choices,req.body.reponse);
    if (!newQuiz) {
        return res.status(409).json({ message: 'Question already exists' });
    }
    return res.json(newQuiz);
});

router.delete('/:id', (req, res) => {
    const deletedQuiz = quizModel.deleteOneQuiz(req.params.id);
    if (!deletedQuiz) {
        return res.status(404).json({ message: 'Question not found' });
    }
    return res.json(deletedQuiz);
});

router.patch('/:id', (req, res) => {
    const updatedQuiz = quizModel.updateOneQuiz(req.params.id, req.body.question, req.body.reponse);
    if (!updatedQuiz) {
        return res.status(404).json({ message: 'Question not found' });
    }
    return res.json(updatedQuiz);
});

module.exports = router;