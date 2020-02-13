import React, { Component } from "react";

export default class Result extends Component {
  render() {
    let { displayValue, result } = this.props;
    return (
      <div className="inputField">
        <div>{result}</div>
        <div
          style={{
            fontStyle: "italic",
            fontSize: "35px",
            fontWeight: "normal"
          }}
        >
          {displayValue}
        </div>
      </div>
    );
  }
}
