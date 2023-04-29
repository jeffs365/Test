import { Card, Col, Divider, Layout, List, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { getAllShelves } from '../services/shelve.service';
import { useQuery } from 'react-query';
import { getAllBooks } from '../services/book.service';
import { ListItem } from './ListItem';
import { AppContext } from '../AppContext';
import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { HeaderButton } from './HeaderButton';
import { FormBook } from './FormBook';
import { FormShelve } from './FormShelve';

const colPath = { xs: 24, sm: 12, md: 15, lg: 17, xl: 18 };
const colButton = { xs: 24, sm: 12, md: 9, lg: 7, xl: 6 };

export const Main: React.FC = () => {

  const { selectedShelve } = React.useContext(AppContext);
  const { data: shelveData, isLoading: shelveIsLoading } = useQuery(['shelves', selectedShelve], () => getAllShelves(selectedShelve));
  const { data: bookData, isLoading: booksLoading } = useQuery(['books', selectedShelve], () => getAllBooks(selectedShelve?.shelveId));

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
                    loading={shelveIsLoading || booksLoading}
                    dataSource={[ ...shelveData ?? [], ...bookData ?? []]}
                    renderItem={(item: any) => (<ListItem item={item} />)}
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
