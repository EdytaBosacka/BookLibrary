package books;

import java.util.ArrayList;
import java.util.HashMap;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

@Path("/rating")
public class AuthorRating {

	@GET
	public Response getBookByCategory() {

		LibraryUtils utils = new LibraryUtils();
		JSONObject bookJson = utils.readFile();

		if (bookJson != null) {
			JSONArray bookList = (JSONArray) bookJson.get("items");
			JSONArray resultList = new JSONArray();
			HashMap<String, Author> authorsMap = new HashMap<>();

			for (Object book : bookList) {
				JSONObject volumeInfo = (JSONObject) ((JSONObject) book).get("volumeInfo");
				JSONArray authors = (JSONArray) volumeInfo.get("authors");
				Double rating = (Double) volumeInfo.get("averageRating");

				if (rating != null) {
					for (Object a : authors) {
						String authorName = (String) a;
						Author author;
						if (authorsMap.containsKey(authorName)) {
							author = authorsMap.get(authorName);
						} else {
							author = new Author(authorName);
						}
						author.addRating(rating);
						author.countAverageRating();
						authorsMap.put(authorName, author);
					}
				}
			}
			ArrayList<Author> authorsList = new ArrayList<Author>(authorsMap.values());
			authorsList.sort(null);
			for (Author a : authorsList) {
				JSONObject authorJson = new JSONObject();
				authorJson.put("author", a.getName());
				authorJson.put("averageRating", a.getAverageRating());
				resultList.add(authorJson);
			}
			return Response.ok(resultList.toJSONString(), MediaType.APPLICATION_JSON).build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).entity("File not found").build();
		}
	}
}
