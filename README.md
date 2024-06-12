## Tavia Backend Test

## Getting started

To get the Node server running locally:

* Clone this repo with `https://github.com/permana017/tavia-test-be.git`
* `cd tavia-test-be`
* `npm install` to install all required dependencies
* `node index.js` to start the local server


## Folder Structure

        generate-tree
       ┣ public
       ┃ ┗ upload
       ┃ ┃ ┣ export-file
       ┃ ┃ ┣ files
       ┃ ┃ ┗ images
       ┣ src
       ┃ ┣ controllers
       ┃ ┃ ┣ authController.js
       ┃ ┃ ┣ employeeConroller.js
       ┃ ┃ ┗ uploadImageController.js
       ┃ ┣ db
       ┃ ┃ ┣ config
       ┃ ┃ ┃ ┗ config.json
       ┃ ┃ ┣ migrations
       ┃ ┃ ┃ ┣ 20240611172701-create-user.js
       ┃ ┃ ┃ ┣ 20240612105709-create-employee.js
       ┃ ┃ ┃ ┗ 20240612173212-create-image.js
       ┃ ┃ ┗ seeders
       ┃ ┃ ┃ ┣ 20240611174737-user.js
       ┃ ┃ ┃ ┣ 20240612111438-employee.js
       ┃ ┃ ┃ ┗ 20240612185917-image.js
       ┃ ┣ middlewares
       ┃ ┃ ┣ authMiddleware.js
       ┃ ┃ ┣ importFile.js
       ┃ ┃ ┗ multer.js
       ┃ ┣ models
       ┃ ┃ ┣ employee.js
       ┃ ┃ ┣ image.js
       ┃ ┃ ┗ user.js
       ┃ ┣ routes
       ┃ ┃ ┣ authRoute.js
       ┃ ┃ ┣ documentRoute.js
       ┃ ┃ ┣ employeeRoute.js
       ┃ ┃ ┣ index.js
       ┃ ┃ ┗ uploadRoute.js
       ┃ ┣ services
       ┃ ┃ ┣ authService.js
       ┃ ┃ ┣ employeeService.js
       ┃ ┃ ┣ fileService.js
       ┃ ┃ ┗ uploadImageService.js
       ┃ ┣ utils
       ┃ ┃ ┣ cloudinary.js
       ┃ ┃ ┣ connection.js
       ┃ ┃ ┣ generateToken.js
       ┃ ┃ ┣ hashPassword.js
       ┃ ┃ ┗ mailetrap.js
       ┃ ┗ index.js
       ┣ .env
       ┣ .gitignore
       ┣ .sequelizerc
       ┣ package-lock.json
       ┗ package.json

    
## Endpoints
    
auth endpoint

    POST      /api/auth/register
    GET       /api/auth/confirm/:confirmationCode
    POST      /api/auth/login
    POST      /api/auth/refresh-token
    POST      /api/auth/forgot-password
    POST      /api/auth/reset-password/:newPassword
    POST      /api/auth/reset-password
    
employee endpoint
    
    GET      /api/employees
    POST     /api/employee

import export file endpoint

    POST     /api/doc/import
    POST     /api/doc/export

upload endpoint

    POST     /api/upload/images
    POST     /api/upload/images/cloud
    

when put under a domain with `prefix`, it would look like:

    https://www.example.com/api/users
