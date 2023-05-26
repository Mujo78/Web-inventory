import './App.css';
import LandingPage from './pages/LandingPage';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';
import UserReq from './helpers/UserReq';
import HomeLayout from './components/HomeLayout';
import Products from './pages/Products';
import Materials from './pages/Materials';
import ProductProcess from './pages/ProductProcess';
import Suppliers from './pages/supplier/Suppliers';
import Employee from './pages/Employee';
import Settings from './pages/Settings';
import Supplier from './pages/supplier/Supplier';
import AddSupplier from './pages/supplier/AddSupplier';


const router = createBrowserRouter(createRoutesFromElements(
  
  <Route path='/' element={<Layout />}>
    <Route index element={<LandingPage />} />
      <Route path='/' element={<HomeLayout />} loader={async () => await UserReq()}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='products' element={<Products />} />
        <Route path='materials' element={<Materials />} />
        <Route path='product-process' element={<ProductProcess />} />
        <Route path='suppliers' element={<Suppliers />}>
          <Route index element={<Supplier />} />
          <Route path='add-supplier' element={<AddSupplier />} />
        </Route>
        <Route path='settings' element={<Settings />} />
        <Route path='employee' element={<Employee />} />
    </Route>
    <Route path='*' element={<ErrorPage />} />
  </Route>

))

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
