function game() {
    var score = Math.random() * 10;
    console.log(score);
}

game();

/*
surround anonymous function in parentheses so parser thinks
it is a function expression no a declaration. function(){} without name would throw an error.
In JS everything in parentheses can not be a statement. () at the end call the function.
We can also pass variable to it.

With IIFE we create extra scope that provide data private access.
Just for data privacy;

 */
(function(){
    var score = Math.random() * 10;
    console.log('Score is: ' + score);
})();

//passing variable to iife
(function(name){
    var score = Math.random() * 10;
    console.log('Score is: ' + score +' '+name);
})('tomasz');