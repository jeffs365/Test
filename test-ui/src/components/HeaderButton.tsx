import { Button, Space } from "antd"
import React from "react";
import { AppContext } from "../AppContext";

export const HeaderButton: React.FC = () => {
    const {
        selectedShelve,
        setFormBook,
        setFormShelve
    } = React.useContext(AppContext);

    const handleAddBook = () => {
        setFormBook({});
    }

    const handleAddShelve = () => {
        setFormShelve({});
    }

    return (
        <Space wrap>
            <Button type="primary" onClick={handleAddShelve}>Add Location</Button>
            <Button type="primary" onClick={handleAddBook} disabled={!selectedShelve?.shelveId}>Add Book</Button>
        </Space>
    )
}