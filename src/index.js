import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  state = {
    prevVal: null,
    currentVal: "0",
    activeOperator: null
  };

  handleNumberPress = e => {
    const number = e.target.innerHTML;
    this.setState(({ currentVal, prevVal, activeOperator }) => {
      // handles max length
      if (currentVal.length === 11) return;
      // handles when an operator has bn clicked
      if (activeOperator !== null) {
        // handles new number when starting number == 0
        if (currentVal === "0" || activeOperator === "=") {
          return {
            currentVal: number
          };
        }
        // handles when there's a previous val
        if (prevVal !== null) {
          return {
            currentVal: `${currentVal}${number}`
          };
        }
        return {
          prevVal: currentVal,
          currentVal: number
        };
      }
      // handles new number when starting number == 0
      if (currentVal === "0") {
        return {
          currentVal: number
        };
      } else {
        return {
          currentVal: `${currentVal}${number}`
        };
      }
    });
  };

  handleActiveClass = (className, val) => {
    const { activeOperator, prevVal } = this.state;
    if (val === activeOperator && prevVal === null) {
      return `${className} active`;
    }
    return className;
  };

  setActiveOperator = e => {
    e.persist();
    this.setState(({ activeOperator, prevVal, currentVal }) => {
      if (activeOperator !== null) {
        if (prevVal !== null) {
          const val = this.calculate(prevVal, activeOperator, currentVal);
          return {
            activeOperator: e.target.innerText,
            currentVal: val,
            prevVal: null
          };
        }
      }
      return {
        activeOperator: e.target.innerText
      };
    });
  };

  calculate = (prev, op, curr) => {
    curr = Number(curr);
    prev = Number(prev);
    console.log(prev, curr, prev - curr);
    return {
      "-": (a, b) => a - b,
      "+": (a, b) => a + b,
      "÷": (a, b) => a / b,
      "×": (a, b) => a * b
    }[op](prev, curr);
  };

  handleEqual = () => {
    this.setState(({ prevVal, activeOperator, currentVal }) => {
      if (prevVal !== null) {
        const val = this.calculate(prevVal, activeOperator, currentVal);
        return {
          currentVal: val,
          prevVal: null,
          activeOperator: "="
        };
      }
    });
  };

  handleReset = e => {
    const reset = e.target.innerText;
    if (reset === "C") {
      this.setState({
        currentVal: "0"
      });
    } else {
      this.setState({
        currentVal: "0",
        prevVal: null,
        activeOperator: null
      });
    }
  };

  handlePercentage = () => {
    this.setState(({ currentVal }) => {
      return {
        currentVal: `${this.calculate(currentVal, "÷", 100)}`
      };
    });
  };

  handleSign = () => {
    this.setState(({ currentVal }) => {
      if (currentVal.indexOf("-") === 0) {
        return {
          currentVal: `${currentVal.substr(1)}`
        };
      }
      return {
        currentVal: `-${currentVal}`
      };
    });
  };

  handleDecimal = () => {
    this.setState(({ currentVal }) => {
      if (currentVal.indexOf(".") === -1) {
        return {
          currentVal: `${currentVal}.`
        };
      }
    });
  };

  render() {
    const { currentVal } = this.state;
    return (
      <div className="calculator">
        <div className="display">
          <span className="display__value">{currentVal}</span>
        </div>
        <div className="keyboard">
          <button className="key key__grey" onClick={this.handleReset}>
            {currentVal === "0" ? "AC" : "C"}
          </button>
          <button className="key key__grey" onClick={this.handleSign}>
            +/-
          </button>
          <button className="key key__grey" onClick={this.handlePercentage}>
            %
          </button>
          <button
            className={this.handleActiveClass("key key__yellow", "÷")}
            onClick={this.setActiveOperator}
          >
            &divide;
          </button>
          <button className="key" onClick={this.handleNumberPress}>
            7
          </button>
          <button className="key" onClick={this.handleNumberPress}>
            8
          </button>
          <button className="key" onClick={this.handleNumberPress}>
            9
          </button>
          <button
            className={this.handleActiveClass("key key__yellow", "×")}
            onClick={this.setActiveOperator}
          >
            &times;
          </button>
          <button className="key" onClick={this.handleNumberPress}>
            4
          </button>
          <button className="key" onClick={this.handleNumberPress}>
            5
          </button>
          <button className="key" onClick={this.handleNumberPress}>
            6
          </button>
          <button
            className={this.handleActiveClass("key key__yellow", "-")}
            onClick={this.setActiveOperator}
          >
            -
          </button>
          <button className="key" onClick={this.handleNumberPress}>
            1
          </button>
          <button className="key" onClick={this.handleNumberPress}>
            2
          </button>
          <button className="key" onClick={this.handleNumberPress}>
            3
          </button>
          <button
            className={this.handleActiveClass("key key__yellow", "+")}
            onClick={this.setActiveOperator}
          >
            +
          </button>
          <button className="key key_0" onClick={this.handleNumberPress}>
            0
          </button>
          <button className="key" onClick={this.handleDecimal}>
            .
          </button>
          <button className="key key__yellow" onClick={this.handleEqual}>
            =
          </button>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
