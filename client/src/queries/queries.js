import { gql } from 'apollo-boost';


//All the graphQL queries will be stored here


const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }
`;

const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }
`;

const addBookMutation = gql`
    mutation($name: String!, $genre:String!, $authorId: ID!){
        addBook(name:$name,genre:$genre,authorId:$authorId){
            name
            id
        } 
    }
`;

const getbookquery = gql`
    query($id:ID!){
        book(id: $id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }



`;
 export { getAuthorsQuery, getBooksQuery, addBookMutation, getbookquery };