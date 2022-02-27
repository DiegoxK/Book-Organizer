import { FormOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import InsertBooks from 'renderer/components/LibraryGestion/InsertBooks';
import InsertStudents from 'renderer/components/LibraryGestion/InsertStudents';
import Historial from 'renderer/components/LoanGestion/Historial';
import MakeDevolution from 'renderer/components/LoanGestion/MakeDevolution';
import MakeLoan from 'renderer/components/LoanGestion/MakeLoan';

const { TabPane } = Tabs;

function LoanGestion() {
  return (
    <>
      <h1 className="title">
        <FormOutlined />
        Gestion de Biblioteca
      </h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Realizar Prestamo" key="1">
          <MakeLoan />
        </TabPane>
        <TabPane tab="Realizar Devolucion" key="2">
          <MakeDevolution />
        </TabPane>
        <TabPane tab="Historial De Prestamos" key="3">
          <Historial />
        </TabPane>
      </Tabs>
    </>
  );
}

export default LoanGestion;
