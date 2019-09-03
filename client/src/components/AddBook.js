import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery,addBookMutation,getBooksQuery } from '../queries/queries'
const compose =require('lodash/flowRight');

class AddBook extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            genre:'',
            authorId:''
        };
    }
    displayAuthors(){
        var data = this.props.getAuthorsQuery;
        if(data.loading){
            return(<option disabled>Loading Authors..</option> )
        } else {
            return data.authors.map(author =>{
                return (<option key={ author.id } value={ author.id }>{ author.name }</option>)
            })
        }
    }
    submitForm(e){
        e.preventDefault();
        this.props.addBookMutation({
            variables:{
                name: this.state.name,
                genre:this.state.genre,
                authorId:this.state.authorId
            },
            refetchQueries: [{ query: getBooksQuery }]

        });//This will pass the variables to queries.js file with ($name: String!, $genre:String!, $authorId: ID!)
    }
    render() {
        return (
            <form id="addBook" onSubmit={ this.submitForm.bind(this)}>
                <div className="field">
                    <label> Book Name:</label>
                    <input type="text" onChange={ (e) => this.setState({name:e.target.value})}/>
                </div>

                <div className="field">
                    <label>Genre: </label>
                    <input type="text"onChange={ (e) => this.setState({genre:e.target.value})}/>
                </div>

                <div className={"field"}>
                    <label>Author:</label>
                    <select onChange={ (e) => this.setState({authorId:e.target.value})}>
                        <option>Select Author</option>
                        { this.displayAuthors() }
                    </select>
                </div>

                <button>+</button>

            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery,{ name:"getAuthorsQuery" }),
    graphql(addBookMutation,{ name:"addBookMutation" })
    )(AddBook);
//First add query then bind it to the component
//When there are multiple queries then we have to compose queries and add it in the component