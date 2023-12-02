import axios from "axios";

const sendImageToCompanyAPI = async (imageUrl, subscriptionKey) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${subscriptionKey}`, // Add the subscription key to the Authorization header
    };

    const response = await axios.post(
      "https://app.promiseq.com/api/sendToThreatDetect",
      { imageUrl },
      { headers }
    );
    return response.data;
  } catch (error) {
    throw new Error(`API error: ${error.message}`);
  }
};

export default sendImageToCompanyAPI;