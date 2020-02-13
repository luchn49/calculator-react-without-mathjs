import React, { Component } from "react";

export default class Display extends Component {
  render() {
    let { children } = this.props;
    return <div className="calcWrapper">{children}</div>;
  }
}
