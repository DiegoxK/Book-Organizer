import { Link } from 'react-router-dom';

import '../scss/views/SideMenu.scss';

function SideMenu(props) {
  const { handleChange } = props;

  return (
    <>
      <h1 className="brand">
        <span className="book">BOOK</span> ORGANIZER BETA!
      </h1>
      <div className="menu">
        <Link
          onMouseEnter={() => {
            handleChange('ConsultData');
          }}
          to="/consultData"
          className="menu-item"
        >
          Consultar datos
        </Link>
        <Link
          onMouseEnter={() => {
            handleChange('LibraryGestion');
          }}
          to="/libraryGestion"
          className="menu-item"
        >
          Gestion de la biblioteca
        </Link>
        <Link
          onMouseEnter={() => {
            handleChange('LoanGestion');
          }}
          to="/loanGestion"
          className="menu-item"
        >
          Gestion de prestamos
        </Link>
        <Link to="/" className="menu-item menu-exit">
          Salir
        </Link>
      </div>
    </>
  );
}

export default SideMenu;
