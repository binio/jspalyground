(function(){
    function Question (question, answers, correctAnswer) {
        this.question = question,
            this.answers = answers,
            this.correctAnswer = correctAnswer


    };

    Question.prototype.displayQuestion = function() {

        console.log(this.question);
        this.answers.forEach(function(el,index,array){
            console.log(index + ' ' +el);
        });
    };

    Question.prototype.checkAnswer = function(answer,callback) {
        var sc;
        if(answer===this.correctAnswer){
            console.log('correct');
            sc = callback(true);

        } else {
            console.log('incorrect');
            sc = callback(false);

        }

        this.displayScore(sc);
    };

    Question.prototype.displayScore = function(score) {
        console.log('Your score: ' + score);
    };

    var questions = [];
    var question1 = new Question(
        'What is the instructor name',
        ['Jonas','Thomas','Rory'],
        0);
    var question2 = new Question(
        'What is the capital of Germany',
        ['Berlin','Bonn','Frankfurt'],
        0);
    var question3 = new Question(
        'Is whale a:',
        ['Mammal','Fish','Reptile'],
        0);
    var question4 = new Question(
        'Whats the fastest car 0-60',
        ['Nissan GTR','Veyron','Veneno'],
        0);
    var question5 = new Question(
        'Seed of light is indicated by:',
        ['c','g','m'],
        0);


    questions.push(question1);
    questions.push(question2);
    questions.push(question3);
    questions.push(question4);
    questions.push(question5);

    function score() {
        var sc = 0;
        var qnum = 0;
        return function(correct){
            if(correct){
                sc++;
            }
            qnum++;
            return sc + '/' + qnum;
        }
    };

    var keepScore = score();

    function nextQuestion() {
        var question = Math.floor(Math.random() * questions.length);
        questions[question].displayQuestion();
        var answer = prompt("Please enter answer number", "exit");
        if(answer!=='exit'){
            questions[question].checkAnswer(parseInt(answer),keepScore);

            nextQuestion();
        }
    }

    nextQuestion();

})();





