import { GraphQLClient } from "graphql-request";

const API_URL = "https://api.studio.thegraph.com/query/103282/graphathl3te/version/latest";

export const client = new GraphQLClient(API_URL);

export async function fetchGraphQL(query, variables = {}) {
  try {
    const data = await client.request(query, variables);
    return data;
  } catch (error) {
    console.error("Error fetching GraphQL data:", error);
    return null;
  }
}
