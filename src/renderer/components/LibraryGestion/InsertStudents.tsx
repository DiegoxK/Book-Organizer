/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { Button, Input, Space, Table } from 'antd';
import { useState } from 'react';

import { columns } from './InsertStudentTable.json';

function InsertStudents() {
  const [estudiantes, setEstudiantes] = useState(
    window.electron.apiCalls.apiGetEstudiantes()
  );

  const [estudiante, setEstudiante] = useState({
    Nombre: '',
    Apellido: '',
    Telefono: '',
    EMail: '',
    Direccion: '',
  });

  const onSubmit = (event: any) => {
    setEstudiante({
      Nombre: '',
      Apellido: '',
      Telefono: '',
      EMail: '',
      Direccion: '',
    });
    event.preventDefault();
    window.electron.apiCalls.apiInsertEstudiante(
      estudiante.Nombre,
      estudiante.Apellido,
      estudiante.Telefono,
      estudiante.EMail,
      estudiante.Direccion
    );
    setEstudiantes(window.electron.apiCalls.apiGetEstudiantes());
  };

  const onChange = (event: any) => {
    setEstudiante({
      ...estudiante,
      [event.target.name]: event.target.value,
    });
  };

  const onCancel = () => {
    setEstudiante({
      Nombre: '',
      Apellido: '',
      Telefono: '',
      EMail: '',
      Direccion: '',
    });
  };

  return (
    <>
      <Space direction="vertical">
        <Space>
          <Input
            onChange={onChange}
            addonBefore={<label>Nombre</label>}
            name="Nombre"
            value={estudiante.Nombre}
            style={{ width: 350 }}
            placeholder="Nombre"
          />
          <Input
            onChange={onChange}
            addonBefore={<label>Apellido</label>}
            value={estudiante.Apellido}
            name="Apellido"
            style={{ width: 350 }}
            placeholder="Apellido"
          />
        </Space>
        <Space>
          <Input
            onChange={onChange}
            addonBefore={<label>Telefono</label>}
            value={estudiante.Telefono}
            name="Telefono"
            style={{ width: 350 }}
            placeholder="Telefono"
          />
          <Input
            onChange={onChange}
            addonBefore={<label>Direccion</label>}
            value={estudiante.Direccion}
            name="Direccion"
            style={{ width: 350 }}
            placeholder="Direccion"
          />
        </Space>
        <Space>
          <Input
            onChange={onChange}
            addonBefore={<label>E-Mail</label>}
            value={estudiante.EMail}
            name="EMail"
            style={{ width: 350 }}
            placeholder="E-Mail"
          />
          <div className="button-margin">
            <Button onClick={onSubmit} type="primary">
              Ingresar
            </Button>
            <Button onClick={onCancel} className="button-margin" danger>
              Cancelar
            </Button>
          </div>
        </Space>
        <Table
          pagination={false}
          size="small"
          scroll={{ y: 230 }}
          style={{ width: 'auto' }}
          rowKey="EstudianteId"
          bordered
          columns={columns}
          dataSource={estudiantes}
        />
      </Space>
    </>
  );
}

export default InsertStudents;
