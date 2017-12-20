function retirement(retirementAge) {
    var a = 'years left till retirement';
    return function( yearOfBirth ){
        var age = 2016 - yearOfBirth;
        console.log((retirementAge - age)+a);
    }
}
/*
* inner functions have always access to variables and params of its
* outer functions even after outer function already returned.
* */
var retirementUS = retirement(66);
var retirementDE = retirement(65);
retirementUS(1973);
retirementDE(1973);
//retirement(65)(1973);


/* we can refactor function returning
function into closures
 */
function questionTo(jobType) {

    return function( name ) {
        var question = ' What do you do?';

        if(jobType ==='designer'){
            question = ' What is UX?';
        } else if (jobType ==='teacher') {
            question = ' how long have you been teaching?';
        }
        console.log(name + question);
    }
}

var designerQuestion = questionTo('designer');
designerQuestion('Arthur');

var teacherQuestion = questionTo('teacher');
teacherQuestion('Anna');

var defaultQuestion = questionTo('anybody');
defaultQuestion('Kieran');
defaultQuestion('Agnes');
defaultQuestion('Morgan');