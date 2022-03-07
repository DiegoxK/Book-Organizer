import { Input, Space, Button, Table } from 'antd';
import { useState } from 'react';

import { columns } from './TopicsTable.json';

interface Iprops {
  data: any;
  setData: any;
}

function AddTopic(props: Iprops) {
  const { data, setData } = props;

  const [tema, setTema] = useState('');

  const handleChange = (event: any) => {
    setTema(event.target.value);
  };

  const onSubmit = (event: any) => {
    setTema('');
    event.preventDefault();
    window.electron.apiCalls.apiInsertTemas(tema);
    setData(window.electron.apiCalls.apiGetTemas());
  };

  return (
    <Space direction="vertical" size={20}>
      <Space>
        <p className="secondary-title">Tema</p>
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
        bordered
        columns={columns}
        dataSource={data}
      />
    </Space>
  );
}

export default AddTopic;
