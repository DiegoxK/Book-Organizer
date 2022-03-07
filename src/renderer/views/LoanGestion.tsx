import { FormOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useState } from 'react';
import Historial from '../components/LoanGestion/Historial';
import MakeDevolution from '../components/LoanGestion/MakeDevolution';
import MakeLoan from '../components/LoanGestion/MakeLoan';

interface LibroDisponible {
  LibroId: number;
  Titulo: string;
  Autor: string;
  Editorial: string;
  Tema: string;
  Estado: number;
}

interface LibroDevuelto {
  LibroId: number;
  EstudianteId: number;
  PrestamoId: number;
  Estudiante: string;
  Libro: string;
  'Fecha Prestamo': string;
  'Fecha Limite': string;
  Estado: number;
}

interface Historia {
  HistorialId: number;
  Estudiante: string;
  Titulo: string;
  'Fecha Devolucion': string;
  'Fecha Prestamo': string;
  'Fecha Limite': string;
}

const { TabPane } = Tabs;

function LoanGestion() {
  const loanData: LibroDisponible[] =
    window.electron.apiCalls.apiGetLibrosDisponibles();
  const [loanFilteredData, setLoanFilteredData] =
    useState<LibroDisponible[]>(loanData);
  // ============================================================================
  const devolutionData: LibroDevuelto[] =
    window.electron.apiCalls.apiGetPrestamos();
  const [devolutionFilteredData, setDevolutionFilteredData] =
    useState<LibroDevuelto[]>(devolutionData);
  // ===========================================================================
  const [historialData, setHistorialData] = useState<Historia[]>(
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
            filteredData={loanFilteredData}
            setFilteredData={setLoanFilteredData}
            setDevolutionData={setDevolutionFilteredData}
          />
        </TabPane>
        <TabPane tab="Realizar Devolucion" key="2">
          <MakeDevolution
            data={devolutionData}
            filteredData={devolutionFilteredData}
            setFilteredData={setDevolutionFilteredData}
            setLoanFilteredData={setLoanFilteredData}
            setHistorialData={setHistorialData}
          />
        </TabPane>
        <TabPane tab="Historial De Prestamos" key="3">
          <Historial data={historialData} />
        </TabPane>
      </Tabs>
    </>
  );
}

export default LoanGestion;
