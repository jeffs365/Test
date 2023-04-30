import React from "react";
import { AppContext } from "../AppContext";
import { Breadcrumb } from "antd";
import { ShelveType } from "../models";
import http from "../http-common";
import { useQuery } from "react-query";


export const Breadcrumbs: React.FC = () => {
    const { selectedShelve, setSelectedShelve } = React.useContext(AppContext);

    const { data } = useQuery(
        ['breadcrumbs', selectedShelve?.shelveId],
        async () => {
            if (!selectedShelve?.shelveId) return [];
            const { data } = await http.get(`/shelves/path?shelveId=${selectedShelve?.shelveId}`);
            return data.map((shelve: ShelveType) => ({
                title: shelve.name,
                onClick: () => setSelectedShelve(shelve),
            }))
        });

    return (
        <Breadcrumb items={data} separator=">" />
    )
}