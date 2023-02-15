const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/quiz.json');

const defaultQuiz = [
    {
        id: uuidv4(),
        numero:1,
        question: "Quelle est la couleur préférée de Sacha ?",
        choices: ["Bleu","Vert","Jaune","Rouge"],
        reponse: "Bleu"
    },
    {
        id: uuidv4(),
        numero:2,
        question: "Quel est l'animal préféré de Sacha ?",
        choices: ["Chien","Chat","Poisson","Grenouille"],
        reponse: "Chat"
    },
    {
        id: uuidv4(),
        numero: 3,
        question: "Quel est la taille de Sacha ? ",
        choices: ["167","168","169","170"],
        reponse: "169",
    },
    {
        id: uuidv4(),
        numero: 4,
        question: "Quelle est la nationalité de Sacha ? ",
        choices: ["Français","Sud Affricain","Belge","Hollandais"],
        reponse: "Belge",
    }
    ];

//Fonction pour lire toutes les questions
function readAllQuiz() {
    const allQuizs = parse(jsonDbPath, defaultQuiz);
    return allQuizs;
}

//Fonction pour lire une question aléatoire
function readRandomQuiz() {
    const allQuizs = parse(jsonDbPath, defaultQuiz);
    const listQuiz = [];
    allQuizs.forEach(quiz => {
        listQuiz.push(quiz);
    });
    const indiceQuiz= Math.floor(Math.random() * listQuiz.length);
    return listQuiz[indiceQuiz];
}

//Fonction pour ajouter une question
function createOneQuiz(question,choices,reponse) {
    const allQuizs = parse(jsonDbPath, defaultQuiz);
    const nbQuestion=allQuizs.length
    if(allQuizs.find(quiz=>quiz.question === question))return ;
    const newQuiz = {
        id: uuidv4(),
        numero:nbQuestion,
        question: question,
        choices: choices,
        reponse: reponse,
    };
    allQuizs.push(newQuiz);
    serialize(jsonDbPath, allQuizs);
    return newQuiz;
}

//Fonction pour supprimer une question
function deleteOneQuiz(id) {
    const allQuizs = parse(jsonDbPath, defaultQuiz);
    const index = allQuizs.findIndex(q => q.id === id);
    if (index === -1) return;
    const deletedQuiz = allQuizs.splice(index, 1);
    serialize(jsonDbPath, allQuizs);
    return deletedQuiz;
}

//Fonction pour mettre à jour une question
function updateOneQuiz(id, question, reponse) {
    const allQuizs = parse(jsonDbPath, defaultQuiz);
    const index = allQuizs.findIndex(q => q.id === id);
    if (index === -1) return;
    allQuizs[index].question = question;
    allQuizs[index].reponse = reponse;
    serialize(jsonDbPath, allQuizs);
    return allQuizs[index];
}

module.exports = {
    readAllQuiz,
    readRandomQuiz,
    createOneQuiz,
    deleteOneQuiz,
    updateOneQuiz
};
