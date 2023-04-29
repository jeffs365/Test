import { Col, Form, Input, Modal, Row, TreeSelect, notification } from "antd";
import React, { useEffect } from "react";
import { AppContext } from "../AppContext";
import * as Yup from "yup";
import { getAllShelvesTree } from "../services/shelve.service";
import { useQuery } from "react-query";
import { createShelve, updateShelve } from "../services/shelve.service";

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

    const { data: treeData } = useQuery('shelvesTree', () => getAllShelvesTree(), { enabled: isOpen });

    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(formShelve);

        if (!formShelve)
            setIsOpen(false);
        else {
            setIsOpen(true);

            if (!formShelve?.bookId)
                form.setFieldsValue({ parentShelveId: selectedShelve?.shelveId });
        }
    }, [formShelve, form])

    const handleSubmit = (values: any) => {
        const { shelveId, parentShelveId } = values;
        let promise = null;

        if (!values.shelveId)
            promise = createShelve(values);
        else
            promise = updateShelve(shelveId, values);

        promise.then(() => {
            notification.success({
                message: 'Success',
                description: "Location has been saved."
            });
            setFormShelve(null);
            setSelectedShelve({ shelveId: parentShelveId, _v: Date.now() });
        })
    }

    return (
        <Modal
            title={formShelve?.shelveId ? "Edit Location" : "Add Location"}
            centered
            open={isOpen}
            onCancel={() => setFormShelve(null)}
            onOk={() => form.submit()}
            okText="Save"
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
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}