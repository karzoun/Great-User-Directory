import React, { Component } from "react";
import axios from "axios";

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeData: [],
    };
  }

  render() {
    return (
      <div className="main-container">
        <table className="main-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>DOB</th>
            </tr>
          </thead>
          {this.renderEachEmployee()}
        </table>
      </div>
    );
  }

  //on initial load of the component
  componentDidMount() {
    //get data and trigger rerender
    this.getData().then((employeeData) => {
      this.setState({
        employeeData: employeeData.data.results,
      });
    });
  }

  getData = () => {
    return axios.get("https://randomuser.me/api/?results=200&nat=us");
  };

  renderEachEmployee = () => {
    console.log("******", this.state.employeeData);
    //check if there is data in array
    if (this.state.employeeData.length > 0) {
      this.state.employeeData.map(
        ({ picture, name, phone, email, dob, id }) => {
          return (
            <tr key={id.value}>
              <td>
                <img src={picture.thumbnail} alt="user iamge" />
              </td>
              <td>
                <h3>
                  `${name.title} ${name.first} ${name.last}`
                </h3>
              </td>
              <td>
                <h3>{phone}</h3>
              </td>
              <td>
                <h3>{email}</h3>
              </td>
              <td>
                <h3>{dob.date}</h3>
              </td>
            </tr>
          );
        }
      );
    }
  };
}

export default Main;
