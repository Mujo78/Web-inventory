import './App.css';
import LandingPage from './pages/LandingPage';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';
import HomeLayout from './components/HomeLayout';
import Products from './pages/products/Products';
import Materials from './pages/materials/Materials';
import ProductProcess from './pages/product_process/ProductProcess';
import SupplierLayout from './pages/supplier/SupplierLayout';
import Employee from './pages/Employee';
import Settings from './pages/Settings';
import Supplier from './pages/supplier/Supplier';
import AddSupplier from './pages/supplier/AddSupplier';
import EditSupplier from './pages/supplier/EditSupplier';
import Authorized from './helpers/Authorized';
import UserRequired from './helpers/UserRequired';
import SupplierDetails from './pages/supplier/SupplierDetails';
import MaterialLayout from './pages/materials/MaterialLayout';
import AddMaterial from './pages/materials/AddMaterial';
import MaterialDetails from './pages/materials/MaterialDetails';
import EditMaterial from './pages/materials/EditMaterial';
import ProductProcessLayout from './pages/product_process/ProductProcessLayout';
import AddProductProcess from './pages/product_process/AddPP';
import EditProductProcess from './pages/product_process/EditPP';
import PPDetailPage from './pages/product_process/PPDetailPage';
import ProductLayout from './pages/products/ProductLayout';
import ProductDetail from './pages/products/ProductDetail';
import EditProduct from './pages/products/EditProduct';
import AddProduct from './pages/products/AddProduct';


const router = createBrowserRouter(createRoutesFromElements(
  
  <Route path='/' element={<Layout />}>
    <Route index element={<LandingPage />} loader={Authorized} />
        <Route path='/' element={<HomeLayout />} loader={UserRequired}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='/' element={<ProductLayout />}>
            <Route path='products' element={<Products />} />
            <Route path='add-product' element={<AddProduct />} />
            <Route path='product/:id' element={<ProductDetail />} />
            <Route path='edit-product/:id' element={<EditProduct />} />
          </Route>
          
          <Route path='/' element={<MaterialLayout />}>
              <Route path='materials' element={<Materials />} />
              <Route path='add-material' element={<AddMaterial />} />
              <Route path='material/:id' element={<MaterialDetails />} />
              <Route path='edit-material/:id' element={<EditMaterial />} />
          </Route>
          <Route path='/' element={<ProductProcessLayout />} >
            <Route path='processes' element={<ProductProcess />} />
            <Route path='add-process' element={<AddProductProcess />} />
            <Route path='process/:id' element={<PPDetailPage />} />
            <Route path='edit-process/:id' element={<EditProductProcess />} />
          </Route>
          <Route path="/" element={<SupplierLayout />}>
            <Route path='suppliers' element={<Supplier />}/>
            <Route path='add-supplier' element={<AddSupplier />} />
            <Route path='supplier/:id' element={<SupplierDetails />} />
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
