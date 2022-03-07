/* eslint-disable @typescript-eslint/no-explicit-any */

import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Table, Tag, Space, Dropdown, Button, Menu, Input } from 'antd';
import { useState } from 'react';

interface Data {
  LibroId: number;
  Titulo: string;
  Autor: string;
  Editorial: string;
  Tema: string;
  Estado: number;
}

const columns = [
  {
    title: 'Titulo',
    dataIndex: 'Titulo',
  },
  {
    title: 'Autor',
    dataIndex: 'Autor',
  },
  {
    title: 'Editorial',
    dataIndex: 'Editorial',
  },
  {
    title: 'Tema',
    dataIndex: 'Tema',
  },
  {
    title: 'Estado',
    dataIndex: 'Estado',
    render: (Estado: number) => {
      if (Estado === 0) {
        return <Tag color="green">Disponible</Tag>;
      }
      return <Tag color="red">Prestado</Tag>;
    },
  },
];

// import { columns } from './BookTable.json';

function BookConsult() {
  const data: Data[] = window.electron.apiCalls.apiGetLibros();

  const [filteredData, setFilteredData] = useState(data);
  const [filter, setFilter] = useState('Titulo');

  const handleFilter: (e: any) => void = (e) => {
    const searchWord = e.target.value;

    const newFilter = data.filter((value: Data) => {
      let dataFilter: string;

      switch (filter) {
        case 'Titulo':
          dataFilter = value.Titulo;
          break;
        case 'Autor':
          dataFilter = value.Autor;
          break;
        case 'Editorial':
          dataFilter = value.Editorial;
          break;
        case 'Tema':
          dataFilter = value.Tema;
          break;
        default:
          dataFilter = value.Titulo;
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
      <Menu.Item key="Titulo" icon={<UserOutlined />}>
        Titulo
      </Menu.Item>
      <Menu.Item key="Autor" icon={<UserOutlined />}>
        Autor
      </Menu.Item>
      <Menu.Item key="Editorial" icon={<UserOutlined />}>
        Editorial
      </Menu.Item>
      <Menu.Item key="Tema" icon={<UserOutlined />}>
        Tema
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
          rowKey="LibroId"
          pagination={false}
          size="small"
          scroll={{ y: 290 }}
          bordered
          columns={columns}
          dataSource={filteredData}
        />
      </Space>
    </>
  );
}

export default BookConsult;
