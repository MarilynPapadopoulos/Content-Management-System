

CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (4, 2)
  CONSTRAINT department_id FOREIGN KEY [departmentID] (id) REFERENCES (department)
);



CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  CONSTRAINT role_id  FOREIGN KEY [roleID] (id) REFERENCES (role),
  CONSTRAINT manager_id  FOREIGN KEY [mangerID] (id) REFERENCES (role) ON UPDATE CASCADE
);