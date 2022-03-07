/* eslint-disable @typescript-eslint/no-explicit-any */

import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Table, Space, Dropdown, Button, Menu } from 'antd';
import { useState } from 'react';

import { columns } from './StudentTable.json';

interface Data {
  EstudianteId: number;
  Nombre: string;
  Apellido: string;
  Telefono: string;
  Email: string;
  Direccion: string;
}

function StudentConsult() {
  const data: Data[] = window.electron.apiCalls.apiGetEstudiantes();

  const [filteredData, setFilteredData] = useState(data);
  const [filter, setFilter] = useState('Nombre');

  const handleFilter = (e: any) => {
    const searchWord = e.target.value;

    const newFilter = data.filter((value: Data) => {
      let dataFilter: string;

      switch (filter) {
        case 'Nombre':
          dataFilter = value.Nombre;
          break;
        case 'Apellido':
          dataFilter = value.Apellido;
          break;
        case 'Telefono':
          dataFilter = value.Telefono;
          break;
        case 'E-Mail':
          dataFilter = value.Email;
          break;
        case 'Direccion':
          dataFilter = value.Direccion;
          break;
        default:
          dataFilter = value.Nombre;
          break;
      }
      return dataFilter.toLowerCase().includes(searchWord.toLowerCase());
    });
    setFilteredData(newFilter);
  };

  const changeFilter = (e: any) => {
    setFilter(e.key);
  };

  const menu = (
    <Menu onClick={changeFilter}>
      <Menu.Item key="Nombre" icon={<UserOutlined />}>
        Nombre
      </Menu.Item>
      <Menu.Item key="Apellido" icon={<UserOutlined />}>
        Apellido
      </Menu.Item>
      <Menu.Item key="Telefono" icon={<UserOutlined />}>
        Telefono
      </Menu.Item>
      <Menu.Item key="E-Mail" icon={<UserOutlined />}>
        E-Mail
      </Menu.Item>
      <Menu.Item key="Direccion" icon={<UserOutlined />}>
        Dirección
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Space size={30} direction="vertical">
        <Space>
          <Input
            placeholder={`Buscar por ${filter}`}
            onChange={handleFilter}
            style={{ width: 600 }}
          />

          <Dropdown overlay={menu}>
            <Button>
              {filter} <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
        {/* ====================================================================== */}
        <Table
          rowKey="EstudianteId"
          size="small"
          scroll={{ y: 250 }}
          bordered
          columns={columns}
          dataSource={filteredData}
        />
      </Space>
    </>
  );
}

export default StudentConsult;
