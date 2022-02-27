import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Table, Tag, Space, Dropdown, Button, Menu } from 'antd';
import { useState } from 'react';

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
    render: (Estado) => {
      if (Estado == 0) {
        return <Tag color="green">Disponible</Tag>;
      } else {
        return <Tag color="red">Prestado</Tag>;
      }
    },
  },
];

// import { columns } from './BookTable.json';

function BookConsult() {
  const data = window.electron.apiCalls.apiGetLibros();

  const [filteredData, setFilteredData] = useState(data);
  const [filter, setFilter] = useState('Titulo');

  const handleFilter = (e) => {
    const searchWord = e.target.value;

    const newFilter = data.filter((value) => {
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
          rowKey={'LibroId'}
          pagination={false}
          size="small"
          scroll={{ y: 290 }}
          bordered={true}
          columns={columns}
          dataSource={filteredData}
        />
      </Space>
    </>
  );
}

export default BookConsult;
