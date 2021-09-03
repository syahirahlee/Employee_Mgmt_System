import '../App.css';
import { useState } from "react";
//library to make request with api
import Axios from "axios";
import React from 'react';

const AddEmployee = () => {
    
    //use states to send info to database
    const [name, setName] = useState("");
    const [phoneNo, setPhone] = useState(0);
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState(0);
    //to store all employees in a list
    const [empList, setEmpList] = useState([]);

    //function to get employee data entered in form and send to server side
    const addEmployee = () => {
    Axios.post("http://localhost:3001/add", {
      name: name,
      phoneNo: phoneNo,
      position: position,
      salary: salary,  
      //add values to array without push - display the newly added employee without having to press show button
    }).then(() => {
      setEmpList([
        ...empList,
        {
          name: name,
          phoneNo: phoneNo,
          position: position,
          salary: salary,
        },
      ]);
      console.log("Data successfully added");
    });
  };

    return (
      <div className="App">
      <h1 align="center">Add New Employee</h1>
        <div className="form">
        <label>Name: </label>
        <input type="text" onChange={(event) => {
           setName(event.target.value);
         }} />
 
        <label>PhoneNo:</label>
        <input type="number" onChange={(event) => {
           setPhone(event.target.value);
         }}/>
 
        <label>Position:</label>
        <input type="text" onChange={(event) => {
           setPosition(event.target.value);
         }}/>
 
        <label>Salary per year:</label>
        <input type="number" onChange={(event) => {
           setSalary(event.target.value);
         }}/>
 
        <button onClick={addEmployee}>Submit</button>
     </div>
     </div>
    );
  };

  export default AddEmployee;