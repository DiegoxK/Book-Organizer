import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Layout } from 'antd';

// Styles
import 'antd/dist/antd.less';
import './scss/App.scss';

// Modules
import Index from './views/Index';
import ConsultData from './views/ConsultData';
import LibraryGestion from './views/LibraryGestion';
import SideMenu from './views/SideMenu';
import LoanGestion from './views/LoanGestion';

// Antd
const { Sider, Content } = Layout;

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
              <Route path="/loanGestion" element={<LoanGestion />} />
            </Routes>
          </Content>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
