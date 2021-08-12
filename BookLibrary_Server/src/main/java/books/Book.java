package books;

import javax.ws.rs.GET;
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

}
