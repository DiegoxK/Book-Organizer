const metelo = () => {
  window.electron.ipcRenderer.testInsert('Mauricioo');
};

function InsertStudents() {
  return (
    <div>
      <button onClick={metelo}>agregar data!!! guiii</button>
    </div>
  );
}

export default InsertStudents;
