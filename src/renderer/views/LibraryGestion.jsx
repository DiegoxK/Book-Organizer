import { FormOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import InsertBooks from 'renderer/components/LibraryGestion/InsertBooks';
import InsertStudents from 'renderer/components/LibraryGestion/InsertStudents';

const { TabPane } = Tabs;

function LibraryGestion() {
  return (
    <>
      <h1 className="title">
        <FormOutlined />
        Gestion de Biblioteca
      </h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Ingresar Libros" key="1">
          <InsertBooks />
        </TabPane>
        <TabPane tab="Ingresar Estudiantes" key="2">
          <InsertStudents />
        </TabPane>
      </Tabs>
    </>
  );
}

export default LibraryGestion;
