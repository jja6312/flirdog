import axios from "axios";

const translateText = async (text) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/access/translate",
      { text }
    );

    const result = response.data.message.result.translatedText;

    alert("result: " + result);
    console.log("translatedText");
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error during translation:", error);
  }
};

export default translateText;
