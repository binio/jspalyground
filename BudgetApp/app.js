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

    var calculateTotal = function(type) {
        var total = 0;
        data.allItems[type].forEach(function(val,index,array){
            total += parseFloat(val.value);
        });
        data.totals[type] = total;
    };

    var data = {
        allItems:{
            inc:[],
            exp:[]
        },
        totals:{
            exp:0,
            inc:0
        },
        budget:0,
        percentage:0
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
      },
        testing: function(){
          return data;
        },

        calculateBudget: function() {

          //1. calculate totals
          calculateTotal('exp');
          calculateTotal('inc');

          //2. calculate budget
          data.budget = Math.round(data.totals.inc - data.totals.exp);

          //3. calculate percentage
            if(data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        deleteItem: function(type, id){
          var ids, index;
          ids = data.allItems[type].map(function(current){
              return current.id;
          });

          index = ids.indexOf(id);

          if(index !== -1) {
              data.allItems[type].splice(index,1);
          }
        },

        getBudget : function() {
          return {
              budget: data.budget,
              totalInc: data.totals.inc,
              totalExp: data.totals.exp,
              percentage: data.percentage
          };
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
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
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
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';


            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            console.log(element);




            //replace placeholder with data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //insert html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        deleteListItem: function(selectorId) {
            var el;
            el = document.getElementById(selectorId);
            el.parentNode.removeChild(el);
        },
        clearFields: function(){
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMStrings.description + ','+ DOMStrings.value);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array){
                current.value = '';
            });
            fieldsArr[0].focus();
        },
        displayBudget: function(obj){
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMStrings.expensesLabel).textContent = obj.totalExp;
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
            if(obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';

            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '_';
            }

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

        document.querySelector(DOMStrings.container).addEventListener('click', ctrlDeleteItem)

    };

    var updateBudget = function() {
        var budget;
        //1.calculate budget
        budgetController.calculateBudget();
        //2. return budget
        budget = budgetController.getBudget();

        //3.update UI with budget
        console.log(budget);
        UIController.displayBudget(budget);
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
        updateBudget();
        //6.display budget

    };

    var ctrlDeleteItem = function(event) {
        var itemId, splitId;
        console.log(event.target.parentNode.parentNode.parentNode.parentNode.id);
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemId){
            splitId = itemId.split('-');
            var type = splitId[0];
            var id = parseInt(splitId[1]);


            // 1. delete item from data structure
            budgetController.deleteItem(type, id);
            // 2. delete item from UI
            UIController.deleteListItem(itemId);
            // 3. update budget in data structure

            // 4. redisplay new budget
        }
    };

    return {
        init: function(){
            console.log('Application started...');
            var initialBudget =  {
                budget:0,
                totalInc:0,
                totalExp:0,
                percentage:0
            };
            setupEventListeners();
            UIController.displayBudget(initialBudget);
        }
    };


})(budgetController, UIController);

controller.init();