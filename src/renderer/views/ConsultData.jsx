let names = window.electron.ipcRenderer.testdb();

function ConsultData() {
  return (
    <div>
      <ul>
        {names.map((user) => {
          return <li key={user.id}>{user.first_name}</li>;
        })}
      </ul>
    </div>
  );
}

export default ConsultData;
