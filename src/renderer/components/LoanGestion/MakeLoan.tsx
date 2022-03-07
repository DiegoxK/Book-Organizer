/* eslint-disable @typescript-eslint/no-explicit-any */

import { Input, Table, Tag, Space } from 'antd';
import AddEstudiante from '../Modal/AddEstudiante';

import DraggableModal from '../Modal/DraggableModal';

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

interface Iprops {
  data: LibroDisponible[];
  filteredData: LibroDisponible[];
  setFilteredData: React.Dispatch<React.SetStateAction<LibroDisponible[]>>;
  setDevolutionData: React.Dispatch<React.SetStateAction<LibroDevuelto[]>>;
}

function MakeLoan(props: Iprops) {
  const { data, filteredData, setFilteredData, setDevolutionData } = props;

  const columns = [
    {
      title: 'Titulo del libro',
      dataIndex: 'Titulo',
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
    {
      title: 'Acciones',
      key: 'acciones',
      render: (row: any) => (
        <>
          <DraggableModal
            ModalComponent={AddEstudiante}
            title="Estudiante a realizar el prestamo"
            data={[row.Titulo, row.LibroId, setFilteredData, setDevolutionData]}
            buttonText="Realizar Prestamo"
          />
        </>
      ),
    },
  ];

  const handleFilter = (e: any) => {
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
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            addonAfter={<label>Titulo</label>}
            placeholder="Buscar por Titulo"
            onChange={handleFilter}
            style={{ width: 700 }}
          />
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

export default MakeLoan;
