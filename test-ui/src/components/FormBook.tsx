import { Col, Form, Input, Modal, Row, TreeSelect, notification } from "antd";
import React, { useEffect } from "react";
import { AppContext } from "../AppContext";
import * as Yup from "yup";
import { useMainQuery, useShelvesTreeQuery } from "../hooks";
import { useBookMutation } from "../hooks/useBookMutation";
import { BookType } from "../models";

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
    const {
        selectedShelve,
        setSelectedShelve,
        formBook,
        setFormBook
    } = React.useContext(AppContext);

    const [isOpen, setIsOpen] = React.useState(false);

    const { data: treeData, isLoading: treeDataLoading } = useShelvesTreeQuery(isOpen);

    const { mutateAsync: saveBookAsync, isLoading: saveLoading } = useBookMutation();

    const [form] = Form.useForm();

    useEffect(() => {
        if (!formBook)
            setIsOpen(false);
        else {
            setIsOpen(true);

            form.resetFields();
            form.setFieldsValue(formBook);
            if (!formBook?.bookId)
                form.setFieldsValue({ shelveId: selectedShelve?.shelveId });
        }
    }, [formBook, form, selectedShelve])

    const handleSubmit = (values: BookType) => {
        saveBookAsync(values).then(() => {
            notification.success({
                message: 'Success',
                description: "Book has been saved."
            });
            setFormBook(undefined);
            setSelectedShelve({ shelveId: values?.shelveId, _v: Date.now() });
        })
    }

    return (
        <Modal
            title={formBook?.bookId ? "Edit Book" : "Add Book"}
            centered
            open={isOpen}
            onCancel={() => setFormBook(undefined)}
            onOk={() => form.submit()}
            okText="Save"
            confirmLoading={saveLoading}
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
                                loading={treeDataLoading}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}