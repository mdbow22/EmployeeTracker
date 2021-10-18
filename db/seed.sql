USE company_db;

INSERT INTO departments (name)
	VALUES ('IT'), ('Human Resources'), ('Service'), ('Warehouse');
    
INSERT INTO roles (title, salary, department_id)
	VALUES ('Engineer',80000,1), ('Recruiter',70000,2),('Service Rep',50000,3),('Packer',35000,4),('Warehouse Supervisor',45000,4);
    
INSERT INTO employees (first_name, last_name, role_id)
	VALUES ('Robin','Cook',1), ('Eric','Johnson',4);