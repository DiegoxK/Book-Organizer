let names = window.electron.ipcRenderer.testdb();

function UpdateData() {
  const editData = (id) => {
    window.electron.ipcRenderer.testDelete(id);
  };

  return (
    <div>
      <ul>
        {names.map((user) => {
          return (
            <div key={user.id}>
              <li>{user.first_name}</li>
              <button
                onClick={() => {
                  editData(user.id);
                }}
              >
                Eliminar
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default UpdateData;
