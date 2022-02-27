import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Menu, Space, Table } from 'antd';
import { useState } from 'react';
import DraggableModal from './DraggableModal';
import LoanConfirm from './LoanConfirm';

function AddEstudiante(props) {
  const { data } = props;

  const [estudiantes, setEstudiantes] = useState(
    window.electron.apiCalls.apiGetEstudiantes()
  );

  const [filteredData, setFilteredData] = useState(estudiantes);
  const [filter, setFilter] = useState('Nombre');

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'Nombre',
    },
    {
      title: 'Apellido',
      dataIndex: 'Apellido',
    },
    {
      title: 'Telefono',
      dataIndex: 'Telefono',
    },
    {
      title: 'E-Mail',
      dataIndex: 'Email',
    },
    {
      title: 'Direccion',
      dataIndex: 'Direccion',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (row) => (
        <>
          <DraggableModal
            ModalComponent={LoanConfirm}
            title={'Informacion del prestamo'}
            data={[row.Nombre, row.EstudianteId, data]}
            buttonText={'Prestar'}
          />
        </>
      ),
    },
  ];

  const handleFilter = (e) => {
    const searchWord = e.target.value;

    const newFilter = estudiantes.filter((value) => {
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

  const [estudiante, setEstudiante] = useState({
    Nombre: '',
    Apellido: '',
    Telefono: '',
    EMail: '',
    Direccion: '',
  });

  const onSubmit = (event) => {
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
    setFilteredData(window.electron.apiCalls.apiGetEstudiantes());
    setEstudiantes(window.electron.apiCalls.apiGetEstudiantes());
  };

  const onChange = (event) => {
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
        <h2>
          Se prestara el libro:{' '}
          <span style={{ fontWeight: 'bold' }}>"{data[0]}"</span>
        </h2>
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
        <Table
          rowKey={'EstudianteId'}
          scroll={{ y: 200 }}
          bordered={true}
          columns={columns}
          dataSource={filteredData}
          pagination={false}
          size="small"
          style={{ width: 'auto' }}
        />
      </Space>
    </>
  );
}

export default AddEstudiante;
