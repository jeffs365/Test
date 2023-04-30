import { useMutation } from "react-query"
import http from "../http-common";
import { ShelveType } from "../models";

export const useShelveMutation = () => {
    return useMutation(
        async (item: ShelveType) => {
            if (item?.shelveId) {
                const { data } = await http.patch(`/shelves/${item.shelveId}`, item);
                return data;
            } else {
                const { data } = await http.post(`/shelves`, item);
                return data;
            }
        })
}