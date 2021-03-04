# Bookstore API

## Table of contents

* [General Info](#general-info)
* [Technologies & Requirements](#technologies-&-requirements)
* [Setup](#setup)
* [Development Standards](#development-standards)

### :package: General Info

Git repository for 'Author Bookstore' Backend API

### Technologies & Requirements 🚀

* Nodejs
* npm | Package Manager
* Typescript
* Express
* MYSQL
* JWT Authentication
* VSCode

### Setup

1\. Clone the repository and install npm dependencies

``` cmd
git clone https://github.com/khalilchoudhry/bookstore.git bookstore
cd bookstore
npm install
```

2\. Create a '.env.dev' file similar to .example.env file inside env folder. 
You can use any strong password or generate random bytes with nodejs crypto module for APP_SECRET

3\. Import the postman collection 'Bookstore-API.json'. It has all the APIs configured. Ready to be used.
Succesful Registering & Login returns JWT which is automatically added to other Authenticated APIs header. Written a short script to make it painless compared to copy/paste.
Refreshing of tokens is not handled

4\. Run the 'create-tables.sql' file to create tables. MYSQL should be installed & running by this step.


### Development Standards 💯

* Git Commit [Style Guide](https://chris.beams.io/posts/git-commit/)

* Use VSCode as the workspace settings are attached
