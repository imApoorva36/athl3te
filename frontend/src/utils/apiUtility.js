import axios from "axios";

const API_URL = "https://autonome.alt.technology/agentmux-thkoer/query"; 

/**
 * Sends an API request with basic authentication.
 * 
 * @param {Object} requestData - The request data.
 * @param {string} requestData.agent_name - The name of the agent.
 * @param {string} requestData.action - The action to perform.
 * @param {Object} requestData.params - Additional parameters.
 * @param {string} requestData.input_text - The input text.
 * @returns {Promise<Object>} - API response.
 */
async function sendApiRequest({ agent_name, action, params, input_text }) {

  const username = process.env.NEXT_PUBLIC_AGENT_USERNAME;
  const password = process.env.NEXT_PUBLIC_AGENT_PASSWORD;

  console.log(agent_name, action, params, input_text);


  if (!username || !password) {
    throw new Error("Basic Auth credentials are missing in the .env file");
  }

  const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;

  try {
    const response = await axios.post(API_URL, 
      { agent_name, action, params, input_text },
      { headers: { Authorization: authHeader, "Content-Type": "application/json" } }
    );

    return response.data;
  } catch (error) {
    console.error("API request failed:", error.message);
    throw error;
  }
}



export default sendApiRequest;
