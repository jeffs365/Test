import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, FileTextOutlined, FolderOutlined } from "@ant-design/icons"
import { List, Modal, notification } from "antd"
import Link from "antd/es/typography/Link"
import React from "react";
import { AppContext } from "../AppContext";
import { removeBook } from "../services/book.service";
import { removeShelve } from "../services/shelve.service";

export const ListItem: React.FC<{ item: any }> = ({
    item,
}) => {
    const { selectedShelve, setSelectedShelve, setFormBook, setFormShelve } = React.useContext(AppContext);

    const handleSelectShelve = (item: any) => {
        if (item?.isBook) return;
        setSelectedShelve(item);
    }

    const handleEdit = (item: any) => {
        if (item?.isBook) setFormBook(item);
        else setFormShelve(item);
    }

    const handleDelete = (item: any) => {
        Modal.confirm({
            title: 'Confirm Delete',
            icon: <ExclamationCircleFilled />,
            content: 'Are you sure to delete this item?',
            onOk() {
                let promise;
                if (item?.isBook) {
                    promise = removeBook(item?.shelveId, item?.bookId);
                } else {
                    promise = removeShelve(item?.shelveId);
                }
                promise?.then(({ data }) => {
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