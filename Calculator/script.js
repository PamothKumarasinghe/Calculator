document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll("button");

    let currentInput = "";
    let displayInput = "";
    let evaluated = false;
    let lastAnswer = 0;
    
    const symbolMap = {
        "+" : "+",
        "-" : "-",
        "*" : "×",
        "/" : "÷",
        "." : ".",
        "^" : "^"
    }
    display.value = 0;
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (button.id === "clear") {
                currentInput = "";
                displayInput = "";
                display.value = "0";
                evaluated = false;
                lastAnswer = 0;
            }
            else if (button.id === "equals") {
                try {
                    const result = math.evaluate(currentInput, {Ans: lastAnswer}).toString();
                    currentInput = result;
                    displayInput = result;
                    display.value = result;
                    evaluated = true;
                    lastAnswer = result;
                }
                catch (error) {
                    display.value = "Error";
                    currentInput = "";
                    displayInput = "";
                    evaluated = false;
                }
            }
            else if (button.id === "backspace") {
                if (currentInput.endsWith("Ans")) {
                    currentInput = currentInput.slice(0, -3);
                    displayInput = displayInput.slice(0, -3);
                }
                else if (currentInput.length > 0) {
                    currentInput = currentInput.slice(0, -1);
                    displayInput = displayInput.slice(0, -1);
                }
                display.value = displayInput || "0";
            }
            else if (button.id === "Ans") {
                currentInput += "Ans";
                displayInput += "Ans";
                display.value = displayInput;
                evaluated = false;
            }
            else {
                const inputValue = value; // This is the actual value used in evaluation
                const displaySymbol = symbolMap[value] || value; // What to show on the screen

                if (evaluated) {
                    if ("+-*/^".includes(inputValue)) {
                        currentInput += inputValue;
                        displayInput += displaySymbol;
                    } else {
                        currentInput = inputValue;
                        displayInput = displaySymbol;
                    }
                    evaluated = false;
                } else {
                    currentInput += inputValue;
                    displayInput += displaySymbol;
                }

                display.value = displayInput || "0";
            }
        });
    });
    document.addEventListener('keydown', (event) => {
        const key = event.key;

        if (/[0-9+\-*/.^]/.test(key)) {
            simulateButtonClick(key);
        }
        else if (key === "Enter" || key === "=") {
            simulateButtonClick("equals");
        }
        else if (key === "Backspace") {
            simulateButtonClick("backspace");
        }
        else if (key.toLowerCase() === "c") {
            simulateButtonClick("clear");
        }
        else if (key.toLowerCase() === "a") {
            simulateButtonClick("Ans");
        }
     });

    // Function to simulate button clicks
    function simulateButtonClick(value) {
        const buttons = document.querySelectorAll(".btn");
        buttons.forEach(button => {
            const buttonValue = button.getAttribute('data-value') || button.id;
            if (buttonValue === value) {
                button.click();
            }
        });
    }
});