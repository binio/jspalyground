var john =  {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, dayTime) {
        if(style==='formal'){
            console.log('Formal')
            console.log('Good '+ dayTime + 'I am '+this.name + 'I am '+ this.age)
        } else if( style==='friendly'){
            console.log('friendly');
            console.log('Hey '+ dayTime + 'I R '+this.name + 'I am '+ this.age)
        }
    }

};

var emily = {
    name: 'Emily',
    age: 23,
    job: 'teacher'
}

john.presentation('formal','Morning');
//we borrowed john method to call it on emily below
john.presentation.call(emily,'friendly', 'afternoon');
john.presentation.apply(emily,['friendly','afternoon']);

//currying build function on another function with some presets
var johnFriendly = john.presentation.bind(john,'friendly');
johnFriendly('morning');
johnFriendly('night');

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('morning');