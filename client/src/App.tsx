import LandingPage from "./pages/LandingPage";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import HomeLayout from "./components/Layouts/HomeLayout";
import Products from "./pages/products/Products";
import Materials from "./pages/materials/Materials";
import ProductProcess from "./pages/product_process/ProductProcess";
import Employee from "./pages/Employee";
import Supplier from "./pages/supplier/Supplier";
import AddSupplier from "./pages/supplier/AddSupplier";
import Authorized from "./helpers/Authorized";
import UserRequired from "./helpers/UserRequired";
import AddMaterial from "./pages/materials/AddMaterial";
import EditMaterial from "./pages/materials/EditMaterial";
import AddProductProcess from "./pages/product_process/AddPP";
import EditProductProcess from "./pages/product_process/EditPP";
import ProductDetail from "./pages/products/ProductDetail";
import EditProduct from "./pages/products/EditProduct";
import AddProduct, {
  loader as productLoader,
} from "./pages/products/AddProduct";
import SettingsLayout from "./pages/settings/SettingsLayout";
import ChangePassword from "./pages/settings/ChangePassword";
import About from "./pages/help/About";
import Contact from "./pages/help/Contact";
import HelpLayout from "./pages/help/HelpLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<LandingPage />} loader={Authorized} />
      <Route path="/" element={<HomeLayout />} loader={UserRequired}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/">
          <Route path="products" element={<Products />} />
          <Route
            path="add-product"
            element={<AddProduct />}
            loader={productLoader}
          />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
        </Route>

        <Route path="/">
          <Route path="materials" element={<Materials />} />
          <Route path="add-material" element={<AddMaterial />} />
          <Route path="edit-material/:id" element={<EditMaterial />} />
        </Route>
        <Route path="/">
          <Route path="processes" element={<ProductProcess />} />
          <Route path="add-process" element={<AddProductProcess />} />
          <Route path="edit-process/:id" element={<EditProductProcess />} />
        </Route>
        <Route path="/">
          <Route path="suppliers" element={<Supplier />} />
          <Route path="add-supplier" element={<AddSupplier />} />
        </Route>
        <Route path="/" element={<SettingsLayout />}>
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
        <Route path="/" element={<HelpLayout />}>
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="employee" element={<Employee />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
