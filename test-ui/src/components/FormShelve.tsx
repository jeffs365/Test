import { Col, Form, Input, Modal, Row, TreeSelect, notification } from "antd";
import React, { useEffect } from "react";
import { AppContext } from "../AppContext";
import * as Yup from "yup";
import { useShelveMutation, useShelvesTreeQuery } from "../hooks";
import { ShelveType } from "../models";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .trim()
        .required("Name is required."),
    parentShelveId: Yup.number()
        .nullable()
        .notRequired(),
});

const rules = [
    ({ getFieldsValue }: any) => ({
        validator({ field }: any) {
            return validationSchema.validateAt(field, getFieldsValue());
        }
    }),
]

export const FormShelve: React.FC = () => {
    const { selectedShelve, formShelve, setFormShelve, setSelectedShelve } = React.useContext(AppContext);

    const [isOpen, setIsOpen] = React.useState(false);

    const { data: treeData, isLoading: treeDataLoading } = useShelvesTreeQuery(isOpen);

    const { mutateAsync: saveBookAsync, isLoading: saveLoading } = useShelveMutation();

    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(formShelve);

        if (!formShelve)
            setIsOpen(false);
        else {
            setIsOpen(true);

            if (!formShelve?.shelveId)
                form.setFieldsValue({ parentShelveId: selectedShelve?.shelveId });
        }
    }, [formShelve, form, selectedShelve])

    const handleSubmit = (values: ShelveType) => {
        saveBookAsync(values)
            .then(() => {
                notification.success({
                    message: 'Success',
                    description: "Location has been saved."
                });
                setFormShelve(undefined);
                setSelectedShelve({ shelveId: values?.parentShelveId, _v: Date.now() });
            })
    }

    return (
        <Modal
            title={formShelve?.shelveId ? "Edit Location" : "Add Location"}
            centered
            open={isOpen}
            onCancel={() => setFormShelve(undefined)}
            onOk={() => form.submit()}
            okText="Save"
            confirmLoading={saveLoading}
        >
            <Form form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={formShelve || {}}
            >
                <Form.Item name="shelveId" hidden />
                <Row gutter={[12, 12]}>
                    <Col span={24}>
                        <Form.Item
                            label="Location Name"
                            name="name"
                            rules={rules}
                            required
                        >
                            <Input placeholder="Enter Location Name"
                                maxLength={255}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Parent Location"
                            name="parentShelveId"
                            rules={rules}
                        >
                            <TreeSelect
                                style={{ width: '100%' }}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="Select Parent Location"
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