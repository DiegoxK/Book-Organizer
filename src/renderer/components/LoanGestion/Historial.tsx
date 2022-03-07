import { Table } from 'antd';

import { columns } from './HistorialTable.json';

interface Historia {
  HistorialId: number;
  Estudiante: string;
  Titulo: string;
  'Fecha Devolucion': string;
  'Fecha Prestamo': string;
  'Fecha Limite': string;
}

interface Iprops {
  data: Historia[];
}

function Historial(props: Iprops) {
  const { data } = props;

  return (
    <>
      <Table
        rowKey="HistorialId"
        pagination={false}
        size="small"
        scroll={{ y: 290 }}
        bordered
        columns={columns}
        dataSource={data}
      />
    </>
  );
}

export default Historial;
