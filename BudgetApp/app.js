//Budget Controller
var budgetController = (function(){

})();

//UI Controller
var UIController = (function(){

})();

//App Controller
var controller = (function(budgetCtrl, UICtrl){

    var ctrlAddItem = function(){
        //1.get the field input data
        //2.add item to the budget controller
        //3.add item to UI
        //4.calculate budget
        //5.display budget
        console.log('it works!');
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event){
        if(event.charCode === 13 || event.which === 13){
            ctrlAddItem();
        }
    });
})(budgetController, UIController);