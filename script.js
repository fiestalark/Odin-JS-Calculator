document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelector('.calc-rows');
    const currentOperation = document.querySelector('.current-operation');
    const previousOperation = document.querySelector('.previous-operation');
    const operators = buttons.querySelectorAll('.operator');

    const nums = {
        num1: '',
        num2: '',
    }
    
    let operator = '';
    let operatorInput = false;
    let decimalInput = false;
    let percentInput = false;
    let count = 1;
    let resetCurrent = false;


    const add = function(a, b) {
        return a + b;
    };
    
    const subtract = function(a, b) {
        return a - b;
    };
    
    const divide = function(a, b) {
        if (b === 0) {
            return 'Here be dragons';
        }
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
        nums.num1 = '';
        nums.num2 = '';
        operator = '';
        operators.forEach(operator => operator.classList.remove('active'));
        operatorInput = false;
        decimalInput = false;
    }

    const clear = function() {
        count = 1;
        nums.num1 = '';
        nums.num2 = '';
        operator = '';
        currentOperation.textContent = '';
        previousOperation.textContent = '';
        resetCurrent = false;
        operatorInput = false;
        decimalInput = false;
        operators.forEach(operator => operator.classList.remove('active'));
    }

    const operate = function(a, b, operator) {
        a = Number(a);
        b = Number(b);
        result = operations[operator](a, b);
        displayResult(result, currentOperation.textContent)
    }

    const displayResult = function(result, prevOp) {
        previousOperation.textContent = prevOp + '=';
        currentOperation.textContent = Math.round(result * 1000) / 1000;
        resetCurrent = true;
        reset();
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
        } else if (operatorInput === false && (e.target.id === 'add' || e.target.id === 'divide' || e.target.id === 'multiply' || e.target.id === 'subtract')) {
            operator = e.target.id;
            operatorInput = true;
            e.target.classList.add('active');
            currentOperation.textContent += e.target.textContent;
            count++;
            // need to fix what happens if start with operator
        } else if (e.target.classList.contains('equals')) {
            if (!nums.num1 || !nums.num2 || !operator) {
                return nums.num2 ? displayResult(nums.num2, nums.num2) : displayResult(nums.num1, nums.num1);
            }
            operate(nums.num1, nums.num2, operator);   
        } else if (decimalInput === false && e.target.classList.contains('decimal')) {
            nums[`num${count}`] += '.';
            currentOperation.textContent += '.';
            decimalInput = true;
        } else if (percentInput === false && e.target.id === 'percent') {
            nums[`num${count}`] = nums[`num${count}`] / 100;
            currentOperation.textContent = nums[`num${count}`];
            percentInput = true;
        }
        // need to add:
        // - backspace
        // - plus/minus
        // - round answers with long decimals
        // - add keyboard support
        // make sure number stays on screen, doesnt exit
        // 1e+XX functionality
        // enter .1, press equals --> .1, then presss x & 5, it should show .5, but shows 5; 
        // it shoudl store the result of the prior calculation, so can keep doing calculations with it
        // solar power
        // delay on with welcome message
});

});
