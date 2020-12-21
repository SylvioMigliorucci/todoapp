#Overview
TODO List application build in Node.js, Express, Sequelize and Next.js


##Getting Start:

###Backend:

Change the ```.env-example``` to your MySQL Database credentials and Server PORT:
```
DB_DIALECT=mysql
DB_HOST=localhost
DB_NAME=
DB_PORT=3306
DB_USER=root
DB_PASS=
APP_SERVER_PORT=9018
``` 

Go to ```backend``` folder:
```
  cd backend/
  yarn install
  yarn sequelize db:migrate
  yarn dev
  
```

###Frontend

Go to ```next.config.js``` file and change de apiPort value with your APP_SERVER_PORT from ```backend```: 
```
module.exports = {
  env: {
    apiPort: 'http://localhost:3333/',
  },
}
```

Go to ```/frontend/todolist``` folder:
```
  cd /frontend/todolist
  yarn install
  yarn dev
```


## Built With

* Next.js
* React.js
* Node.js
* Axios
* Javascript
* Express
* Sequelize 
* MySQL

## Author

* **Sylvio Migliorucci** - [Sylvio Migliorucci](https://github.com/SylvioMigliorucci)
