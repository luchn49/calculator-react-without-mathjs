import React, { Component } from "react";

export default class Button extends Component {
  isOperator = value => {
    return !isNaN(value) || value === "." || value === "=";
  };

  setClassName = value => {
    let result = "";
    if (value === "=") {
      result = "equalsBtn operationBtn";
    } else if (isNaN(value) && value !== ".") {
      result = "operationBtn";
    } else {
      result = value === "0" ? "zeroBtn" : "";
    }
    return result;
  };
  render() {
    let { children, onHandleClick } = this.props;
    return (
      <button
        className={this.setClassName(children)}
        onClick={() => {
          onHandleClick(children);
        }}
      >
        {children}
      </button>
    );
  }
}
