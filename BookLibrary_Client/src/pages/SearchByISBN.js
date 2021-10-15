import React, {useState} from "react";
import SearchField from "react-search-field";
import "./SearchByISBN.css";




class SearchByISBN extends React.Component {
	
	state = {
		book: {},
		error: ""
    }
	componentDidMount() {
		
	}
	
	onSearch(value){
		fetch('http://localhost:8080/BookLibraryManagement/api/book/' + value, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json'					}
		})
		.then((response) => response.json())
		.then((data => {
			this.setState({ book: data, error:"" });
			console.log(this.state.book);
		}))
		.catch(error => {
			this.setState({ error: "No results found.", 
							book: {}});
    });
	}


  
	render(){
		
	return (
		<div id="isbn">
			<h2> Search book by ISBN </h2>
			<div className="searchByISBN">
				<SearchField placeholder="Search..." onSearchClick={this.onSearch.bind(this)} onEnter={this.onSearch.bind(this)} />
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
			
		</div>
	
	
  );
	}
}

export default SearchByISBN;