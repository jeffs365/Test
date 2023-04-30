import { useQuery } from "react-query"
import http from "../http-common";
import axios from "axios";
import { ItemType } from "../models";

export const useMainQuery = (shelveId?: number, enabled?: boolean) => {
    return useQuery(
        ['shelves', shelveId],
        async () => {
            const [{ data: shelves }, { data: books }] = await axios.all([
                http.get("/shelves", { params: { parentShelveId: shelveId } }),
                http.get(`/shelves/${shelveId}/books`, { params: { shelveId } }),
            ])
            return [...shelves, ...books] as ItemType[];
        }, { enabled })
}