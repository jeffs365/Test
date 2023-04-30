import { useQuery } from "react-query"
import http from "../http-common";
import { ShelveType } from "../models";

export const useShelvesQuery = (parentShelveId?: number) => {
    return useQuery(
        ['shelves', parentShelveId],
        async () => {
            const { data } = await http.get("/shelves", { params: { parentShelveId } });
            return data as ShelveType[];
        })
}