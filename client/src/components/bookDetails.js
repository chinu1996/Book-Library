import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getbookquery } from '../queries/queries'


class BookList extends Component {
    displayBookDetails(){
        const { book }=this.props.data;
        if (book){
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All the other books by this author:</p>
                    <ul className={"other-books"}>
                        {book.author.books.map(item =>{
                            return<li key={item.id}>{item.name}</li>
                            //This will create the list of all the books available by the same author
                        })}
                    </ul>

                </div>
            )
        }else{
            return (
                <div>No book selected...</div>
            )}}
    render() {

        return (
            <div id={"bookDetails"}>
                {this.displayBookDetails()}
            </div>
        );
    }
}

export default graphql(getbookquery,
{ options: props => {
    //This is when a mouse button is clicked and the book details are updated
    return{
        variables:{
            id:props.bookId
        }
    }
    }

})(BookList);
