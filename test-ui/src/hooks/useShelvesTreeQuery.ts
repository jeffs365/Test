import { useQuery } from "react-query"
import http from "../http-common";
import { ShelveType } from "../models";

export const useShelvesTreeQuery = (enabled: boolean) => {
    return useQuery(
        ['shelves'],
        async () => {
            const { data } = await http.get("/shelves/tree");
            return data as ShelveType[];
        },
        {
            enabled
        })
}