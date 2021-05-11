const inquirer = require('inquirer');
const mysql = require('mysql2');
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
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'] 
               
            }
        ]);
};
promptUser().then(answers => {

    if (answers.options === 'View all departments') {
        connection.query(`SELECT * FROM department`, (err, rows) => {
            if(err) throw err;
            console.table(rows);
        });
    } 
    if (answers.options === 'View all roles') {
        connection.query(`SELECT * FROM role`, (err, rows) => {
            if(err) throw err;
            console.table(rows);
        });
    }       
    if (answers.options === 'View all employees') {
        connection.query(`SELECT * FROM employee`, (err, rows) => {
            if(err) throw err;
            console.table(rows);
        });
    }      
    if (answers.options === 'Add a department') {
        addDepartment().then(connection.query(`INSERT INTO department (name) VALUES(?)`)); 
    } 
    if (answers.options === 'Add a role') {
        addRole().then(connection.query(`INSERT INTO role VALUES(?, ?, ?)`)); 
    }
    if (answers.options === 'Add an employee') {
        addEmployee().then(connection.query(`INSERT INTO employee VALUES(?)`)); 
    }
    if (answers.options === 'Update an employee role') {
        updateEmployee().then(connection.query(`UPDATE employee 
        SET role_id = VALUES(?) 
        WHERE employee_id = (?)`));
    } 
      
});



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
                choices: [{name: 'Service', value: 1}, {name: 'Developer', value: 2},{name: 'Sales', value: 3}]
            }
        ]);
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
                type: 'input',
                name: 'role',
                message: 'Enter the role of the employee you would like to add.'
            },
            {
                type: 'input',
                name: 'manager',
                message: 'Enter the manager of the employee you would like to add.'
            }
        ]);
};
const updateEmployee = () => {
    return inquirer
        .prompt ([
            {
                type: 'list',
                name: 'new_role',
                message: 'Which employee do you want to update?'
            },
            {
                type: 'input',
                name: 'role',
                message: "Choose the employee's new role"
            }
        ])
}



