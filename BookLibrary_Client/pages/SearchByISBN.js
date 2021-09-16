import React, {useState} from "react";
import SearchField from "react-search-field";
import "./SearchByISBN.css";




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
		
	return (
		<div id="isbn">
			<h2> Search book by ISBN </h2>
			<div className="searchByISBN">
				<SearchField placeholder="Select..."				onSubmit={this.onSearch.bind(this)}/>
			</div>
			
		</div>
	
	
  );
	}
}

export default SearchByISBN;