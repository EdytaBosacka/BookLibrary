import React, {useState} from "react";
import "./Books.css";
import { Dropdown } from 'semantic-ui-react';

function Books() {
	
	const categoriesList = 
		fetch('http://localhost:8080/BookLibraryManagement/api/category', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json'					}
		})
		.then((response) => response.json())
		.then((data => {
			//const categoriesList = data.map((category) => ({
			//	key: category,
			//	text: category,
			//	value: category,	
			//}))	
			//return categoriesList;
			console.log(data);
		}))
		.catch((error) => {
			console.error(error);
		})
	return (
		<div id="books">
			<h2> Books by Category </h2>
			<Dropdown placeholder='State' search selection options={categoriesList} />
		</div>
	
  );
}

export default Books;