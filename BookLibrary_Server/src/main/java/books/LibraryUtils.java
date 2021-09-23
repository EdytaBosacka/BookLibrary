package books;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;

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
	
	public void writeToFile(JSONObject json) {
		FileWriter myWriter;
		try {
			File resourcesDirectory = new File("src/main/resources/books2.json");
			myWriter = new FileWriter(resourcesDirectory.getAbsolutePath());
			json.writeJSONString(myWriter);
			myWriter.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
