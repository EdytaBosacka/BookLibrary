import React, {useState} from "react";
import "./Home.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import StarRatings from 'react-star-ratings';

class Home extends React.Component {
	
	state = {
		books: []
    }
	
	componentDidMount() {
		fetch('http://localhost:8080/BookLibraryManagement/api/rating/books', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json'					}
		})
		.then((response) => response.json())
		.then((data => {
			const books = data.map((book) => (
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
			
			this.setState({ books: books });
			console.log(this.state.books);
		}))
	}
	
  
	
	render(){
		
		const responsive = {
			desktop: {
				breakpoint: { max: 3000, min: 1024 },
				items: 5.5,
				slidesToSlide: 1 // optional, default to 1.
			},
			tablet: {
				breakpoint: { max: 1024, min: 464 },
				items: 2,
				slidesToSlide: 2 // optional, default to 1.
			},
			mobile: {
				breakpoint: { max: 464, min: 0 },
				items: 1,
				slidesToSlide: 1 // optional, default to 1.
			}
		};

		
	return (
		<div id="home">
		<h1> hhh </h1>
			<Carousel className="carousel"  infinite={false} responsive={responsive}>
				{this.state.books.map((book) => {
					return (
						<div className="homeCard">
						<div>
							<div>
							<img className="bookPicture" src={book.imageLink} alt="No image" />
							</div>
							<div className="bookInformation">
							<h3 className="text"> {book.title} </h3>
							{book.subtitle ? <h5 className="text"> {book.subtitle} </h5> : null}
							</div>
							</div>
							
							
						</div>
					);
				})}
			</Carousel>
		</div>
	
	
  );
	}
}

export default Home;