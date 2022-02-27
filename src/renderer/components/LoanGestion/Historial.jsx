import { Table } from 'antd';
import { useState } from 'react';

import { columns } from './HistorialTable.json';

function Historial() {
  const [data, setdata] = useState(window.electron.apiCalls.apiGetHistorial());

  return (
    <>
      <Table
        rowKey={'PrestamoId'}
        pagination={false}
        size="small"
        scroll={{ y: 290 }}
        bordered={true}
        columns={columns}
        dataSource={data}
      />
    </>
  );
}

export default Historial;
