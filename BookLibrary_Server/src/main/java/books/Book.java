package books;

import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

@Path("/book")
public class Book {

	@GET
	@Path("/{isbn}")
	public Response getBookByISBN(@PathParam("isbn") String isbn) {
		
		LibraryUtils utils = new LibraryUtils();
		JSONObject bookJson = utils.readFile();

		if (bookJson != null) {
			JSONArray bookList = (JSONArray) bookJson.get("items");

			for (Object book : bookList) {
				JSONObject volumeInfo = (JSONObject) ((JSONObject) book).get("volumeInfo");
				JSONArray industryIdentifiers = (JSONArray) volumeInfo.get("industryIdentifiers");

				for (Object industryIdentifier : industryIdentifiers) {
					String identifier = (String) ((JSONObject) industryIdentifier).get("identifier");

					if (identifier.equals(isbn)) {

						return Response.ok(volumeInfo.toJSONString(), MediaType.APPLICATION_JSON).build();
					}
				}
			}
			return Response.status(Response.Status.NOT_FOUND).entity("No results found").build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).entity("File not found").build();
		}
	}

	@PUT
	@Path("/{isbn}/{rating}")
	public Response updateBookRating(@PathParam("isbn") String bookIsbn, @PathParam("rating") String starRating) {
		LibraryUtils utils = new LibraryUtils();
		JSONObject bookJson = utils.readFile();

		if (bookJson != null) {
			JSONArray bookList = (JSONArray) bookJson.get("items");

			for(int i=0; i< bookList.size(); i++)
			{	
				Object book = bookList.get(i);
				JSONObject bookJsonObject = (JSONObject) book;
				JSONObject volumeInfo = (JSONObject) (bookJsonObject).get("volumeInfo");
				JSONArray industryIdentifiers = (JSONArray) volumeInfo.get("industryIdentifiers");

				for (Object industryIdentifier : industryIdentifiers) {
					String identifier = (String) ((JSONObject) industryIdentifier).get("identifier");

					if (identifier.equals(bookIsbn)) {
						Double rating = Double.parseDouble( volumeInfo.get("averageRating").toString());
						Integer ratingsCount = Integer.valueOf( volumeInfo.get("ratingsCount").toString());
						rating = (rating*ratingsCount + Double.parseDouble(starRating))/(ratingsCount+1);
						ratingsCount++;
						volumeInfo.put("averageRating", rating);
						volumeInfo.put("ratingsCount", ratingsCount);
						bookJsonObject.put("volumeInfo", volumeInfo);
						bookList.set(i, bookJsonObject);
						bookJson.put("items", bookList);
						utils.writeToFile(bookJson);
						
						return Response.status(Response.Status.OK).entity("Updated").build();
					}
				}
			}
			return Response.status(Response.Status.NOT_FOUND).entity("No results found").build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).entity("File not found").build();
		}
	}
	
	
	

}
