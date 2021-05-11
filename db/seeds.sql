

INSERT INTO department (name)
VALUES
('Customer Service'),
('IT'),
('Client Acquisition');


INSERT INTO role (title, salary, department_id)
VALUES
('Service', 80.00, 1),
('Developer', 60.00, 2),
('Sales', 50.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Anita', 'Room', 1, NULL),
('Benny', 'Factor',2, 1),
('Jack', 'Pott', 3, 2),
('Iona', 'Mink', 2, 3),
('Don', 'Keigh', 3, 4);
