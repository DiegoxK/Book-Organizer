import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Table, Tag, Space, Dropdown, Button, Menu } from 'antd';
import { useState } from 'react';
import AddEstudiante from '../Modal/AddEstudiante';

import DraggableModal from '../Modal/DraggableModal';

function MakeLoan() {
  const [data, setData] = useState(
    window.electron.apiCalls.apiGetLibrosDisponibles()
  );

  const [filteredData, setFilteredData] = useState(data);

  const columns = [
    {
      title: 'Titulo del libro',
      dataIndex: 'Titulo',
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
    {
      title: 'Acciones',
      key: 'acciones',
      render: (row) => (
        <>
          <DraggableModal
            ModalComponent={AddEstudiante}
            title={'Estudiante a realizar el prestamo'}
            data={[row.Titulo, row.LibroId, setFilteredData]}
            buttonText={'Realizar Prestamo'}
          />
        </>
      ),
    },
  ];

  const handleFilter = (e) => {
    const searchWord = e.target.value;

    const newFilter = data.filter((value) => {
      return value.Titulo.toLowerCase().includes(searchWord.toLowerCase());
    });
    setFilteredData(newFilter);
  };

  return (
    <>
      <Space size={30} direction="vertical">
        <Space>
          <Input
            addonAfter={<label>Titulo</label>}
            placeholder={`Buscar por Titulo`}
            onChange={handleFilter}
            style={{ width: 700 }}
          />
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

export default MakeLoan;
