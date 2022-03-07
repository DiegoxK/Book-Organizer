import { SearchOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';

import BookConsult from '../components/ConsultData/BookConsult';
import StudentConsult from '../components/ConsultData/StudentConsult';

const { TabPane } = Tabs;

function ConsultData() {
  return (
    <>
      <h1 className="title">
        <SearchOutlined className="title-img" />
        Consultar Datos
      </h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Consultar Libros" key="1">
          <BookConsult />
        </TabPane>
        <TabPane tab="Consultar Estudiantes" key="2">
          <StudentConsult />
        </TabPane>
      </Tabs>
    </>
  );
}

export default ConsultData;
