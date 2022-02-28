import { Table } from 'antd';
import { useState } from 'react';

import { columns } from './HistorialTable.json';

function Historial(props) {
  const { data } = props;

  return (
    <>
      <Table
        rowKey={'HistorialId'}
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
