import { useMutation } from "react-query"
import http from "../http-common";
import { BookType } from "../models";

export const useBookMutation = () => {
    return useMutation(
        async (item: BookType) => {
            if (item?.bookId) {
                const { data } = await http.patch(`/shelves/${item.shelveId}/books/${item.bookId}`, item);
                return data;
            } else {
                const { data } = await http.post(`/shelves/${item.shelveId}/books`, item);
                return data;
            }
        })
}