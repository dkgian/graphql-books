## Project overview

### Server (NodeJs):
- Express app
- GraphQL server

### Database:
- MongoDb
- [mLab](https://mlab.com/)
### Client:
- Graphiql 

### How to run:
 - Start server (run on Port 3001)

```
cd server/
npm start
```

GraphiQL playground:
http://localhost:3001/graphql

Sample query:

```
// get all author
{
  authors{
    name
    age
    books{
      name
    }
  }
}

//get book by id
{
  book(id: "5c4decd143a2815a31f4ae0c"){
    name
    author {
      name
    }
  }
}

// add new author
mutation{
  addAuthor(
    name: "mr.ABC"
    age: 22
  ) {
    name
    age
    id
  }
}
```
