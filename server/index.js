  
const express = require("express"); //server
const app = express();  
const mysql = require("mysql"); //database
const cors = require("cors"); //allow send request to api

//enable send request from front end to back end
app.use(cors());
app.use(express.json());

//create database variable to make queries
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "employee_system",
});

//function to save employee data added to database
//req: request get from db
//res: response send to front end
app.post("/add", (req, res) => {
    //declare variables to send to database
    const name = req.body.name;
    const phoneNo = req.body.phoneNo;
    const position = req.body.position;
    const salary = req.body.salary;

    //insert data to db
    // ? : get data using array, instead of putting variable directly into sql statement
    db.query(
        "INSERT INTO employees (name, phoneNo, position, salary) VALUES (?,?,?,?)",
        [name, phoneNo, position, salary],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send("Data successfully inserted");
          }
        }
      );
});

//function to retrieve all employees from database
app.get("/display", (req, res) => {
  //get all employees
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//update or modify data in database
app.put("/update", (req, res) => {
  const id = req.body.id;
  const salary = req.body.salary;
  db.query(
    "UPDATE employees SET salary = ? WHERE id = ?",
    [salary, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//remove data from database
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//set different port from front end
app.listen(3001, () => {
    console.log("Server running on port 3001");
  });