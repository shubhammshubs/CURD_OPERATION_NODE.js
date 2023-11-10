const express = require('express');
const mysql = require('mysql');

const app  = express();


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "shubhamdb",
    multipleStatements: true,
})


app.listen(3036, () => {
  console.log("Listining...");
})

// GET all the department Details 
//  Pass this Query in postman = GET http://localhost:3036/department
app.get("/department", (req, res) => {
    const sql = "SELECT * FROM department";
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err); // Log the error to the console
            return res.status(500).json({ error: "An error occurred" });
        }
        return res.json(data);
    });
});
// GET all the Employe Details 
//  Pass this Query in postman = GET http://localhost:3036/employe1

app.get("/employe1", (req, res) => {
    const sql = "SELECT * FROM employe1";
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err); // Log the error to the console
            return res.status(500).json({ error: "An error occurred" });
        }
        console.log(data)
        return res.json(data);
    });
});

// Get an Employe by id
//  Pass this Query in postman = GET http://localhost:3036/employe1/8

app.get("/employe1/:id", (req, res) => {
    const sql = "SELECT * FROM employe1 WHERE EMPID = ?";
    db.query(sql,[req.params.id], (err, data) => {
        if (!err) {
            console.log(data)
            return res.json(data);
        }
        else{
            console.error(err); // Log the error to the console
            return res.status(500).json({ error: "An error occurred" });
        }
    });
});

// Delete an Employe by id
//  Pass this Query in postman = DELETE http://localhost:3036/employe1/8

app.delete("/employe1/:id", (req, res) => {
    const sql = "DELETE FROM employe1 WHERE EMPID = ?";
    db.query(sql,[req.params.id], (err, data) => {
        if (!err) {
            res.send("Deleted Successfully.")
            console.log(data)
            return res.json(data);
        }
        else{
            console.error(err); // Log the error to the console
            return res.status(500).json({ error: "An error occurred" });
        }
        
    });
});

// Insert an Employee by id

//  Pass this Query in postman = POST http://localhost:3036/employe1/1  {1 is EMPID} 
//  and in Body Raw pass this ={
    // "EMPID": 6,
//     "EmpName": "Fiona",
//     "EmpAge": "12",
//     "EmpDept": "asd"
// }
app.use(express.json());
app.post('/employe1', (req, res) => {
    try {
        const newRecord = req.body;

        // Construct an SQL query to insert a new record
        const sql = 'INSERT INTO employe1 SET ?';

        db.query(sql, newRecord, (error, results) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }

            return res.json({ message: 'employe1 inserted successfully', newRecordId: results.insertId });
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// UPDATE THE RECORD 

//  Pass this Query in postman = PUT http://localhost:3036/employe1  
//  and in Body Raw pass this ={
//     "EMPID": 6,
//     "EmpName": "Fiona",
//     "EmpAge": "12",
//     "EmpDept": "asd"
// }
app.put('/employe1/:id', (req, res) => {
    try {
        const employe1Id = req.params.id;
        const updateData = req.body;

        console.log('Received EMPID:', employe1Id);

        // Construct an SQL query to update the record
        const sql = 'UPDATE employe1 SET ? WHERE EMPID = ?';

        db.query(sql, [updateData, employe1Id], (error, results) => {
            if (error) {
                console.error('Error updating data:', error);
                return res.status(500).json({ error: error.message });
            }

            console.log('Results:', results);

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'employe1 not found' });
            }

            return res.json({ message: 'employe1 updated successfully' });
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});



// const express = require('express');
// const mysql = require('mysql');
// const app = express();
// const port = 3036;

// // Create a MySQL connection
// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "shubhamdb",
//     multipleStatements: true,
// });

// app.use(express.json());

// // Route to insert a new record
// app.post('/department', (req, res) => {
//     try {
//         const newRecord = req.body;

//         // Construct an SQL query to insert a new record
//         const sql = 'INSERT INTO department SET ?,?,?';

//         connection.query(sql, newRecord, (error, results) => {
//             if (error) {
//                 return res.status(500).json({ error: error.message });
//             }

//             return res.json({ message: 'Department inserted successfully', newRecordId: results.insertId });
//         });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// });


// app.put('/department/:id', (req, res) => {
//     try {
//         const departmentId = req.params.id;
//         const updateData = req.body;

//         console.log('Received DeptID:', departmentId);

//         // Construct an SQL query to update the record
//         const sql = 'UPDATE department SET ? WHERE DeptID = ?';

//         connection.query(sql, [updateData, departmentId], (error, results) => {
//             if (error) {
//                 console.error('Error updating data:', error);
//                 return res.status(500).json({ error: error.message });
//             }

//             console.log('Results:', results);

//             if (results.affectedRows === 0) {
//                 return res.status(404).json({ message: 'Department not found' });
//             }

//             return res.json({ message: 'Department updated successfully' });
//         });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// });


// app.listen(port, () => {
//     console.log(`Server is running on a port ${port}`);
// });
