import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Layout } from 'antd';

// Styles
import 'antd/dist/antd.less';
import './scss/App.scss';

// Modules
import ConsultData from './views/ConsultData';
import LibraryGestion from './views/LibraryGestion';
import AddTopic from './views/Modal/addTopic';
import AddEditorial from './views/Modal/addEditorial';
import AddAutor from './views/Modal/addAutor';

// Antd
import SideMenu from './Layout/SideMenu';
const { Sider, Content } = Layout;
import Index from './views/Index';

function App() {
  const [menuHover, setMenuHover] = useState('ConsultData');

  const handleChange = (menu: string) => {
    setMenuHover(menu);
  };

  return (
    <div className="app">
      <Layout>
        <Router>
          <Sider width={240} className="menu-sider">
            <SideMenu handleChange={handleChange} />
          </Sider>
          <Content className="content">
            <Routes>
              <Route path="/" element={<Index menuHover={menuHover} />} />
              <Route path="/consultData" element={<ConsultData />} />
              <Route path="/libraryGestion" element={<LibraryGestion />} />
              {/* Modal Routes */}
              <Route path="/addTopic" element={<AddTopic />} />
              <Route path="/addEditorial" element={<AddEditorial />} />
              <Route path="/addAutor" element={<AddAutor />} />
            </Routes>
          </Content>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
