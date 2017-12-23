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
          return newItem;
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
        addButton:'.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
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
        },
        addListItem: function(obj, type){
            var html, newHtml, element;

            //get html string with placeholder text
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';


            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            console.log(element);




            //replace placeholder with data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //insert html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        clearFields: function(){
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMStrings.description + ','+ DOMStrings.value);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array){
                current.value = '';
            });
            fieldsArr[0].focus();
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
        var item, input;
        //1.get the field input data
        input = UIController.getInput();
        console.log(input);
        //2.add item to the budget controller
        item = budgetController.addItem(input.type, input.description, input.value);
        //3.add item to UI
        UIController.addListItem(item, input.type);
        //4 clear fields
        UIController.clearFields();
        //5.calculate budget
        //6.display budget

    };

    return {
        init: function(){
            console.log('Application started...');
            setupEventListeners();
        }
    };


})(budgetController, UIController);

controller.init();