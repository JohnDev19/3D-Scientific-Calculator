        const display = document.querySelector('.result');
        const history = document.querySelector('.history');
        const buttons = document.querySelectorAll('button');
        let currentValue = '';
        let operator = '';
        let previousValue = '';
        let memory = 0;
        let isNewCalculation = true;

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.textContent;

                if (value >= '0' && value <= '9' || value === '.') {
                    if (isNewCalculation) {
                        currentValue = value;
                        isNewCalculation = false;
                    } else {
                        currentValue += value;
                    }
                    updateDisplay();
                } else if (value === 'C') {
                    clear();
                } else if (value === '⌫') {
                    backspace();
                } else if (value === '=') {
                    calculate();
                } else if (value === '±') {
                    toggleSign();
                } else if (['MC', 'MR', 'M+', 'M-', 'MS'].includes(value)) {
                    handleMemory(value);
                } else if (['sin', 'cos', 'tan', 'log', 'ln'].includes(value)) {
                    handleMathFunction(value);
                } else if (value === 'π') {
                    currentValue = Math.PI.toString();
                    updateDisplay();
                } else if (value === 'e') {
                    currentValue = Math.E.toString();
                    updateDisplay();
                } else if (value === 'x!') {
                    factorial();
                } else if (value === '√') {
                    squareRoot();
                } else if (value === 'xy') {
                    handleOperator('^');
                } else {
                    handleOperator(value);
                }
            });
        });

        function updateDisplay() {
            display.textContent = currentValue || '0';
        }

        function updateHistory() {
            history.textContent = `${previousValue} ${operator} ${currentValue}`;
        }

        function clear() {
            currentValue = '';
            operator = '';
            previousValue = '';
            history.textContent = '';
            updateDisplay();
        }

        function backspace() {
            currentValue = currentValue.slice(0, -1);
            updateDisplay();
        }

        function toggleSign() {
            if (currentValue !== '' && currentValue !== '0') {
                currentValue = (parseFloat(currentValue) * -1).toString();
                updateDisplay();
            }
        }

        function handleMemory(action) {
            switch (action) {
                case 'MC':
                    memory = 0;
                    break;
                case 'MR':
                    currentValue = memory.toString();
                    updateDisplay();
                    break;
                case 'M+':
                    memory += parseFloat(currentValue) || 0;
                    break;
                case 'M-':
                    memory -= parseFloat(currentValue) || 0;
                    break;
                case 'MS':
                    memory = parseFloat(currentValue) || 0;
                    break;
            }
        }

        function handleMathFunction(func) {
            const num = parseFloat(currentValue);
            switch (func) {
                case 'sin':
                    currentValue = Math.sin(num).toString();
                    break;
                case 'cos':
                    currentValue = Math.cos(num).toString();
                    break;
                case 'tan':
                    currentValue = Math.tan(num).toString();
                    break;
                case 'log':
                    currentValue = Math.log10(num).toString();
                    break;
                case 'ln':
                    currentValue = Math.log(num).toString();
                    break;
            }
            updateDisplay();
        }

        function factorial() {
            const num = parseInt(currentValue);
            let result = 1;
            for (let i = 2; i <= num; i++) {
                result *= i;
            }
            currentValue = result.toString();
            updateDisplay();
        }

        function squareRoot() {
            currentValue = Math.sqrt(parseFloat(currentValue)).toString();
            updateDisplay();
        }

        function handleOperator(op) {
            if (currentValue !== '') {
                if (previousValue !== '') {
                    calculate();
                }
                previousValue = currentValue;
                currentValue = '';
                operator = op;
                updateHistory();
            }
        }

        function calculate() {
            if (previousValue !== '' && currentValue !== '' && operator !== '') {
                const prev = parseFloat(previousValue);
                const current = parseFloat(currentValue);
                let result;

                switch (operator) {
                    case '+':
                        result = prev + current;
                        break;
                    case '-':
                        result = prev - current;
                        break;
                    case '×':
                        result = prev * current;
                        break;
                    case '÷':
                        result = prev / current;
                        break;
                    case '%':
                        result = (prev / 100) * current;
                        break;
                    case '^':
                        result = Math.pow(prev, current);
                        break;
                }

                currentValue = result.toFixed(8).replace(/\.?0+$/, '');
                operator = '';
                previousValue = '';
                updateDisplay();
                history.textContent = '';
                isNewCalculation = true;
            }
        }