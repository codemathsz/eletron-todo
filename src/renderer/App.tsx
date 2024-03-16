import { HashRouter } from 'react-router-dom';
import { Router } from './Router';
import { CustomerProvider } from '../contexts/CustomerContext';
import { ProductProvider } from '../contexts/ProductContext';
import './App.css';


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
