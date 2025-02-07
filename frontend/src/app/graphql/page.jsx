// GraphQLPage.jsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { graphQLClient } from "@/app/providers";
import { GET_ALL_DATA } from "./queries";

export default function GraphQLPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["allData"],
    queryFn: async () => await graphQLClient.request(GET_ALL_DATA),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
