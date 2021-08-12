package books;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Author implements Comparable {

	private String name;
	private List<Double> ratings;
	private Double averageRating;

	public Author(String name) {
		this.name = name;
		this.ratings = new ArrayList<>();
	}

	public void addRating(Double rating) {
		ratings.add(rating);
	}

	public double countAverageRating() {
		Double ratingsSum = 0.0;
		for (Double rating : ratings) {
			ratingsSum += rating;
		}
		averageRating = ratingsSum / ratings.size();
		return averageRating;
	}

	public String getName() {
		return name;
	}
	
	public Double getAverageRating() {
		return averageRating;
	}

	@Override
	public int compareTo(Object object) {
		Author author = (Author) object;
		return -Double.compare(this.averageRating,author.averageRating);
	}
}
