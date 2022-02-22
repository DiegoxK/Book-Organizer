import { FormOutlined } from '@ant-design/icons';
import { Tabs, Input } from 'antd';
import InsertBooks from 'renderer/components/LibraryGestion/InsertBooks';

const { Search } = Input;
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
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </>
  );
}

export default LibraryGestion;
