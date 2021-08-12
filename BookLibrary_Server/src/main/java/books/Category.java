package books;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

@Path("/category")
public class Category {

	@GET
	@Path("/{categoryName}/books")
	public Response getBookByCategory(@PathParam("categoryName") String categoryName) {

		LibraryUtils utils = new LibraryUtils();
		JSONObject bookJson = utils.readFile();

		if (bookJson != null) {
			JSONArray bookList = (JSONArray) bookJson.get("items");
			JSONArray resultList = new JSONArray();

			for (Object book : bookList) {
				JSONObject volumeInfo = (JSONObject) ((JSONObject) book).get("volumeInfo");
				JSONArray categories = (JSONArray) volumeInfo.get("categories");

				if (categories != null) {
					for (Object category : categories) {
						String categoryString = (String) category;

						if (categoryString.equals(categoryName)) {
							resultList.add(volumeInfo);

						}
					}
				}
			}
			return Response.ok(resultList.toJSONString(), MediaType.APPLICATION_JSON).
					header("Access-Control-Allow-Origin", "*").build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).entity("File not found").build();
		}
	}

	@GET
	public Response getCategories() {

		LibraryUtils utils = new LibraryUtils();
		JSONObject bookJson = utils.readFile();

		if (bookJson != null) {
			JSONArray bookList = (JSONArray) bookJson.get("items");
			JSONArray resultList = new JSONArray();

			for (Object book : bookList) {
				JSONObject volumeInfo = (JSONObject) ((JSONObject) book).get("volumeInfo");
				JSONArray categories = (JSONArray) volumeInfo.get("categories");
				if (categories != null) {
					for (Object c : categories) {
						String category = (String) c;
						if (!resultList.contains(category)) {
							resultList.add(category);
						}
					}
				}
			}
			return Response//.status(200)
//					.entity(resultList.toJSONString())
					.ok(resultList.toJSONString(), MediaType.APPLICATION_JSON)
//				.header("Access-Control-Allow-Origin", "*")
//					.header("Access-Control-Allow-Origin", "http://localhost:3000"
					.build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).entity("File not found").build();

		}

	}

}
