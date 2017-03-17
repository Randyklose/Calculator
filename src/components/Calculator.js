import React from 'react';

String.prototype.isNumeric = function() {
    return !isNaN(parseFloat(this)) && isFinite(this);
}

class Calculator extends React.Component {
    constructor() {
        super()
        this.state = {
            currentInput: ""
        }
    }
    _handleKeyPress(e) {
        e.preventDefault();
        if (e.key === 'Enter') {
            this._handleEqualButton()
        }
    }
    //    onKeyDown = (event) =>{
    //      console.log( event.which )
    //    };
    //
    //  componentDidMount() {
    //   document.addEventListener('keydown', this.onKeyDown);
    // }

    _handleClearButton() {
        this.setState({currentInput: ""})
    }

    _handleButtons(val) {
        this.setState({
            currentInput: this.state.currentInput + val
        })
    }

    _newValue(e) {
        this.setState({currentInput: e.target.value})
    }

    _handleEqualButton() {
        var polishNotation = this._toPolishNotation(this.state.currentInput)
        console.log(polishNotation)
        var solution = this._solvePolishNotation(polishNotation)
        console.log(solution)
        this.setState({currentInput: solution})
    }

    render() {
        return (
            <div className="calc">
              <input
                type="text"
                name="input" 
                size="16"
                value={this.state.currentInput}
                onChange={(e) => this._newValue(e)}
                onKeyDown={(e) => this._handleKeyPress(e)}
              />
                <br/>
                <button className="clear" name="one" onClick={() => this._handleClearButton()}>
                    C
                </button>
                <button name="parenthesis-left" onClick={() => this._handleButtons(" ( ")}>
                    (
                </button>
                <button name="parenthesis-rigth" onClick={() => this._handleButtons(" ) ")}>
                    )
                </button>
                <button name="division" onClick={() => this._handleButtons(" / ")}>
                    /
                </button>
                <br/>
                <button name="one" onClick={() => this._handleButtons("1")}>
                    1
                </button>
                <button name="two" onClick={() => this._handleButtons("2")}>
                    2
                </button>
                <button name="three" onClick={() => this._handleButtons("3")}>
                    3
                </button>
                <button name="times" onClick={() => this._handleButtons(" * ")}>
                    *
                </button>
                <br/>
                <button name="four" onClick={() => this._handleButtons("4")}>
                    4
                </button>
                <button name="five" onClick={() => this._handleButtons("5")}>
                    5
                </button>
                <button name="six" onClick={() => this._handleButtons("6")}>
                    6
                </button>
                <button name="minus" onClick={() => this._handleButtons(" - ")}>
                    -
                </button>
                <br/>
                <button name="seven" onClick={() => this._handleButtons("7")}>
                    7
                </button>
                <button name="eight" onClick={() => this._handleButtons("8")}>
                    8
                </button>
                <button name="nine" onClick={() => this._handleButtons("9")}>
                    9
                </button>
                <button name="plus" onClick={() => this._handleButtons(" + ")}>
                    +
                </button>
                <br/>
                <button name="dot" onClick={() => this._handleButtons(".")}>
                    .
                </button>
                <button name="zero" onClick={() => this._handleButtons("0")}>
                    0
                </button>
                <button className="equal" name="DoIt" onClick={() => this._handleEqualButton()}>
                    =
                </button>
                <br/>
            </div>
        )
    }

    _toPolishNotation = (input) => {
        var outputQueue = "";
        var operatorStack = [];
        var operators = {
            "/": {
                precedence: 3,
                associativity: "Left"
            },
            "*": {
                precedence: 3,
                associativity: "Left"
            },
            "+": {
                precedence: 2,
                associativity: "Left"
            },
            "-": {
                precedence: 2,
                associativity: "Left"
            }
        }
        input = input.replace(/\s+/g, "");
        input = input.split(/([\+\-\*\/\^\(\)])/).filter(x => x !== "");
        for (var i = 0; i < input.length; i++) {
            var token = input[i];
            if (token.isNumeric()) {
                outputQueue += token + " ";
            } else if ("^*/+-".indexOf(token) !== -1) {
                var o1 = token;
                var o2 = operatorStack[operatorStack.length - 1];
                while ("^*/+-".indexOf(o2) !== -1 && ((operators[o1].associativity === "Left" && operators[o1].precedence <= operators[o2].precedence) || (operators[o1].associativity === "Right" && operators[o1].precedence < operators[o2].precedence))) {
                    outputQueue += operatorStack.pop() + " ";
                    o2 = operatorStack[operatorStack.length - 1];
                }
                operatorStack.push(o1);
            } else if (token === "(") {
                operatorStack.push(token);
            } else if (token === ")") {
                while (operatorStack[operatorStack.length - 1] !== "(") {
                    outputQueue += operatorStack.pop() + " ";
                }
                operatorStack.pop();
            }
        }
        while (operatorStack.length > 0) {
            outputQueue += operatorStack.pop() + " ";
        }
        return outputQueue;
    }

    _solvePolishNotation = (input) => {
        var resultStack = [];
        input = input.split(" ");
        for (var i = 0; i < input.length; i++) {
            if (input[i].isNumeric()) {
                resultStack.push(input[i]);
            } else {
                if (i === input.length - 1) {
                    return resultStack[0]
                }
                var a = resultStack.pop();
                var b = resultStack.pop();
                if (input[i] === "+") {
                    resultStack.push(parseInt(a) + parseInt(b));
                } else if (input[i] === "-") {
                    resultStack.push(parseInt(b) - parseInt(a));
                } else if (input[i] === "*") {
                    resultStack.push(parseInt(a) * parseInt(b));
                } else if (input[i] === "/") {
                    resultStack.push(parseInt(b) / parseInt(a));
                }
            }

        }
    }
}

export default Calculator;
