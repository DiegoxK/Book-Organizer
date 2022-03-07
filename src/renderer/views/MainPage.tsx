import { Row, Col } from 'antd';
import image from '../../../assets/img/Reading-e-book 1.svg';
import ViewInfo from '../ViewInfo.json';

interface Iprops {
  menuHover: string;
}

interface InfoData {
  id: string;
  title: string;
  info: string[];
}

function Index(props: Iprops) {
  const { menuHover } = props;

  const indexData: { [key: string]: InfoData } = ViewInfo;

  return (
    <>
      <Row>
        <Col span={12}>
          <img className="img" src={image} alt="heroImg" />
        </Col>
        <Col span={12}>
          <div className="rectangle" />
          <h2 className="title">{indexData[menuHover].title}</h2>
          <ul className="data-list">
            {indexData[menuHover].info.map((element, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
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
        <code className="log-text">panelé</code>
      </div>
    </>
  );
}

export default Index;
