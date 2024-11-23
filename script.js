document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelector('.calc-rows');
    const currentOperation = document.querySelector('.current-operation');
    const previousOperation = document.querySelector('.previous-operation');

    const nums = {
        num1: '',
        num2: '',
    }
    
    let operator = '';
    let count = 1;
    let resetCurrent = false;


    const add = function(a, b) {
        return a + b;
    };
    
    const subtract = function(a, b) {
        return a - b;
    };
    
    const divide = function(a, b) {
        return a / b;
    };
    
    const multiply = function(a, b) {
        return a * b;
    };

    const operations = {
        'add': add,
        'subtract': subtract,
        'multiply': multiply,
        'divide': divide,
    }

    const reset = () => {
        count = 1;
        nums.num1 = 0;
        nums.num2 = 0;
        operator = '';
    }

    const clear = function() {
        count = 1;
        nums.num1 = 0;
        nums.num2 = 0;
        operator = '';
        currentOperation.textContent = '';
        previousOperation.textContent = '';
        resetCurrent = false;
    }

    const percent = function() {

    }

    const operate = function(a, b, operator) {
        a = Number(a);
        b = Number(b);
        result = operations[operator](a, b);
        displayResult(result, currentOperation.textContent)
        reset();
    }

    const displayResult = function(result, prevOp) {
        previousOperation.textContent = prevOp + '=';
        currentOperation.textContent = result;
        resetCurrent = true;
    }


    buttons.addEventListener('click', (e) => {
        if (resetCurrent === true) {
            currentOperation.textContent = '';
        }
        resetCurrent = false;

        if (e.target.classList.contains('number')) {
            nums[`num${count}`] += e.target.textContent;
            currentOperation.textContent += e.target.textContent;
            
        } else if (e.target.id === 'clear') {
            clear();
        } else if (e.target.id === 'add' || e.target.id === 'divide' || e.target.id === 'multiply' || e.target.id === 'subtract') {
            operator = e.target.id;
            currentOperation.textContent += e.target.textContent;
            count++;
        } else if (e.target.classList.contains('equals')) {
            console.log(nums.num1, nums.num2, operator);
            if (!nums.num1 || !nums.num2 || !operator) {
                return nums.num2 ? displayResult(nums.num2, nums.num2) : displayResult(nums.num1, nums.num1);
            }
            operate(nums.num1, nums.num2, operator);   
        }
});

});
