import { Button, Input } from 'antd';
import { Table, Tag, Space } from 'antd';

const newWindow = () => {
  window.electron.ipcRenderer.newWindow('addTopic');
};

const { Search } = Input;

function BookGestion() {
  return (
    <>
      <Button onClick={newWindow}>Open</Button>
    </>
  );
}

export default BookGestion;
