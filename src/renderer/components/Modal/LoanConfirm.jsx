import { Button, DatePicker, Space } from 'antd';
import { useState } from 'react';

function LoanConfirm(props) {
  const { data, setModalVisible } = props;

  const fecha = new Date();
  const dd = String(fecha.getDate()).padStart(2, '0');
  const mm = String(fecha.getMonth() + 1).padStart(2, '0');
  const yyyy = fecha.getFullYear();

  const fechaDePrestamo = `${yyyy}-${mm}-${dd}`;

  const [prestamo, setPrestamo] = useState({
    estudianteId: data[1],
    libroId: data[2][1],
    fechaPrestamo: fechaDePrestamo,
    fechaLimite: '',
  });

  const onSubmit = () => {
    window.electron.apiCalls.apiInsertPrestamo(
      prestamo.estudianteId,
      prestamo.libroId,
      prestamo.fechaPrestamo,
      prestamo.fechaLimite
    );
    setModalVisible(false);
  };

  const onChange = (date, dateString) => {
    console.log(fechaDePrestamo);
    setPrestamo({
      ...prestamo,
      fechaLimite: dateString,
    });
  };

  return (
    <>
      <Space direction="vertical">
        <h2>
          Se prestara el libro:{' '}
          <span style={{ fontWeight: 'bold' }}>"{data[2][0]}"</span>
        </h2>
        <h2>
          Al estudiante: <span style={{ fontWeight: 'bold' }}>"{data[0]}"</span>
        </h2>

        <label className="secondary-title">
          {' '}
          Inserte una Fecha limite de entrega
        </label>
        <DatePicker onChange={onChange} size={'large'} />
        <Button onClick={onSubmit} type="primary">
          Realizar Prestamo
        </Button>
      </Space>
    </>
  );
}

export default LoanConfirm;
