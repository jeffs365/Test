import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, FileTextOutlined, FolderOutlined } from "@ant-design/icons"
import { List, Modal, notification } from "antd"
import Link from "antd/es/typography/Link"
import React from "react";
import { AppContext } from "../AppContext";
import { ItemType } from "../models";
import { useItemMutation } from "../hooks";

export const ListItem: React.FC<{ item: ItemType }> = ({
    item,
}) => {
    const {
        selectedShelve,
        setSelectedShelve,
        setFormBook,
        setFormShelve
    } = React.useContext(AppContext);

    const { mutateAsync: removeItemAsync } = useItemMutation();

    const handleSelectShelve = (item: ItemType) => {
        if (item?.isBook) return;
        setSelectedShelve(item);
    }

    const handleEdit = (item: ItemType) => {
        if (item?.isBook) setFormBook(item);
        else setFormShelve(item);
    }

    const handleDelete = (item: ItemType) => {
        Modal.confirm({
            title: 'Confirm Delete',
            icon: <ExclamationCircleFilled />,
            content: 'Are you sure to delete this item?',
            onOk() {
                removeItemAsync(item).then(({ data }) => { 
                    setSelectedShelve({ ...selectedShelve, _v: Date.now() });
                    if (data?.success) {
                        notification.success({
                            message: 'Success',
                            description: "Item has been deleted."
                        });
                    } else {
                        notification.error({
                            message: 'Error',
                            description: "Item has not been deleted. Reason: " + data?.message
                        });
                    }
                })
            },
        });
    }

    return (
        <List.Item
            actions={!item.readOnly ?
                [<EditOutlined onClick={() => handleEdit(item)} />,
                <DeleteOutlined onClick={() => handleDelete(item)} />]
                : undefined}
        >
            <List.Item.Meta
                avatar={item.isBook ? <FileTextOutlined /> : <FolderOutlined />}
                title={<Link onClick={() => handleSelectShelve(item)}>
                    {item.title ?? item.name}
                </Link>}
            />
        </List.Item>
    )
}