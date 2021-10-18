import React, {useState} from "react";
import SearchField from "react-search-field";
import Collapsible from 'react-collapsible';
import "./Authors.css";
import StarRatings from 'react-star-ratings';
import { BsChevronDown } from "react-icons/bs";

class Authors extends React.Component {
	
	state = {
		authors: [],
		authorsBooks: new Map()
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
	
	getAuthorsBooks(authorName) {
		fetch('http://localhost:8080/BookLibraryManagement/api/authors/' + authorName + '/books', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json'					}
		})
		.then((response) => response.json())
		.then((data => {
			const bookList = data.map((book) => ({
				bookTitle: book.title,
				imageLink: book.imageLinks.thumbnail,	
			}))	
			
			let newMap = new Map(this.state.authorsBooks);
			newMap.set(authorName, bookList);
			
			this.setState({ authorsBooks: newMap})
			console.log(this.state.authorsBooks);
		}))
	}
 
	render(){
		
		const style = {
		color: 'black',
		backgroundColor:"#f7f7f7",
		padding: '10px',
		marginTop: '20px',
		border: '10px rgba(255,231,220,1)',
		borderRadius: '40px',
		height: "50px",
		width: "900px",
		display: "grid",
		gridTemplateColumns: "400px repeat(auto-fill, 290px) 100px 10px",
		gridGap: "0px",
		justifyContent: "center",
		padding: "initial",
		alignItems:"center",
		};
		
		
		return (
			<div id="authors">
			<h2> Authors Rating </h2>
			{this.state.authors.map((author) => {
				return(
			
			<Collapsible  onOpening = {()=> this.getAuthorsBooks(author.author)} trigger={[<div className="authorName"> {author.author} </div>, <StarRatings rating={author.rating} starDimension="30px" starRatedColor="#ffa7b6" starHoverColor="#ff8da1"  numberOfStars={5} />, <div className="averageRating"> {Math.round(author.rating*100)/100} </div>, <BsChevronDown color="#959595" size={18} stroke-width={1}/>]} triggerStyle={style}>

				<div className="authorsBooks">
                {this.state.authorsBooks.get(author.author) ?
					this.state.authorsBooks.get(author.author).map((book) =>{
					return (<img className="bookImage" src={book.imageLink} alt="No image" />);
				})
				:null}
				</div>				
		
			</Collapsible>
			);
			})
			}
			
			</div>
		);
	}
}

export default Authors;