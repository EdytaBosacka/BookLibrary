import React, {useState} from "react";
import "./Books.css";
import { Dropdown } from 'semantic-ui-react';
import Select from 'react-select';
import StarRatings from 'react-star-ratings';

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
			console.log(this.state.books);
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
				rating: book.averageRating,
				ratingsCount: book.ratingsCount,
				isbn: book.industryIdentifiers[0].identifier
			}))
			
			this.setState({ books: booksByCategory });
			console.log(this.state.books);
		}))
		
	}
	
	changeRating(newRating, bookIsbn) {
		fetch('http://localhost:8080/BookLibraryManagement/api/book/' + bookIsbn + '/' + newRating, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json'					}
		})
		
		let booksCopy = [...this.state.books];
		
		booksCopy.forEach(function (value, i) {
			let book = {...booksCopy[i]};
			if(book.isbn == bookIsbn)
			{
				book.rating = (book.rating * book.ratingsCount + newRating)/(book.ratingsCount + 1);
				book.ratingsCount++;
				booksCopy[i] = book;
			}
		});
		this.setState({books: booksCopy});
		
		
	}
  
  
	render(){
		
		const customStyles = {
		
			option: (provided, state) => ({
				...provided,
				borderBottom: '1px solid #dfdfdf',
				backgroundColor: state.isSelected ? 'rgba(255,231,220,0.5)' : 'white',
				':hover': {
					backgroundColor: 'rgba(255,231,220,0.2)',
				},
				color: '#000000',
				padding: 20,
				width: 390,
			}),
			control: (provided) => ({
				...provided,// none of react-select's styles are passed to <Control />
				width: 400,
				border: '2px solid #dfdfdf',
				//position: 'relative',
				boxShadow: 'none',
					'&:hover': {
					border: '2px solid #ffe7dc',
				}
			}),
			indicatorSeparator: () => {},
			menu: (provided) => ({
				...provided,
				width: 400	 
			}),
			menuList: (base) => ({
				...base,
				"::-webkit-scrollbar": {
					width: "8px"
				},
				"::-webkit-scrollbar-track": {
					background: "#f4f4f4"
				},
				"::-webkit-scrollbar-thumb": {
					background: "rgba(255,231,220,1)",
				"border-radius": "20px"
				},
				"::-webkit-scrollbar-thumb:hover": {
					background: "rgba(255,231,220,1)"
				}
			}),
			singleValue: (provided, state) => {
				const opacity = state.isDisabled ? 0.5 : 1;
				const transition = 'opacity 300ms';

				return { ...provided, opacity, transition };
			}
		};
		
	return (
		<div id="books">
			<h2> Books by Category </h2>
			<div className="dropdown">
				<Select styles={customStyles} options={this.state.categories} onChange={this.handleChange.bind(this)} />
			</div>
			<div className = "grid">
				{this.state.books.map((book) => {
					return (
						<div  className="bookCard">
						<div>
							<div>
							<img className="bookImage" src={book.imageLink} alt="No image" />
							</div>
							<div className="bookInformation">
							<h3 className="text"> {book.title} </h3>
							{book.subtitle ? <h5 className="text"> {book.subtitle} </h5> : null}
							{book.authors ? <h4 className="text"> Authors: {book.authors} </h4> : null}
							{book.publisher ? <h4 className="text"> Publisher: {book.publisher} </h4> : null}
							{book.publishedDate ? <h4 className="text"> Publication date: {book.publishedDate} </h4> : null}
							</div>
							</div>
							<div className="stars">
								<div className="invisibleVotes"/> 
								<StarRatings rating={book.rating} starDimension="30px" starRatedColor="#ffa7b6" starHoverColor="#ff8da1" changeRating={this.changeRating.bind(this)} numberOfStars={5} name={book.isbn}/>
								{book.ratingsCount ? <h4 className="votes"> {book.ratingsCount} Votes </h4> : null}
							</div>
							
						</div>
					);
				})}
			</div>
		</div>
	
	
  );
	}
}

export default Books;