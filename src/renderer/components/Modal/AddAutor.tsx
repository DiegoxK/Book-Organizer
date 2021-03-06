import { Input, Space, Button, Table } from 'antd';
import { useState } from 'react';

import { columns } from './AutorTable.json';

interface Iprops {
  data: any;
  setData: any;
}

function AddAutor(props: Iprops) {
  const { data, setData } = props;

  const [autor, setAutor] = useState({
    Nombre: '',
    Apellido: '',
  });

  const handleChange = (event: any) => {
    setAutor({
      ...autor,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event: any) => {
    setAutor({
      Nombre: '',
      Apellido: '',
    });
    event.preventDefault();
    window.electron.apiCalls.apiInsertAutor(autor.Nombre, autor.Apellido);
    setData(window.electron.apiCalls.apiGetAutores());
  };

  return (
    <Space direction="vertical" size={20}>
      <Space>
        <p className="secondary-title">Autor</p>
        <Input
          onChange={handleChange}
          value={autor.Nombre}
          name="Nombre"
          placeholder="Ingrese el nombre"
          style={{ width: 150 }}
        />
        <Input
          onChange={handleChange}
          value={autor.Apellido}
          name="Apellido"
          placeholder="Ingrese el apellido"
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
        rowKey="AutorId"
        bordered
        columns={columns}
        dataSource={data}
      />
    </Space>
  );
}

export default AddAutor;
