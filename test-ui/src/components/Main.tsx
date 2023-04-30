import { Card, Col, Divider, Layout, List, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { ListItem } from './ListItem';
import { AppContext } from '../AppContext';
import React, { useEffect } from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { HeaderButton } from './HeaderButton';
import { FormBook } from './FormBook';
import { FormShelve } from './FormShelve';
import { useItemMutation, useMainQuery } from '../hooks';
import { ItemType } from '../models';

const colPath = { xs: 24, sm: 12, md: 15, lg: 17, xl: 18 };
const colButton = { xs: 24, sm: 12, md: 9, lg: 7, xl: 6 };

export const Main: React.FC = () => {

  const { 
    selectedShelve 
  } = React.useContext(AppContext);
  const { 
    data: itemData, 
    isLoading: itemLoading,
    refetch: refetchItem
  } = useMainQuery(selectedShelve?.shelveId);
  const { isLoading } = useItemMutation();

  useEffect(() => {
    refetchItem();
  }, [selectedShelve, refetchItem])

  return (
    <Layout className="layout">
      <Content>
        <Row>
          <Col span={24}>
            <Card bordered={false} className="criclebox">
              <Row gutter={[12, 12]}>
                <Col {...colPath}>
                  <Breadcrumbs />
                </Col>
                <Col {...colButton} style={{ textAlign: "end" }}>
                  <HeaderButton />
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col span={24}>
                  <List
                    itemLayout="horizontal"
                    loading={itemLoading || isLoading}
                    dataSource={itemData || []}
                    renderItem={(item: ItemType) => (<ListItem item={item} />)}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
      <FormBook />
      <FormShelve />
    </Layout>
  );
}
