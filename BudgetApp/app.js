//Budget Controller
var budgetController = (function(){

    var Expense = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var getNewId = function(type){
        //get value of lastID object type and increase it by 1
        if(data.allItems[type].length === 0){
            return 0;
        }
        var lastElem = data.allItems[type].length - 1;
        return data.allItems[type][lastElem].id + 1;
    };

    var data = {
        allItems:{
            inc:[],
            exp:[]
        },
        totals:{
            exp:0,
            inc:0
        }
    };
    
    return {
      addItem: function (type, des, val) {
          var newItem;

          if(type==='exp') {
              newItem = new Expense(getNewId(type), des, val);
          } else if(type==='inc') {
              newItem = new Income(getNewId(type), des, val);
          }
          data.allItems[type].push(newItem);
          console.log(data.allItems);
      }  
    };

})();

//--------------------------------------------------------------------------------
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


//--------------------------------------------------------------------------------
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
        budgetController.addItem(input.type, input.description, input.value);
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