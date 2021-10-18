package books;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

@Path("/authors")
public class Authors {
	@GET
	@Path("/{authorName}/books")
	public Response getBookByAuthor(@PathParam("authorName") String authorName) {

		LibraryUtils utils = new LibraryUtils();
		JSONObject bookJson = utils.readFile();

		if (bookJson != null) {
			JSONArray bookList = (JSONArray) bookJson.get("items");
			JSONArray resultList = new JSONArray();

			for (Object book : bookList) {
				JSONObject volumeInfo = (JSONObject) ((JSONObject) book).get("volumeInfo");
				JSONArray authors = (JSONArray) volumeInfo.get("authors");

				if (authors != null) {
					for (Object author : authors) {
						String authorString = (String) author;

						if (authorString.equals(authorName)) {
							resultList.add(volumeInfo);
						}
					}
				}
			}
			return Response.ok(resultList.toJSONString(), MediaType.APPLICATION_JSON).build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).entity("File not found").build();
		}
	}
}
