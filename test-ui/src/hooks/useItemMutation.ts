import { useMutation } from "react-query"
import http from "../http-common";
import { ItemType } from "../models";

export const useItemMutation = () => {
    return useMutation(
        async (item: ItemType) => {
            if (item?.isBook) {
                return http.delete(`/shelves/${item?.shelveId}/books/${item?.bookId}`);
            } else {
                return http.delete(`/shelves/${item?.shelveId}`);
            }
        })
}