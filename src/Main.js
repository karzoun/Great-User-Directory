import React, { Component } from "react";
import axios from "axios";

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeData: [],
      direction: "reverse",
    };
  }

  //on initial load of the component
  componentDidMount() {
    //get data and trigger rerender
    this.getData().then((employeeData) => {
      this.setState({
        employeeData: employeeData.data.results,
      });
      console.log(employeeData);
    });

    this.handleReorder = this.handleReorder.bind(this);
  }

  getData() {
    return axios.get("https://randomuser.me/api/?results=200&nat=us");
  }

  handleReorder() {
    const employeeList = this.state.employeeData;
    if (this.state.direction === "reverse") {
      this.setState({
        direction: "order",
        employeeData: employeeList.sort((a, b) =>
          a.name.first > b.name.first ? 1 : -1
        ),
      });
    } else {
      this.setState({
        direction: "reverse",
        employeeData: employeeList.sort((a, b) =>
          a.name.first > b.name.first ? -1 : 1
        ),
      });
    }
  }

  handleChange(event) {
    console.log(this);
    const employeeList = this.state.employeeData;
    const searchVal = event.target.value;
    const filteredSearch = employeeList.filter(
      (employee) => employee.name.first.indexOf(searchVal) > -1
    );
    this.setState({
      employeeData: filteredSearch,
    });
  }

  render() {
    return (
      <div className="main-container">
        <div>
          <span>Search here</span>
          <input className="search input" onChange={this.handleChange} />
        </div>
        <table className="main-table">
          <thead>
            <tr>
              <th
                className={"col-1"}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  maxWidth: "unset",
                }}
              >
                Image
              </th>
              <th className={"col-2"} onClick={this.handleReorder}>
                Name
              </th>
              <th className={"col-3"}>Phone</th>
              <th className={"col-3"}>Email</th>
              <th className={"col-3"}>DOB</th>
            </tr>
          </thead>
          {this.state.employeeData.map(
            ({ picture, name, phone, email, dob, id }) => {
              return (
                <tr key={id.value}>
                  <td
                    className={"col-1"}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      maxWidth: "unset",
                    }}
                  >
                    <img src={picture.thumbnail} alt="user iamge" />
                  </td>
                  <td className={"col-2"}>
                    <h3>
                      {name.title} {name.first} {name.last}
                    </h3>
                  </td>
                  <td className={"col-3"}>
                    <h3>{phone}</h3>
                  </td>
                  <td className={"col-3"}>
                    <h3>{email}</h3>
                  </td>
                  <td className={"col-3"}>
                    <h3>{dob.date}</h3>
                  </td>
                </tr>
              );
            }
          )}
        </table>
      </div>
    );
  }
}

export default Main;
