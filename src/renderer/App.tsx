import { HashRouter } from 'react-router-dom';
import { Router } from './Router';
import { CustomerProvider } from '../contexts/CustomerContext';
import './App.css';
import { ProductProvider } from '../contexts/ProductContext';


export default function App() {
  return(
    <HashRouter>
      <ProductProvider>
        <CustomerProvider>
          <Router/>
        </CustomerProvider>
      </ProductProvider>
    </HashRouter>
  )
}
