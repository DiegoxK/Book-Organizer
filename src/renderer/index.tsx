import { render } from 'react-dom';
import App from './App';

// Styles
import 'antd/dist/antd.less';
import './scss/App.scss';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    electron: any;
  }
}

render(<App />, document.getElementById('root'));
