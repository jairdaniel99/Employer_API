const express = require("express");
const server = express();
server.use(express.json());

let employees = [
  { id: 1, name: "Jair", department: "Engineering", salary: "1M/year" },
  { id: 2, name: "Sultan", department: "Farming", salary: "2M/year" },
  { id: 3, name: "Mary", department: "HR", salary: "5M/year" },
];

server.get("/", (req, res) => {
  res.send(employees);
});

server.post("/employees", (req, res) => {
  const newEmployee = {
    id: employees.length + 1,
    name: req.body.name,
    department: req.body.department,
    salary: req.body.salary,
  };
  employees.push(newEmployee);
  res.send(newEmployee, 201); // second argument specifies status code: 201 means new resourse created
});

server.listen(3000, () => {
  console.log("Server working!");
});

// do the rest yourself!!!
