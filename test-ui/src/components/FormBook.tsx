import { Col, Form, Input, Modal, Row, TreeSelect, notification } from "antd";
import React, { useEffect } from "react";
import { AppContext } from "../AppContext";
import * as Yup from "yup";
import { getAllShelvesTree } from "../services/shelve.service";
import { useQuery } from "react-query";
import { createBook, updateBook } from "../services/book.service";

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .trim()
        .required("Title is required."),
    shelveId: Yup.number()
        .nullable()
        .required("Location is required."),
});

const rules = [
    ({ getFieldsValue }: any) => ({
        validator({ field }: any) {
            return validationSchema.validateAt(field, getFieldsValue());
        }
    }),
]

export const FormBook: React.FC = () => {
    const { selectedShelve, formBook, setFormBook, setSelectedShelve } = React.useContext(AppContext);

    const [isOpen, setIsOpen] = React.useState(false);

    const { data: treeData } = useQuery('shelvesTree', () => getAllShelvesTree(), { enabled: isOpen });

    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(formBook);

        if (!formBook)
            setIsOpen(false);
        else {
            setIsOpen(true);

            if (!formBook?.bookId)
                form.setFieldsValue({ shelveId: selectedShelve?.shelveId });
        }


    }, [formBook, form])

    const handleSubmit = (values: any) => {
        const { shelveId } = values;
        let promise = null;

        if (!values.bookId)
            promise = createBook(shelveId, values);
        else
            promise = updateBook(shelveId, values.bookId, values);

        promise.then(() => {
            notification.success({
                message: 'Success',
                description: "Book has been saved."
            });
            setFormBook(null);
            setSelectedShelve({ shelveId, _v: Date.now() });
        })
    }

    return (
        <Modal
            title={formBook?.bookId ? "Edit Book" : "Add Book"}
            centered
            open={isOpen}
            onCancel={() => setFormBook(null)}
            onOk={() => form.submit()}
            okText="Save"
        >
            <Form form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={formBook || {}}
            >
                <Form.Item name="bookId" hidden />
                <Row gutter={[12, 12]}>
                    <Col span={24}>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={rules}
                            required
                        >
                            <Input placeholder="Enter Title"
                                maxLength={255}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Location"
                            name="shelveId"
                            rules={rules}
                            required
                        >
                            <TreeSelect
                                style={{ width: '100%' }}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="Select Location"
                                allowClear
                                treeData={treeData}
                                fieldNames={{
                                    label: "name",
                                    value: "shelveId",
                                }}
                                treeNodeLabelProp="path"
                                treeNodeFilterProp="name"
                                showSearch
                                treeDefaultExpandAll
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}