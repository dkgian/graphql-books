const graphql = require('graphql')

const Book = require('../models/book')
const Author = require('../models/author')

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLSchema,
} = graphql

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent.id })
      }
    }
  }
})

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    books: {
      type: GraphQLList(BookType),
      resolve(){
        return Book.find({})
      }
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve() {
        return Author.find({})
      }
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args){
        return Book.findById(args.id)
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return Author.findById(args.id)
      }
    }
  }
})

const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args){
        const { name, age } = args
        let newAuthor = new Author({
          name,
          age,
        })
        return newAuthor.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const { name, genre, authorId } = args
        let newBook = new Book({
          name,
          genre,
          authorId,
        })
        return newBook.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
})
