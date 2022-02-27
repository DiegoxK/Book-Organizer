import {
  DownOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Input, Menu, Space, Table, Tag } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import { useState } from 'react';

function MakeDevolution() {
  const [data, setData] = useState(window.electron.apiCalls.apiGetPrestamos());
  const [filteredData, setFilteredData] = useState(data);
  const [filter, setFilter] = useState('Estudiante');

  const fecha = new Date();
  const dd = String(fecha.getDate()).padStart(2, '0');
  const mm = String(fecha.getMonth() + 1).padStart(2, '0');
  const yyyy = fecha.getFullYear();

  const fechaDevolucion = `${yyyy}-${mm}-${dd}`;

  const handleDevolver = (estudianteId, libroId, prestamoId) => {
    confirm({
      title: '¿Deseas devolver este libro?',
      icon: <ExclamationCircleOutlined />,
      content: 'Al confirmar la devolucion se generara el registro',
      onOk() {
        window.electron.apiCalls.apiMakeDevolution(
          fechaDevolucion,
          estudianteId,
          libroId,
          prestamoId
        );
        setFilteredData(data);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const columns = [
    {
      title: 'Estudiante',
      dataIndex: 'Estudiante',
    },
    {
      title: 'Libro',
      dataIndex: 'Libro',
    },
    {
      title: 'Fecha de prestamo',
      dataIndex: 'Fecha Prestamo',
    },
    {
      title: 'Fecha limite',
      dataIndex: 'Fecha Limite',
    },
    {
      title: 'Estado',
      dataIndex: 'Estado',
      render: (Estado) => {
        return <Tag color="red">Prestado</Tag>;
      },
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (row) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              handleDevolver(row.EstudianteId, row.LibroId, row.PrestamoId);
            }}
          >
            Devolver
          </Button>
        </>
      ),
    },
  ];

  const handleFilter = (e) => {
    const searchWord = e.target.value;

    const newFilter = data.filter((value) => {
      switch (filter) {
        case 'Estudiante':
          dataFilter = value.Estudiante;
          break;
        case 'Libro':
          dataFilter = value.Libro;
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
      <Menu.Item key="Estudiante" icon={<UserOutlined />}>
        Estudiante
      </Menu.Item>
      <Menu.Item key="Libro" icon={<UserOutlined />}>
        Libro
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Space size={30} direction="vertical ">
        <Space>
          <Input
            placeholder={`Buscar por ${filter}`}
            onChange={handleFilter}
            style={{ width: 530 }}
          />

          <Dropdown overlay={menu}>
            <Button>
              {filter} <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
        <Table
          rowKey={'PrestamoId'}
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

export default MakeDevolution;
