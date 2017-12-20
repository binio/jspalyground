function interviewQuestion(job) {
    if (job ==='designer' ) {
        return function ( name ) {
            console.log( name + ' ux question?');
        }
    } else if ( job ==='teacher'){
        return function ( name) {
            console.log(name + ' what do you teach?');
        }
    }
}

var teacherQuestion =  interviewQuestion('teacher');
var uxQuestion = interviewQuestion('designer');
teacherQuestion('John');
uxQuestion('Thomas');
interviewQuestion('designer')('Mark');

