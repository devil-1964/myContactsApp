## myContacts API
The **myContacts API** is a contact management system built using Node.js, Express, and MongoDB. It incorporates JWT (JSON Web Token) for secure authentication and session management. The API ensures that only authenticated users can perform CRUD (Create, Read, Update, Delete) operations on contacts.

### Key Features
- **User Authentication**: Users must log in to generate a JWT token, which is used to authenticate subsequent requests.
- **Session Management**: After login, a session is created using the JWT token, which the client sends in the headers for API requests.
- **CRUD Operations**: Authenticated users can create, view, update, and delete their contacts.
- **Authorization**: Each user can only access and manage their own contacts, with checks in place to prevent unauthorized access to others' data.
This API provides a secure and user-specific solution for contact management.

### API Endpoints

#### User Authentication
- **Register**: `/api/users/register`
  <br/>
  It register the user with fields *username, email and password*. It uses bycrypt to create *hashedPassword* and then store the user details in *MONGO_DB*.
  
- **Login**: `/api/users/login`
  <br/>
  It logins the user by generating JWT token for 30 minutes
  
- **Current**: `/api/users/login` 
  <br/>
  Uses **validateToken** middleware to check the user is authorized by validating **JWT Token** or not

#### Contacts CRUD
- **Create**: `/api/contacts/`
  <br/>
  It uses **POST** to create new contact with fields *name, email and phone*.
  
- **Get All**: `/api/contacts/`
  <br/>
  It uses **GET** to get all contacts of the login user.
  
- **Get Single Contact**: `/api/contacts/:id` 
  <br/>
  Uses **GET** to get single contact using id.
  
- **Update Contact**: `/api/contact/:id` 
  <br/>
  Uses **PUT** and **findByIdAndUpdate** to find and update the contact.
  
- **Delete Contact**: `/api/contacts/:id` 
  <br/>
  Uses **DELETE** to delete the contact.

### .env
```
PORT=5001
MONGO_URL=
ACCESS_TOKEN_SECRET=
```
