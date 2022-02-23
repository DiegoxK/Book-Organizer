import { FormOutlined } from '@ant-design/icons';
import { Input, Space, Button, Table } from 'antd';
import { useState } from 'react';

import { columns } from './TopicsTable.json';

function AddTopic(props) {
  const { data, setData } = props;

  const [tema, setTema] = useState('');

  const handleChange = (event) => {
    setTema(event.target.value);
  };

  const onSubmit = (event) => {
    setTema('');
    event.preventDefault();
    window.electron.apiCalls.apiInsertTemas(tema);
    setData(window.electron.apiCalls.apiGetTemas());
  };

  return (
    <Space direction="vertical" size={20}>
      <Space>
        <label className="secondary-title">Tema</label>
        <Input
          onChange={handleChange}
          value={tema}
          placeholder="Ingrese el tema"
          style={{ width: 150 }}
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
        rowKey="TemaId"
        bordered={true}
        columns={columns}
        dataSource={data}
      />
    </Space>
  );
}

export default AddTopic;
