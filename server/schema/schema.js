const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../model/book');
const Author = require('../model/author');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } =graphql;

//Dummy data for the books
// const books = [
//     {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
//     {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
//     {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
//     {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2'},
//     {name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3'},
//     {name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'}
// ];
//
//Dummy data for the authors
// var authors = [
//     { name: 'Iceberg slim', age: 44, id: '1'},
//     { name: 'Alok chandra', age: 45, id: '2'},
//     { name: 'Sidney Sheldon', age: 30, id: '3'}
// ];


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent);
                // return _.find(authors, { id:parent.authorId })
            }
        }

    })
});

const AuthorType= new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },

        //GraphQLList will help to het as many books written by one author
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return _.filter(books, {authorId: parent.id});
                //here we filter the books with the AuthorID

            }
        }

    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book:{
            type: BookType,
            args: {id : { type: GraphQLID }},
            resolve(parent, args){

                //Code to access the DB will go here
                // return _.find(books, { id:args.id });

            }
        },
        author:{
            type:AuthorType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args){
                // return _.find(authors, {id:args.id });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return books;
                //This will return list of the books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                // return authors;
                // this will return list of authors

            }
        }

    }
});

//Mutations are used to add or delete
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor:{
            type: AuthorType,
            args: {
                name: {type:GraphQLString},
                age: {type:GraphQLInt}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }

        }
    }
});


module.exports = new GraphQLSchema({
   query : RootQuery,
    mutation: Mutation
});