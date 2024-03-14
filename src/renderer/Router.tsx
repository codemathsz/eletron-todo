import { Routes, Route } from 'react-router-dom';
import {Customer} from "../pages/Customer";
import { DefaultLayout } from '../layouts/DefaultLayout';
import { Product } from '../pages/Product';

export function Router(){
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Customer />} />
        <Route path="/Product" element={<Product />} />
      </Route>
    </Routes>
  )
}
