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
server.patch("/api/employees/:id", function (req, res) {
  const foundEmployee = employees.find(
    (employee) => employee.id == parseInt(req.params.id)
  );
  // if the course is not found, return a 404 error
  if (foundEmployee == null) {
    res.status(404).send("employee not found");
    return;
  }
  if (foundEmployee) {
    for (let i in req.body) {
      foundEmployee[i] = req.body[i];
    }
    return res.status(200).send(foundEmployee);
  }
  return res.status(404).send("wrong ID, employee not found.");
});

server.delete("/employees/delete/:id", (req, res) => {
  const foundEmployee = employees.find(
    (employee) => employee.id == parseInt(req.params.id)
  );

  const foundEmployeeIndex = employees.indexOf(foundEmployee);

  if (!foundEmployee) {
    return res.status(404).send("employee not found.");
  }
  employees.splice(foundEmployeeIndex, 1);
  return res.status(200).send(foundEmployee);
});
server.listen(3000, () => {
  console.log("Server working!");
});
