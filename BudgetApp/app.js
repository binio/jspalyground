//Budget Controller
var budgetController = (function(){

})();

//UI Controller
var UIController = (function(){
    var DOMStrings = {
        type:'.add__type',
        description:'.add__description',
        value:'.add__value',
        addButton:'.add__btn'
    };
    return {
        getInput: function(){
            return {
                 type : document.querySelector(DOMStrings.type).value,
                 description : document.querySelector(DOMStrings.description).value,
                 value : document.querySelector(DOMStrings.value).value,
            }
        },
        getDOMStrings: function(){
            return DOMStrings;
        }
    };
})();

//App Controller
var controller = (function(budgetCtrl, UICtrl){

    var setupEventListeners = function(){
        var DOMStrings = UIController.getDOMStrings();

        document.querySelector(DOMStrings.addButton).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event){
            if(event.charCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });

    };
    var ctrlAddItem = function(){
        //1.get the field input data
        var input = UIController.getInput();
        console.log(input);
        //2.add item to the budget controller
        //3.add item to UI
        //4.calculate budget
        //5.display budget

    };

    return {
        init: function(){
            console.log('Application started...');
            setupEventListeners();
        }
    };


})(budgetController, UIController);

controller.init();