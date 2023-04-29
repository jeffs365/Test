import React, { useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import { Breadcrumb } from "antd";
import { getPath } from "../services/shelve.service";


export const Breadcrumbs: React.FC = () => {
    const { selectedShelve, setSelectedShelve } = React.useContext(AppContext);

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        if (selectedShelve?.shelveId) {
            getPath(selectedShelve?.shelveId)
                .then(({ data: res }) => {
                    const items = res.map((d: any) => {
                        return {
                            title: d.name,
                            onClick: () => handleClick(d),
                        };
                    });
                    setData(items);
                })
        } else {
            setData([]);
        }
    }, [selectedShelve]);

    const handleClick = (item: any) => {
        setSelectedShelve(item);
    }

    return (
        <Breadcrumb items={data} separator=">" />
    )
}