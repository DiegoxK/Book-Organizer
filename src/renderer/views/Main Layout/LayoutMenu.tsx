import './LayoutMenu.scss';

function LayoutMenu(props: any) {
  const { handleMenuChange } = props;

  return (
    <div className="principal-menu">
      <h1 className="app-title">
        Book <span className="sub-text">Organizer</span>
      </h1>
      <ul className="menu-list">
        <li className="menu-item">
          <a
            onClick={() => {
              handleMenuChange('InsertData');
            }}
          >
            Insertar datos
          </a>
        </li>
        <li className="menu-item">
          <a
            onClick={() => {
              handleMenuChange('MakeLoan');
            }}
          >
            Realizar prestamo
          </a>
        </li>
        <li className="menu-item">
          <a
            onClick={() => {
              handleMenuChange('ConsultData');
            }}
          >
            Consultar datos
          </a>
        </li>
        <li className="menu-item">
          <a
            onClick={() => {
              handleMenuChange('UpdateData');
            }}
          >
            Actuallizar datos
          </a>
        </li>
        <li className="menu-item">
          <a
            onClick={() => {
              handleMenuChange('ReturnBook');
            }}
          >
            Devolver libro
          </a>
        </li>
        <li className="menu-item">
          <a
            onClick={() => {
              handleMenuChange('SortLoans');
            }}
          >
            Filtrar prestamos
          </a>
        </li>
        <li className="menu-item exit">
          <a
            onClick={() => {
              handleMenuChange('Home');
            }}
          >
            Salir
          </a>
        </li>
      </ul>
    </div>
  );
}

export default LayoutMenu;
