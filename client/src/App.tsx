import './App.css';
import LandingPage from './pages/LandingPage';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';
import HomeLayout from './components/HomeLayout';
import Products from './pages/Products';
import Materials from './pages/Materials';
import ProductProcess from './pages/ProductProcess';
import SupplierLayout from './pages/supplier/SupplierLayout';
import Employee from './pages/Employee';
import Settings from './pages/Settings';
import Supplier from './pages/supplier/Supplier';
import AddSupplier from './pages/supplier/AddSupplier';
import EditSupplier from './pages/supplier/EditSupplier';
import Authorized from './helpers/Authorized';
import UserRequired from './helpers/UserRequired';
import RequiredUser from './helpers/RequiredUser';
import SupplierDetails from './pages/supplier/SupplierDetails';


const router = createBrowserRouter(createRoutesFromElements(
  
  <Route path='/' element={<Layout />}>
    <Route index element={<LandingPage />} loader={Authorized} />
        <Route path='/' element={<HomeLayout />} loader={UserRequired}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='products' element={<Products />} />
          <Route path='materials' element={<Materials />} />
          <Route path='product-process' element={<ProductProcess />} />
          <Route path="/" element={<SupplierLayout />}>
            <Route path='suppliers' element={<Supplier />}/>
            <Route path='add-supplier' element={<AddSupplier />} />
            <Route path='overview-supplier/:id' element={<SupplierDetails />} />
            <Route path='edit-supplier/:id' element={<EditSupplier />} />
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
