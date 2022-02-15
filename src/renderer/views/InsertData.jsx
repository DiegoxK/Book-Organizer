import InsertStudents from 'renderer/components/Insert Data/InsertStudents';

function InsertData() {
  return (
    <div className="insertDataView">
      <select name="" id="">
        <option value="">Insertar Estudiantes</option>
        <option value="">Insertar Libro</option>
        <option value="">Insertar Nueva Categoria</option>
      </select>
      <InsertStudents />
    </div>
  );
}

export default InsertData;
