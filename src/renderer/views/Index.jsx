import { Row, Col } from 'antd';

import image from '../assets/img/Reading-e-book 1.svg';
import ViewInfo from '../ViewInfo.json';

import '../scss/views/Index.scss';

function Index(props) {
  const { menuHover } = props;

  return (
    <>
      <Row>
        <Col span={12}>
          <img className="img" src={image} alt="heroImg" />
        </Col>
        <Col span={12}>
          <div className="rectangle" />
          <h2 className="title">{ViewInfo[menuHover].title}</h2>
          <ul className="data-list">
            {ViewInfo[menuHover].info.map((element, index) => {
              return (
                <li key={index} className="data-item">
                  - {element}
                </li>
              );
            })}
          </ul>
        </Col>
      </Row>
      {/* <Button className="login-button" type="primary">
        Ingresar
      </Button> */}
      <hr />
      <h2 className="title">Log</h2>
      <div className="log">
        <code className="log-text">panelita</code>
      </div>
    </>
  );
}

export default Index;
