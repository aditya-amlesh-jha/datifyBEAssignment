# create a .env file in the root folder with following variables
# Replace All values with desired values

### PORT ON WHICH SERVER IS AVAILABLE
PORT=3000

### Database Configuration
DB_USER=db_username
DB_PASSWORD=db_password
DB_HOST=db_host
DB_PORT=db_port
DB_NAME=db_name

### JWT TOKEN SECRET KEY
JWT_SECRET_KEY=secret_key

### Run this command to install all dependencies
yarn install

### To test the api
For registering a new user :: http://localhost:3000/auth/register/
For logging in a user :: http://localhost:3000/auth/login/
