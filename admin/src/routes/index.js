import { lazy } from "react"

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"))
const Orders = lazy(() => import("../pages/Orders"))
const ProductsAll = lazy(() => import("../pages/ProductsAll"))
const SingleProduct = lazy(() => import("../pages/SingleProduct"))
const AddProduct = lazy(() => import("../pages/AddProduct"))
const Customers = lazy(() => import("../pages/Customers"))
const Chats = lazy(() => import("../pages/Chats"))
const Profile = lazy(() => import("../pages/Profile"))
const Settings = lazy(() => import("../pages/Settings"))
const Page404 = lazy(() => import("../pages/404"))
const Blank = lazy(() => import("../pages/Blank"))
const Collections = lazy(() => import("../pages/Collections"))
const Benefactors = lazy(() => import("../pages/Benefactors"))
const Categories = lazy(() => import("../pages/Categories"))
const EditProduct = lazy(() => import("../pages/EditProduct"))
const AddCategory = lazy(() => import("../pages/AddCategory"))
const EditCategory = lazy(() => import("../pages/EditCategory"))
const AddBenefactors = lazy(() => import("../pages/AddBenefactors"))
const EditBrand = lazy(() => import("../pages/EditBrand"))
const AddCollection = lazy(() => import("../pages/AddCollection"))
const EditCollection = lazy(() => import("../pages/EditCollection"))
const OrderDetail = lazy(() => import("../pages/OrderDetail"))
/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard
  },
  {
    path: "/all-products",
    component: ProductsAll
  },
  {
    path: "/add-product",
    component: AddProduct
  },
  {
    path: "/edit-product/:id",
    component: EditProduct
  },
  {
    path: "/all-category",
    component: Categories
  },
  {
    path: "/add-category",
    component: AddCategory
  },
  {
    path: "/edit-category/:id",
    component: EditCategory
  },
  {
    path: "/all-benefactors",
    component: Benefactors
  },
  {
    path: "/add-benefactors",
    component: AddBenefactors
  },
  {
    path: "/edit-brand/:id",
    component: EditBrand
  },
  {
    path: "/all-collection",
    component: Collections
  },
  {
    path: "/add-collection",
    component: AddCollection
  },
  {
    path: "/edit-collection/:id",
    component: EditCollection
  },
  {
    path: "/product/:id",
    component: SingleProduct
  },
  {
    path: "/customers",
    component: Customers
  },
  {
    path: "/chats",
    component: Chats
  },
  {
    path: "/manage-profile",
    component: Profile
  },
  {
    path: "/settings",
    component: Settings
  },
  {
    path: "/404",
    component: Page404
  },
  {
    path: "/blank",
    component: Blank
  },
  {
    path: "/order/:id",
    component: OrderDetail
  }
]

export default routes
