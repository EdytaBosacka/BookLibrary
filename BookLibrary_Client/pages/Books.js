import React, {useState} from "react";
import "./Books.css";
import { Dropdown } from 'semantic-ui-react';
import Select from 'react-select';

class Books extends React.Component {
	
	state = {
        categories: [],
		books: []
    }
	
	componentDidMount() {
		fetch('http://localhost:8080/BookLibraryManagement/api/category', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json'					}
		})
		.then((response) => response.json())
		.then((data => {
			const categoriesList = data.map((category) => ({
				value: category,
				label: category,	
			}))	
			
			this.setState({ categories: categoriesList })
			//console.log(this.state.books);
		}))
		.catch((error) => {
			console.error(error);
		})
		
	}
	
	handleChange(e){
		console.log(e);
		fetch('http://localhost:8080/BookLibraryManagement/api/category/' + e.value + '/books', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json'					}
		})
		.then((response) => response.json())
		.then((data => {
			const booksByCategory = data.map((book) => (
			{
				title: book.title,
				subtitle: book.subtitle,
				authors : (book.authors != undefined ? book.authors.join(', ') : "" ) ,
				publisher: book.publisher,
				publishedDate: book.publishedDate,
				imageLink: book.imageLinks.thumbnail,
			}))
			
			this.setState({ books: booksByCategory });
			console.log(this.state.books);
		}))
		
	}
  
  
	
	render(){
		
	return (
		<div id="books">
			<h2> Books by Category </h2>
			<Select options={this.state.categories} onChange={this.handleChange.bind(this)} />
			
			<div className = "grid">
				{this.state.books.map((book) => {
					return (
						<div  className="bookCard">
							<img className="bookImage" src={book.imageLink} alt="No image" />
							<h3> {book.title} </h3>
							<h5> {book.subtitle} </h5>
							{book.authors ? <h4> Authors: {book.authors} </h4> : null}
							{book.publisher ? <h4> Publisher: {book.publisher} </h4> : null}
							{book.publishedDate ? <h4> Publication date: {book.publishedDate} </h4> : null}
							
						</div>
					);
				})}
			</div>
		</div>
	
	
  );
	}
}

export default Books;