// GraphQLPage.jsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { graphQLClient } from "@/app/providers";
import { GET_USER_ACTIVITIES_QUERY, GET_USER_GOALS_QUERY, GET_ALL_COMMUNITY_ROOMS, GET_ALL_BOTS } from "./queries";

export default function GraphQLPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["allData"],
    queryFn: async () => await graphQLClient.request(GET_ALL_COMMUNITY_ROOMS),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <div className="h-screen overflow-y-auto p-4">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
