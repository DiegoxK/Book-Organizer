import { Input, Space, Button, Table } from 'antd';
import { useState } from 'react';

import { columns } from './EditorialTable.json';

interface Iprops {
  data: any;
  setData: any;
}

function AddEditorial(props: Iprops) {
  const { data, setData } = props;

  const [editorial, setEditorial] = useState('');

  const handleChange = (event: any) => {
    setEditorial(event.target.value);
  };

  const onSubmit = (event: any) => {
    setEditorial('');
    event.preventDefault();
    window.electron.apiCalls.apiInsertEditorial(editorial);
    setData(window.electron.apiCalls.apiGetEditoriales());
  };

  return (
    <Space direction="vertical" size={20}>
      <Space>
        <p className="secondary-title">Editorial</p>
        <Input
          onChange={handleChange}
          value={editorial}
          placeholder="Ingrese la Editorial"
          style={{ width: 200 }}
        />
        <Button type="primary" onClick={onSubmit}>
          Agregar
        </Button>
      </Space>
      {/* ============================================================ */}
      <Table
        pagination={false}
        size="small"
        scroll={{ y: 160 }}
        style={{ width: 'auto' }}
        rowKey="EditorialId"
        bordered
        columns={columns}
        dataSource={data}
      />
    </Space>
  );
}

export default AddEditorial;
