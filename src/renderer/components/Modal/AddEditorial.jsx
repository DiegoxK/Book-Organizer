import { FormOutlined } from '@ant-design/icons';
import { Input, Space, Button, Table } from 'antd';
import { useState } from 'react';

import { columns } from './EditorialTable.json';

function AddEditorial(props) {
  const { data, setData } = props;

  const [editorial, setEditorial] = useState('');

  const handleChange = (event) => {
    setEditorial(event.target.value);
  };

  const onSubmit = (event) => {
    setEditorial('');
    event.preventDefault();
    window.electron.apiCalls.apiInsertEditorial(editorial);
    setData(window.electron.apiCalls.apiGetEditoriales());
  };

  return (
    <Space direction="vertical" size={20}>
      <Space>
        <label className="secondary-title">Editorial</label>
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
        bordered={true}
        columns={columns}
        dataSource={data}
      />
    </Space>
  );
}

export default AddEditorial;
