import { FormOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useState } from 'react';
import InsertBooks from 'renderer/components/LibraryGestion/InsertBooks';
import InsertStudents from 'renderer/components/LibraryGestion/InsertStudents';
import Historial from 'renderer/components/LoanGestion/Historial';
import MakeDevolution from 'renderer/components/LoanGestion/MakeDevolution';
import MakeLoan from 'renderer/components/LoanGestion/MakeLoan';
const { TabPane } = Tabs;

function LoanGestion() {
  const [loanData, setLoanData] = useState(
    window.electron.apiCalls.apiGetLibrosDisponibles()
  );
  const [loanFilteredData, setLoanFilteredData] = useState(loanData);
  // ============================================================================
  const [devolutionData, setDevolutionData] = useState(
    window.electron.apiCalls.apiGetPrestamos()
  );
  const [devolutionFilteredData, setDevolutionFilteredData] =
    useState(devolutionData);
  // ===========================================================================

  const [historialData, setHistorialData] = useState(
    window.electron.apiCalls.apiGetHistorial()
  );

  return (
    <>
      <h1 className="title">
        <FormOutlined />
        Gestion de Biblioteca
      </h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Realizar Prestamo" key="1">
          <MakeLoan
            data={loanData}
            setData={setLoanData}
            filteredData={loanFilteredData}
            setFilteredData={setLoanFilteredData}
            setDevolutionData={setDevolutionFilteredData}
          />
        </TabPane>
        <TabPane tab="Realizar Devolucion" key="2">
          <MakeDevolution
            data={devolutionData}
            setData={setDevolutionData}
            filteredData={devolutionFilteredData}
            setFilteredData={setDevolutionFilteredData}
            setLoanFilteredData={setLoanFilteredData}
            setHistorialData={setHistorialData}
          />
        </TabPane>
        <TabPane tab="Historial De Prestamos" key="3">
          <Historial data={historialData} setData={setHistorialData} />
        </TabPane>
      </Tabs>
    </>
  );
}

export default LoanGestion;
