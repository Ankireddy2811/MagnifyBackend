const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());
const mysql = require("mysql");

const dbConfig = {
  host: "localhost",
  user: "Ankaiah123",
  password: "Ankaiah@123",
  database: "data",
};

app.use(cors());
app.use(express.json());

const pool = mysql.createPool(dbConfig);

app.listen(3011, () => {
    console.log(`Server is running at http://localhost:3011/`);
});

app.post("/students/create", (req, res) => {
    const {first_name, last_name, age, email, class_id } = req.body;
    const query = `INSERT INTO students (first_name, last_name, age, email, class_id) VALUES (?, ?, ?, ?, ?)`;
    pool.query(query, [first_name, last_name, age, email, class_id], (err, result) => {
        if (err) {
            console.error("Error inserting student:", err);
            res.status(500).send("Error inserting student");
            return;
        }
        res.status(201).json("Student created successfully");
    });
});

  
app.get("/students", (req, res) => {
  console.log("HI")
  pool.query("SELECT * FROM students", (err, results) => {
    if (err) {
      console.error("Error fetching students:", err);
      res.status(500).send("Error fetching students");
      return;
    }
    res.json(results);
  });
});

app.put("/students/update/:id", (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, age, email, class_id } = req.body;
  const query = "UPDATE students SET first_name = ?, last_name = ?, age = ?, email = ?, class_id = ? WHERE student_id = ?";
  pool.query(query, [first_name, last_name, age, email, class_id, id], (err, result) => {
    if (err) {
      console.error("Error updating student:", err);
      res.status(500).send("Error updating student");
      return;
    }
    res.send("Student updated successfully");
  });
});

app.delete("/students/delete/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM students WHERE student_id = ?";
  pool.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting student:", err);
      res.status(500).send("Error deleting student");
      return;
    }
    res.send("Student deleted successfully");
  });
});

// app.post("/classes", (req, res) => {
//   const { class_name, teacher_name, start_date, end_date } = req.body;
//   const query = "INSERT INTO classes (class_name, teacher_name, start_date, end_date) VALUES (?, ?, ?, ?)";
//   pool.query(query, [class_name, teacher_name, start_date, end_date], (err, result) => {
//     if (err) {
//       console.error("Error inserting class:", err);
//       res.status(500).send("Error inserting class");
//       return;
//     }
//     res.status(201).send("Class created successfully");
//   });
// });

app.get("/classes", (req, res) => {
  pool.query("SELECT * FROM classes", (err, results) => {
    if (err) {
      console.error("Error fetching classes:", err);
      res.status(500).send("Error fetching classes");
      return;
    }
    res.json(results);
  });
});

// app.put("/classes/:id", (req, res) => {
//   const id = req.params.id;
//   const { class_name, teacher_name, start_date, end_date } = req.body;
//   const query = "UPDATE classes SET class_name = ?, teacher_name = ?, start_date = ?, end_date = ? WHERE class_id = ?";
//   pool.query(query, [class_name, teacher_name, start_date, end_date, id], (err, result) => {
//     if (err) {
//       console.error("Error updating class:", err);
//       res.status(500).send("Error updating class");
//       return;
//     }
//     res.send("Class updated successfully");
//   });
// });

// app.delete("/classes/:id", (req, res) => {
//   const id = req.params.id;
//   const query = "DELETE FROM classes WHERE class_id = ?";
//   pool.query(query, [id], (err, result) => {
//     if (err) {
//       console.error("Error deleting class:", err);
//       res.status(500).send("Error deleting class");
//       return;
//     }
//     res.send("Class deleted successfully");
//   });
// });



