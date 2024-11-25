document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const calculator = {
        display: {
            current: document.querySelector('.current-operation'),
            previous: document.querySelector('.previous-operation')
        },
        buttons: document.querySelector('.calc-rows'),
        operators: document.querySelectorAll('.operator')
    };

    // Calculator state
    const state = {
        nums: {
            num1: '',
            num2: '',
        },
        operator: '',
        currentCount: 1,
        flags: {
            operatorInput: false,
            decimalInput: false,
            percentInput: false,
            shouldResetDisplay: false
        }  
    };

    // const buttons = document.querySelector('.calc-rows');
    // const currentOperation = document.querySelector('.current-operation');
    // const previousOperation = document.querySelector('.previous-operation');
    // const operators = buttons.querySelectorAll('.operator');

    // const nums = {
    //     num1: '',
    //     num2: '',
    // }
    
    // let operator = '';
    // let operatorInput = false;
    // let decimalInput = false;
    // let percentInput = false;
    // let count = 1;
    // let resetCurrent = false;


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
        state.currentCount = 1;
        state.nums.num1 = '';
        state.nums.num2 = '';
        state.operator = '';
        calculator.operators.forEach(operator => operator.classList.remove('active'));
        state.flags.operatorInput = false;
        state.flags.decimalInput = false;
    }

    const clear = function() {
        state.currentCount = 1;
        state.nums.num1 = '';
        state.nums.num2 = '';
        state.operator = '';
        calculator.display.current.textContent = '';
        calculator.display.previous.textContent = '';
        state.flags.shouldResetDisplay = false;
        state.flags.operatorInput = false;
        state.flags.decimalInput = false;
        calculator.operators.forEach(operator => operator.classList.remove('active'));
    }

    const operate = function(a, b, operator) {
        a = Number(a);
        b = Number(b);
        result = operations[operator](a, b);
        displayResult(result, calculator.display.current.textContent)
    }

    const displayResult = function(result, prevOp) {
        calculator.display.previous.textContent = prevOp + '=';
        calculator.display.current.textContent = Math.round(result * 1000) / 1000;
        state.flags.shouldResetDisplay = true;
        reset();
    }


    calculator.buttons.addEventListener('click', (e) => {
        if (state.flags.shouldResetDisplay === true) {
            calculator.display.current.textContent = '';
        }
        state.flags.shouldResetDisplay = false;

        if (e.target.classList.contains('number')) {
            state.nums[`num${state.currentCount}`] += e.target.textContent;
            calculator.display.current.textContent += e.target.textContent;
            
        } else if (e.target.id === 'clear') {
            clear();
        } else if (state.flags.operatorInput === false && (e.target.id === 'add' || e.target.id === 'divide' || e.target.id === 'multiply' || e.target.id === 'subtract')) {
            state.operator = e.target.id;
            state.flags.operatorInput = true;
            e.target.classList.add('active');
            calculator.display.current.textContent += e.target.textContent;
            state.currentCount++;
            // need to fix what happens if start with operator
        } else if (e.target.classList.contains('equals')) {
            if (!state.nums.num1 || !state.nums.num2 || !state.operator) {
                return state.nums.num2 ? displayResult(state.nums.num2, state.nums.num2) : displayResult(state.nums.num1, state.nums.num1);
            }
            operate(state.nums.num1, state.nums.num2, state.operator);   
        } else if (state.flags.decimalInput === false && e.target.classList.contains('decimal')) {
            state.nums[`num${state.currentCount}`] += '.';
            calculator.display.current.textContent += '.';
            state.flags.decimalInput = true;
        } else if (state.flags.percentInput === false && e.target.id === 'percent') {
            state.nums[`num${state.currentCount}`] = state.nums[`num${state.currentCount}`] / 100;
            calculator.display.current.textContent = state.nums[`num${state.currentCount}`];
            state.flags.percentInput = true;
        }
        // need to add:
        // - backspace
        // - plus/minus
        // - add keyboard support
        // make sure number stays on screen, doesnt exit
        // 1e+XX functionality
        // enter .1, press equals --> .1, then presss x & 5, it should show .5, but shows 5; 
        // it shoudl store the result of the prior calculation, so can keep doing calculations with it
        // solar power
        // delay on with welcome message
});

});
