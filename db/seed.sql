INSERT INTO department (name)
VALUE  ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUE  ("Project manager", 80000, 1),
        ("Software engineer", 100000, 1),
        ("Accountant", 70000, 2),
        ("Lawyer", 105000, 3),
        ("Marketing director", 120000, 4),
        ("Public relations", 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE  ("Molly", "Ryan", 1, NULL),
        ("Frances", "Cortuna", 2, 1),
        ("Albert", "Day", 2, 1),
        ("Elijah", "White", 3, NULL),
        ("Tyler", "Morse", 3, 4),
        ("Luca", "Greig", 4, NULL),
        ("Sean", "Beukas", 5, NULL),
        ("Millie", "Gibbs", 6, 7)
