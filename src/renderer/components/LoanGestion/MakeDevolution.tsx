/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  DownOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Input, Menu, Space, Table, Tag } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import { useState } from 'react';

interface LibroDisponible {
  LibroId: number;
  Titulo: string;
  Autor: string;
  Editorial: string;
  Tema: string;
  Estado: number;
}

interface LibroDevuelto {
  LibroId: number;
  EstudianteId: number;
  PrestamoId: number;
  Estudiante: string;
  Libro: string;
  'Fecha Prestamo': string;
  'Fecha Limite': string;
  Estado: number;
}

interface Historia {
  HistorialId: number;
  Estudiante: string;
  Titulo: string;
  'Fecha Devolucion': string;
  'Fecha Prestamo': string;
  'Fecha Limite': string;
}

interface Iprops {
  data: LibroDevuelto[];
  filteredData: LibroDevuelto[];
  setFilteredData: React.Dispatch<React.SetStateAction<LibroDevuelto[]>>;
  setLoanFilteredData: React.Dispatch<React.SetStateAction<LibroDisponible[]>>;
  setHistorialData: React.Dispatch<React.SetStateAction<Historia[]>>;
}

function MakeDevolution(props: Iprops) {
  const {
    data,
    filteredData,
    setFilteredData,
    setLoanFilteredData,
    setHistorialData,
  } = props;

  const [filter, setFilter] = useState('Estudiante');

  const fecha = new Date();
  const dd = String(fecha.getDate()).padStart(2, '0');
  const mm = String(fecha.getMonth() + 1).padStart(2, '0');
  const yyyy = fecha.getFullYear();

  const fechaDevolucion = `${yyyy}-${mm}-${dd}`;

  const handleDevolver = (
    estudianteId: number,
    libroId: number,
    prestamoId: number,
    fechaPrestamo: string,
    fechaLimite: string
  ) => {
    confirm({
      title: '¿Deseas devolver este libro?',
      icon: <ExclamationCircleOutlined />,
      content: 'Al confirmar la devolucion se generara el registro',
      onOk() {
        window.electron.apiCalls.apiMakeDevolution(
          estudianteId,
          libroId,
          prestamoId,
          fechaDevolucion,
          fechaPrestamo,
          fechaLimite
        );
        setLoanFilteredData(window.electron.apiCalls.apiGetLibrosDisponibles());
        setHistorialData(window.electron.apiCalls.apiGetHistorial());
        setFilteredData(window.electron.apiCalls.apiGetPrestamos());
      },
      onCancel() {},
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
      render: () => {
        return <Tag color="red">Prestado</Tag>;
      },
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (row: any) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              handleDevolver(
                row.EstudianteId,
                row.LibroId,
                row.PrestamoId,
                row['Fecha Prestamo'],
                row['Fecha Limite']
              );
            }}
          >
            Devolver
          </Button>
        </>
      ),
    },
  ];

  const handleFilter = (e: any) => {
    const searchWord = e.target.value;

    const newFilter = data.filter((value) => {
      let dataFilter: string;
      switch (filter) {
        case 'Estudiante':
          dataFilter = value.Estudiante;
          break;
        case 'Libro':
          dataFilter = value.Libro;
          break;
        default:
          dataFilter = value.Estudiante;
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
      <Space size={30} direction="vertical">
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
          rowKey="PrestamoId"
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

export default MakeDevolution;
