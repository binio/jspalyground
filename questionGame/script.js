var Question = function (question, answers, correctAnswer) {
        this.question = question,
            this.answers = answers,
            this.correctAnswer = correctAnswer


};
var questions = [];
var question1 = new Question(
    'What is the instructor name',
    ['Jonas','Thomas','Rory'],
    0);
var question2 = new Question(
    'What is the capital of Germany',
    ['Berlin','Bonn','Frankfurt'],
    2);
var question3 = new Question(
    'Is whale a:',
    ['Mammal','Fish','Reptile'],
    0);
var question4 = new Question(
    'Whats the fastest car 0-60',
    ['Nissan GTR','Veyron','Veneno'],
    0);
questions.push(question1);
questions.push(question2);
questions.push(question3);
questions.push(question4);