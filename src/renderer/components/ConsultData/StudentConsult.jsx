import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Table, Tag, Space, Dropdown, Button, Menu } from 'antd';
import { useState } from 'react';

import { columns } from './StudentTable.json';

function StudentConsult() {
  const data = window.electron.apiCalls.apiGetEstudiantes();

  console.log(data);

  const [filteredData, setFilteredData] = useState(data);
  const [filter, setFilter] = useState('Nombre');

  const handleFilter = (e) => {
    const searchWord = e.target.value;

    const newFilter = data.filter((value) => {
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
          dataFilter = value['E-Mail'];
          break;
        case 'Direccion':
          dataFilter = value.Direccion;
          break;
      }
      return dataFilter.toLowerCase().includes(searchWord.toLowerCase());
    });
    setFilteredData(newFilter);
  };

  const changeFilter = (e) => {
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
          rowKey={'EstudianteId'}
          bordered={true}
          columns={columns}
          dataSource={filteredData}
        />
      </Space>
    </>
  );
}

export default StudentConsult;
