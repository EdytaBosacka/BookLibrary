package books;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class LibraryUtils {
	
	public JSONObject readFile() {
		JSONParser jsonParser = new JSONParser();

		ClassLoader classLoader = getClass().getClassLoader();
		InputStream inputStream = classLoader.getResourceAsStream("books.json");

		try (InputStreamReader streamReader = new InputStreamReader(inputStream, StandardCharsets.UTF_8)) {

			Object obj = jsonParser.parse(streamReader);
			return (JSONObject) obj;

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;

	}

}
