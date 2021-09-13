import React, {useState} from "react";
import "./SearchByISBN.css";
import SearchField from "react-search-field";

class SearchByISBN extends React.Component {
	
	state = {
		book: {}
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
			this.setState({ book: data });
			console.log(this.state.book);
		}))
		
	}
  
  
	
	render(){
	
	const searchStyle = {
	  width: 1,
	};
	return (
		<div id="isbn">
			<h2> Search book by ISBN </h2>
			<div className="searchByISBN">
				<SearchField style={searchStyle} onSearchClick={this.onSearch.bind(this)} />
			</div>
			
		</div>
	
	
  );
	}
}

export default SearchByISBN;