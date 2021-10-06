import React, {useState} from "react";
import SearchField from "react-search-field";
import "./Authors.css";

class Authors extends React.Component {
	
	state = {
		authors: []
    }
	componentDidMount() {
		fetch('http://localhost:8080/BookLibraryManagement/api/rating/authors', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json'					}
		})
		.then((response) => response.json())
		.then((data => {
			const authorsList = data.map((author) => ({
				author: author.author,
				rating: author.averageRating,	
			}))	
			
			this.setState({ authors: authorsList})
			console.log(this.state.authors);
		}))
		
	}
	
 
	render(){
		
		return (
			<div id="authors">
			<h2> Authors Rating </h2>
			</div>
			
			</div>
			{this.state.error ? <h3 className="error"> {this.state.error} </h3> : null}
			{this.state.book.industryIdentifiers ? <div className="isbnCard"> 
							
							<div className="imageContainer">
							{this.state.book.imageLinks ? <img className="isbnBookImage" src={this.state.book.imageLinks.thumbnail} alt="No image" /> : null}
							</div>
							<div className="bookInfo">
							{this.state.book.title ? <h3 className="text"> {this.state.book.title} </h3> : null}
							{this.state.book.subtitle ? <h5 className="text"> {this.state.book.subtitle} </h5> : null}
							{this.state.book.authors ? <h4 className="text"> Authors: {this.state.book.authors.join(', ')} </h4> : null}
							{this.state.book.description ? <h4 className="description"> Description: {this.state.book.description} </h4> : null}
							{this.state.book.publisher ? <h4 className="text"> Publisher: {this.state.book.publisher} </h4> : null}
							{this.state.book.publishedDate ? <h4 className="text"> Publication date: {this.state.book.publishedDate} </h4> : null}
							</div>
							
			</div> : null}
		);
	}
}

export default Authors;