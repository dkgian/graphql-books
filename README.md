## Project overview

### Server (NodeJs):
- Express
- GraphQL

### Database:
- MongoDb
- [mLab](https://mlab.com/)
### Client:
- React
- [Apollo client](https://www.apollographql.com/docs/react/) 

### How to run:
 - Start server (default on port 3001)

```
cd server/
yarn start
```

GraphiQL server:
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
- Start client (default on port 3000)

```
cd client/
yarn start
```

Client page: http://localhost:3000/
