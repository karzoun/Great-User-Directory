import React, { Component } from "react";

export class Header extends Component {
  render() {
    return (
      <header style={headerStyle} className="header-container">
        <h1>Great Employee Directory</h1>
      </header>
    );
  }
}
const headerStyle = {
  background: "#333",
  color: "#fff",
  textAlign: "center",
  padding: "10px",
};

export default Header;
