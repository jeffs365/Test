import { useQuery } from "react-query"
import http from "../http-common";
import { BookType } from "../models";

export const useBooksQuery = (shelveId?: number) => {
    return useQuery(
        ['books', shelveId],
        async () => {
            const { data } = await http.get(`/shelves/${shelveId}/books`, { params: { shelveId } });
            return data as BookType[];
        })
}