# Server on Express using PUG and EJS
____
## Installation and launch

### **1.** Clone the repository

`git clone https://github.com/your-repository.git`

`cd your-repository`

### **2.** Install the dependencies

`npm install`

### **3.** Set environment variables

Create an *.env* file in the root directory of the project and set the necessary variables:

MONGO_DB_USER=your_mongo_db_user

MONGO_DB_KEY=your_mongo_db_key

MONGO_DB_SERVER_NAME=your_database_name

PORT=3000

### **4.** After setting the environment variables, start the server:

`node index.js`

### **5.** View in a browser

**• Users:**

http://localhost:3000/users - list of users

http://localhost:3000/users/:userId - user details

**• Articles:**

http://localhost:3000/articles - list of articles

http://localhost:3000/articles/:articleId - article details

### **6.** Technical details

### **Dependencies:**

+ **Express** - a framework for Node.js for creating server applications.

+ **MongoDB** — a database for saving users and articles.

+ **PUG** — template generator for HTML generation (for users).

+ **EJS** — template generator for HTML generation (for articles).

+ **body-parser** — middleware for parsing JSON requests.

### **7.** Description of the project structure

```
HW_61_1/
├── node_modules/  
├── views/                           # Folder for templates (PUG, EJS)
│    ├── articles/                   # Folder for articles
│        ├── articles.ejs            # Article list template
│        ├── article.ejs             # Template for a detailed view of the article
│    ├── users/                      # Folder for users
│        ├── users.pug               # User list template
│        ├── user.pug                # Template for detailed user view
├── .env                             # File with environment variable settings
├── .gitignore                       # File ignores files and folders in Git
├── index.js                         # Main server file (Express server)
├── package-lock.json                # File with project dependencies
├── package.json                     # File with project dependencies
└── README.md                        # This file
```
___
### Student on the Fullstack development course
### Kateryna Fastovets
- 📫 How to reach me **KatyaFastovets@gimail.com**

