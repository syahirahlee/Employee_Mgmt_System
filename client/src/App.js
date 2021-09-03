import './App.css';
import { useState } from "react";
//library to make request with api
import Axios from "axios";

function App() {

  //use states to send info to database
  const [name, setName] = useState("");
  const [phoneNo, setPhone] = useState(0);
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  //to store all employees in a list
  const [empList, setEmpList] = useState([]);
  //to update salary
  const [newSalary, setNewSalary] = useState(0);

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

  //function to fetch all employees from database to display
  //get response
  const displayEmployee = () => {
    Axios.get("http://localhost:3001/display").then((response) => {
    //convert data received from db into the list  
    setEmpList(response.data);
    });
  };

  //function to update new salary in database based on employee id
  const updateSalary = (id) => {
    Axios.put("http://localhost:3001/update", { salary: newSalary, id: id }).then(
      (response) => {
        //update the value in the employees list immediately (instead of clicking on the button again)
        setEmpList(
          empList.map((val) => {
            return val.id === id? {
                  id: val.id,
                  name: val.name,
                  phoneNo: val.phoneNo,
                  position: val.position,
                  salary: newSalary,
                }
              : val;
          })
        );
      }
    );
  };

  //function to remove employee from database 
  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
       //update the employees list immediately
       setEmpList(
        empList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
     <h1 align="center">Employee Management System</h1>

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

       <button onClick={addEmployee}>Add Employee</button>
    </div>
    <br></br>

    <div className="listEmployees"> 
    <button onClick={displayEmployee}>Show List of Employees</button>
    {empList.map((val,key) =>{
      return <div className="list">
        <div> 
          <h3>Name: {val.name}</h3>
          <h3>Phone No: {val.phoneNo}</h3>
          <h3>Position: {val.position}</h3>
          <h3>Salary: {val.salary}</h3>
        </div>  
        <div> 
          <input type="text" placeholder="10000..."
            onChange={(event) => {
              setNewSalary(event.target.value);
            }}
          />
          <button onClick={() => {
              updateSalary(val.id);
            }}
          >
          {" "}
          Update Salary
          </button>
          <button onClick={() => {
              deleteEmployee(val.id);
              }}
            > Delete Employee
          </button>

        </div> 
      </div>

    })}
    </div>
    </div>
  );
}

export default App;
