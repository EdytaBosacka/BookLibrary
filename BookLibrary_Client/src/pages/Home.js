import React, {useState} from "react";
import "./Home.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import StarRatings from 'react-star-ratings';
import Typewriter from 'typewriter-effect/dist/core';

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
				items: 5,
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

		var app = document.getElementById('type');
	
	var typewriter = new Typewriter(app, {
		delay: 500,
	});
	typewriter
		.typeString('Book Library')
		.pauseFor(300)
		.pauseFor(1000)
		.start();
		
	return (
	
		<div id="home">
		<div id="type" className="type"/>
			<Carousel className="carousel"   infinite={true} responsive={responsive}  autoPlay={true} autoPlaySpeed={5000} keyBoardControl={true}>
				{this.state.books.map((book) => {
					return (
						<div className="homeCard">
						<div>
							<div>
							<img className="bookPicture" src={book.imageLink} alt="No image" />
							</div>
							<div className="bookInformation">
							<h3 className="title"> {book.title} </h3>
							{book.subtitle ? <h5 className="title"> {book.subtitle} </h5> : null}
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