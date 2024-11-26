document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const calculator = {
        display: {
            current: document.querySelector('.current-operation span'),
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
        lastResult: null,
        currentCount: 1,
        flags: {
            operatorInput: false,
            decimalInput: false,
            shouldResetDisplay: false,
            clearAll: false
        }  
    };

    const operations = {
        add: (a, b) => a + b,
        subtract: (a, b) => a - b,
        multiply: (a, b) => a * b,
        divide: (a, b) => b === 0 ? 'Here be dragons' : a / b
    };

    const formatNumber = (num) => {
        const rounded = Math.round(num * 1000) / 1000;
        return rounded.toString().length > 12 ? rounded.toExponential(6) : rounded.toString();
    }

    const operate = () => {
        const num1 = parseFloat(state.nums.num1);
        const num2 = parseFloat(state.nums.num2) || 0;

        if (isNaN(num1) || isNaN(num2)) {
            return 'Error';
        }

        const result = operations[state.operator](num1, num2);

        if (typeof result === 'string') {
            calculator.display.current.textContent = result;
        } else {
            calculator.display.previous.textContent = `${calculator.display.current.textContent}=`;
            calculator.display.current.textContent = formatNumber(result);
            state.lastResult = formatNumber(result);
        }
        if (!state.lastResult) {
            state.flags.shouldResetDisplay = true;
        }

        reset();
    };

    const reset = () => {
        state.currentCount = 1;
        state.nums.num1 = '';
        state.nums.num2 = '';
        state.operator = '';
        state.flags.operatorInput = false;
        state.flags.decimalInput = false;
        calculator.operators.forEach(operator => operator.classList.remove('active'));

        if (!state.flags.clearAll && state.lastResult !== null) {
            state.nums.num1 = state.lastResult;
            calculator.display.current.textContent = state.lastResult;
        }
        state.flags.clearAll = false;
    };

    const clear = () => {
        state.flags.clearAll = true;
        reset();
        state.lastResult = null;
        calculator.display.current.textContent = '';
        calculator.display.previous.textContent = '';
        state.flags.shouldResetDisplay = false;
    };

    const handleNumber = (number) => {
        state.nums[`num${state.currentCount}`] += number;

        const currentNum = state.nums[`num${state.currentCount}`];
        
        if (currentNum.length >= 12) {
            calculator.display.previous.textContent = 'Max input length reached';
            setTimeout(() => calculator.display.previous.textContent = '', 1000);
            return;
        };

        if (state.flags.shouldResetDisplay) {
            calculator.display.current.textContent = '';
            state.flags.shouldResetDisplay = false;
        }
        
        calculator.display.current.textContent += number;
    };

    const handleOperator = (operatorEl) => {
        if (state.nums.num1 === '') {
            state.nums.num1 = '0';
        }
        if (state.flags.operatorInput) {
            operate();
        };

        state.operator = operatorEl.id;
        state.flags.operatorInput = true;
        state.currentCount = 2;
        state.flags.decimalInput = false;

        operatorEl.classList.add('active');
        calculator.display.current.textContent += operatorEl.textContent;
    };

    const handleDecimal = () => {
        if (state.flags.decimalInput) return;

        const currentNum = `num${state.currentCount}`;
        if (!state.flags.decimalInput) {
            state.nums[currentNum] += '.';
            calculator.display.current.textContent += '.';
            state.flags.decimalInput = true;
        }
    };

    const handlePercent = () => {
        const currentNum = `num${state.currentCount}`;
        if (state.nums[currentNum]) {
            state.nums[currentNum] = (parseFloat(state.nums[currentNum]) / 100).toString();
            calculator.display.current.textContent = state.nums[currentNum];
        }
    };

    const handleSignChange = () => {
        const currentNum = `num${state.currentCount}`;
        if (state.nums[currentNum]) {
            state.nums[currentNum] = (-parseFloat(state.nums[currentNum])).toString();
            calculator.display.current.textContent = state.nums[currentNum];
        }
    };

    const handleBackspace = () => {
        const currentNum = `num${state.currentCount}`;
        if (state.nums[currentNum]) {
            state.nums[currentNum] = state.nums[currentNum].slice(0, -1);
            calculator.display.current.textContent = state.nums[currentNum];
        }
    };

    calculator.buttons.addEventListener('click', (e) => {
        const target = e.target;

        if (target.classList.contains('number')) {
            handleNumber(target.textContent);            
        } else if (target.id === 'clear') {
            clear();
        } else if (target.classList.contains('operator')) {
            handleOperator(target);
        } else if (e.target.classList.contains('equals')) {
            operate();
        } else if (target.classList.contains('decimal')) {
            handleDecimal();
        } else if (target.id === 'percent') {
            handlePercent();
        } else if (target.id === 'plus-minus') {
            handleSignChange();
        } else if (target.id === 'backspace') {
            handleBackspace();
        }
        // need to add:
        // - add keyboard support
        // delay on with welcome message
        // dark mode?
});

});
