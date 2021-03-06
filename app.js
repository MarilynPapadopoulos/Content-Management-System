const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'WEBcourse2020',
    database: 'cms'
});
connection.connect(err => {
    if (err) throw err;
})


const promptUser = () => {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'options',
                message: 'Choose one of the following:',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'] 
               
            }
        ])
        .then((answers) => {
            userAnswers(answers)
        })
        
        
    
};
promptUser();

const userAnswers = (answers) => {



    if (answers.options === 'View all departments') {
        connection.query(`SELECT * FROM department`, (err, rows) => {
            if(err) throw err;
            console.table(rows);
            promptUser();
        });
    } 
    else if (answers.options === 'View all roles') {
        connection.query(`SELECT role.id, role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id`, (err, rows) => {
            if(err) throw err;
            console.table(rows);
            promptUser();
        });
    }       
    else if (answers.options === 'View all employees') {
        connection.query(`SELECT 
        employee.id, 
        employee.first_name, 
        employee.last_name, 
        role.title, 
        department.name, 
        role.salary, 
        CONCAT(m.first_name, " ", m.last_name) AS manager
        FROM
        employee
        JOIN role
        ON employee.role_id= role.id
        JOIN department
        ON role.department_id=department.id
        LEFT JOIN employee m
        ON m.id = employee.manager_id`,
        (err, rows) => {
            if(err) throw err;
            console.table(rows);
            promptUser();
        });
    }      
    else if (answers.options === 'Add a department') {
        addDepartment().then(({ name })  => connection.promise().query(`INSERT INTO department (name) VALUES(?)`, name))
        .then(res => { 
            console.log("works");
            promptUser();
       })
       .catch(err => {
           console.log(err);
       })
    }

    else if (answers.options === 'Add a role') {
        addRole().then((data) => connection.promise().query(`INSERT INTO role SET ?`, data)) 
       .then(res => { 
            console.log("works");
            promptUser();
       })
       .catch(err => {
           console.log(err);
       })
            
    }
    else if (answers.options === 'Add an employee') {
        addEmployee().then((data) => connection.promise().query(`INSERT INTO employee SET ?`, data)) 
        .then(res => {
            promptUser();
        }) 
    }
    else if (answers.options === 'Update an employee role') {
        updateEmployee().then((data) => connection.promise().query(`UPDATE employee 
        SET role_id = (?) 
        WHERE id = (?)`, [data.role_id, data.id]))
        .then(res => { 
            console.log("works");
            promptUser();
       })
       .catch(err => {
           console.log(err);
       })
    }

    else { // (answers.options === 'Exit') {
        exit();
    }
      

}


const addDepartment = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the name of the department you would like to add.'
            }
        ]);
          
};

const addRole = () => {
    return connection.promise().query(`SELECT department.name AS name, department.id AS value FROM department`).then(([rows]) =>{
        return inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the name of the role you would like to add.'
                
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary of the role you would like to add.'
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Enter the department of the role you would like to add.',
                choices: rows
            }
        ])
    } )
    
      
};
const addEmployee = () => {
    return inquirer    
        .prompt ([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter the first name of the employee you would like to add.'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter the last name of the employee you would like to add.'
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Enter the role of the employee you would like to add.',
                choices: [{name: 'Service', value: 1},{name: 'Developer', value: 2},{name: 'Sales', value: 3}]
            },
            {
                type: 'list',
                name: 'manager_id',
                message: 'Enter the manager of the employee you would like to add.',
                choices: [{name:'None', value: null }, {name: 'Anita Room', value: 1}, {name: 'Benny Factor', value: 2}, {name:'Jack Pott', value: 3}, {name: 'Iona Mink', value: 4}, {name:'Don Keigh', value: 5}]
            }
        ]);
};
const updateEmployee = () => {
    return inquirer
        .prompt ([
            {
                type: 'list',
                name: 'id',
                message: 'Which employee do you want to update?',
                choices: [{name: 'Anita Room', value: 1}, {name: 'Benny Factor', value: 2}, {name:'Jack Pott', value: 3}, {name: 'Iona Mink', value: 4}, {name:'Don Keigh', value: 5}]
            },
            {
                type: 'list',
                name: 'role_id',
                message: "Choose the employee's new role",
                choices: [{name: 'Service', value: 1},{name: 'Developer', value: 2},{name: 'Sales', value: 3}]
            }
        ])
}


const exit = () => {
    process.exit();
}

// promptUser().then(answers)
// (userAnswers(answers)).then(promptUser);

