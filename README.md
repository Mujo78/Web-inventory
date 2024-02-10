# Web Inventory

This project aims to develop a comprehensive Web Inventory System to streamline inventory management processes for organizations, with a focus on enhancing efficiency and reducing manual workload.
Leveraging web-based technologies, the system offers real-time tracking of stock levels, simplifying inventory operations and facilitating informed decision-making. By automating tasks traditionally performed manually, such as inventory tracking, ordering, and reporting, the application empowers organizations to optimize resource utilization and enhance productivity.

**NOTE:** This system is still under development, and there are parts that require completion. The sections that need to be finalized can be found [here](#features) 

## Admin - managing materials
![webInv](https://github.com/Mujo78/Web-inventory/assets/96636536/f7db7737-8ed7-45f1-ab24-8be809ae0358)

## Employer - managing product processes
![weBinventory](https://github.com/Mujo78/Web-inventory/assets/96636536/3332d442-21a5-4b18-b797-a51c6af0489b)

## Table of Contents
- [Web Inventory](#web-inventory)
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Schema Diagram](#schema-diagram)

## Project Overview

This project aims to develop a comprehensive Web Inventory System comprising two main modules: the Admin module and the Employee module. The Admin module provides additional functionalities such as managing employee profiles, alongside standard inventory management tasks like addition, modification, and deletion of inventory, as well as updating stock quantities and statuses.
### User Roles

1. **Employee:** Once part of the system, the employee has full control over inventory management.
2. **Admin:** Has all the capabilities of an Employee and is responsible for adding new Employees to the system.

### Main Points
▶️ Enable management of organization's employees  
▶️ Enable management of inventory  
▶️ Enable management of suppliers  
▶️ Enable management of expenses  
▶️ Product management  
▶️ Production process management  

## Features

### Common Features
- [X] User authentication and authorization (JWT)
- [ ] Forgot password
- [x] Change Password
- [ ] Chat system (about 90% finished)
- [x] Inventory managment (adding, updating, deleting)
- [x] Supplier managment (adding and updating)
- [x] Product managment (adding and updating)
- [x] Product Process managment

### Admin Features
- [ ] Employee managment
- [ ] Admin Dashboard

### Employee Features
- [ ] Employee Dashboard

## Technologies
+ MongoDB Atlas
+ Express.js
+ React.js (with TypeScript)
+ Node.js
+ TailwindCSS
+ Flowbite
+ Socket.io
+ Redux
+ Nodemailer
+ JWT Authentication

## Schema Diagram
![Schema](https://github.com/Mujo78/Web-inventory/assets/96636536/b16e92e0-1e00-4b99-bd88-8a58a61c5920)


