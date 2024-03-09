import { HashRouter } from 'react-router-dom';
import { Router } from './Router';
import { CustomerProvider } from '../contexts/CustomerContext';
import './App.css';


export default function App() {
  return(
    <HashRouter>
      <CustomerProvider>
        <Router/>
      </CustomerProvider>
    </HashRouter>
  )
}
