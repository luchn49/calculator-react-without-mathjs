import React, { Component } from "react";
import Button from "../../components/Button/Button";
import Result from "../../components/Result/Result";
import Display from "../../components/Display/Display";
import { Calculate } from "../../constant/Calculate";

export default class DisplayContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayValue: "0",
      inputValue: null,
      operator: null,
      result: 0,
      decimalFlag: true,
      equalsFlag: false
    };
  }

  onAddToInput = value => {
    let { displayValue, inputValue, result, operator, equalsFlag } = this.state;
    displayValue = equalsFlag ? "0" : displayValue;
    let newInput = inputValue === null ? value : inputValue + value;
    this.setState({
      displayValue: displayValue === "0" ? value : displayValue + value,
      inputValue: result === 0 ? 0 : parseFloat(newInput),
      result: operator ? result : parseFloat(displayValue + value),
      equalsFlag: false
    });
  };

  onClearDisplay = () => {
    //Xóa tất cả --> trả về giá trị default
    this.setState({
      displayValue: "0",
      inputValue: null,
      operator: null,
      result: 0,
      decimalFlag: true,
      equalsFlag: false
    });
  };

  onClearLastChar = () => {
    //Xóa ký tự cuối. Nếu ko có thì trả về 0
    let { displayValue, inputValue } = this.state;
    this.setState({
      displayValue: displayValue.substring(0, displayValue.length - 1) || "0",
      inputValue: !isNaN(displayValue[displayValue.length - 1])
        ? null
        : inputValue,
      decimalFlag: displayValue[displayValue.length - 1] === "." ? true : false
    });
  };

  onAddDecimal = () => {
    //Chỉ thêm "." khi trong displayValue chưa có "."
    let { displayValue, decimalFlag, inputValue } = this.state;
    if (decimalFlag) {
      this.setState({
        displayValue: displayValue + ".",
        decimalFlag: false,
        inputValue: inputValue === null ? "." : inputValue + "."
      });
    }
  };

  onCalculator = (operator, prevValue, nextValue) => {
    return Calculate[operator](prevValue, nextValue);
  };

  onAddOperator = nextOperator => {
    let { displayValue, operator, inputValue, result } = this.state;
    if (operator) {
      const newResult = this.onCalculator(operator, result, inputValue);
      this.setState({
        displayValue: newResult + nextOperator,
        result: newResult
      });
    } else {
      this.setState({
        displayValue: displayValue + nextOperator
      });
    }
    this.setState({
      inputValue: null,
      decimalFlag: true,
      operator: nextOperator
    });
  };
  onAddPercent = () => {
    let { displayValue, operator, inputValue, result } = this.state;
    if (operator) {
      const newResult = this.onCalculator(operator, result, inputValue);
      this.setState({
        displayValue: newResult / 100,
        result: newResult / 100
      });
    } else {
      this.setState({
        displayValue: parseFloat(displayValue) / 100,
        result: parseFloat(displayValue) / 100
      });
    }
  };

  onEquals = () => {
    let { operator, inputValue, result } = this.state;
    const newResult = !operator
      ? result
      : this.onCalculator(operator, result, inputValue);
    this.setState({
      displayValue: String(newResult),
      result: newResult,
      operator: null,
      equalsFlag: true
    });
  };

  onHandleKeyDown = event => {
    let { key } = event;
    if (key === "Enter") {
      event.preventDefault();
      this.onEquals();
    }
    if (/\d/.test(key)) {
      event.preventDefault();
      this.onAddToInput(key);
    } else if (key in Calculate) {
      event.preventDefault();
      this.onAddOperator(key);
    } else if (key === ".") {
      event.preventDefault();
      this.onAddDecimal();
    } else if (key === "%") {
      event.preventDefault();
      this.onAddPercent();
    } else if (key === "Backspace") {
      event.preventDefault();
      this.onClearLastChar();
    } else if (key === "Delete") {
      event.preventDefault();
      this.onClearDisplay();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.onHandleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onHandleKeyDown);
  }

  render() {
    let { displayValue, result } = this.state;
    return (
      <Display>
        <div className="case">
          <p className="title">React Calculator</p>
          <Result displayValue={displayValue} result={result} />
          <div>
            <div className="calcUI">
              <Button onHandleClick={this.onClearDisplay}>AC</Button>
              <Button onHandleClick={this.onClearLastChar}>C</Button>
              <Button
                onHandleClick={value => {
                  this.onAddPercent(value);
                }}
              >
                %
              </Button>
              <Button
                onHandleClick={value => {
                  this.onAddOperator(value);
                }}
              >
                /
              </Button>
              <Button onHandleClick={this.onAddToInput}>7</Button>
              <Button onHandleClick={this.onAddToInput}>8</Button>
              <Button onHandleClick={this.onAddToInput}>9</Button>
              <Button
                onHandleClick={value => {
                  this.onAddOperator(value);
                }}
              >
                *
              </Button>
              <Button onHandleClick={this.onAddToInput}>4</Button>
              <Button onHandleClick={this.onAddToInput}>5</Button>
              <Button onHandleClick={this.onAddToInput}>6</Button>
              <Button
                onHandleClick={value => {
                  this.onAddOperator(value);
                }}
              >
                +
              </Button>
              <Button onHandleClick={this.onAddToInput}>1</Button>
              <Button onHandleClick={this.onAddToInput}>2</Button>
              <Button onHandleClick={this.onAddToInput}>3</Button>
              <Button
                onHandleClick={value => {
                  this.onAddOperator(value);
                }}
              >
                -
              </Button>
              <Button onHandleClick={this.onAddToInput}>0</Button>
              <Button onHandleClick={this.onAddDecimal}>.</Button>
              <Button
                onHandleClick={value => {
                  this.onEquals();
                }}
              >
                =
              </Button>
            </div>
          </div>
        </div>
      </Display>
    );
  }
}
