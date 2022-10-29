# library_CRUD

Tools:
- NodeJS 
- Express 
- Mongoose 
- MongoDB 
- AWS 
- S3 
- JWT

You can use the URL attached to the repo to test each function separately via postman.

*P.S. It was deployed on Vercel(Serverless Functions), so be careful not to upload >6MB files.* 

Here are some examples

## Add a new Book
Method: POST
Request URL:
```bash
https://library-zainabaljifri.vercel.app/books/
```
Choose Body->form-data and fill out the fields as below

<img width="599" alt="addBook" src="https://user-images.githubusercontent.com/80160006/198821927-519e48be-80a9-46be-ae83-31406e44c8d2.png">

## Get All Books
Method: GET
Request URL:
```bash
https://library-zainabaljifri.vercel.app/books/
```

<img width="599" alt="getAllBooks" src="https://user-images.githubusercontent.com/80160006/198822825-614abf65-6ddc-4732-9385-11864a6a90c7.png">

## Update a Specific Book
Method: PATCH
Request URL:
```bash
https://library-zainabaljifri.vercel.app/books/<book-id>
```

<img width="600" alt="updateBook" src="https://user-images.githubusercontent.com/80160006/198822882-95482b05-fc78-42ee-ac20-f617d3379d86.png">

## Delete a Specific Book
Method: DELETE
Request URL:
```bash
https://library-zainabaljifri.vercel.app/books/<book-id>
```

<img width="580" alt="deleteBook" src="https://user-images.githubusercontent.com/80160006/198823429-df054d8f-c948-4322-ae42-7666c3f11d42.png">

## Register a New User
Method: POST
Request URL:
```bash
https://library-zainabaljifri.vercel.app/users/register
```
Choose Body->form-data and fill out the fields as below

<img width="582" alt="register" src="https://user-images.githubusercontent.com/80160006/198823274-08dc76ab-e90a-4bb7-bff0-f5e83138aa35.png">

## Login
Method: POST
Request URL:
```bash
https://library-zainabaljifri.vercel.app/users/login
```
Choose Body->form-data and fill out the fields as below

<img width="575" alt="login" src="https://user-images.githubusercontent.com/80160006/198823301-0bb306b3-44bc-4ba5-a706-7e5e0e262a22.png">

## Behind the scenes
Creations and modifications are reflected in the database as shown

<img width="799" alt="db_books" src="https://user-images.githubusercontent.com/80160006/198823139-6dc413a5-1d7f-4992-ba43-73524effe225.png">
<img width="816" alt="db_users" src="https://user-images.githubusercontent.com/80160006/198823346-de3dc4e0-f6dc-4208-99dc-76f29ba6e0c0.png">

and files are stored and updated in a could storage as well

<img width="753" alt="aws" src="https://user-images.githubusercontent.com/80160006/198823183-e64b999d-3df5-4df6-91b3-64cc44d865ed.png">
