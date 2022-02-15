import ConsultData from '../ConsultData';
import Home from '../Home';
import InsertData from '../InsertData';
import MakeLoan from '../MakeLoan';
import ReturnBook from '../ReturnBook';
import SortLoans from '../SortLoans';
import UpdateData from '../UpdateData';

function MainMenu(props: any) {
  const { menuOption } = props;

  return (
    <div>
      {menuOption === 'Home' ? (
        <Home />
      ) : menuOption === 'ConsultData' ? (
        <ConsultData />
      ) : menuOption === 'InsertData' ? (
        <InsertData />
      ) : menuOption === 'MakeLoan' ? (
        <MakeLoan />
      ) : menuOption === 'ReturnBook' ? (
        <ReturnBook />
      ) : menuOption === 'SortLoans' ? (
        <SortLoans />
      ) : menuOption === 'UpdateData' ? (
        <UpdateData />
      ) : (
        ''
      )}
    </div>
  );
}

export default MainMenu;
