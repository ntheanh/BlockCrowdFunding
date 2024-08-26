/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/app/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard" // name that appear in Sidebar
  },
  {
    icon: "TruckIcon",
    name: "Managemant",
    routes: [
      {
        name: "Products",
        routes: [
          {
            path: "/app/all-products",
            name: "All Products"
          },
          {
            path: "/app/add-product",
            name: "Add Product"
          }
        ]
      },
      {
        name: "Category",
        routes: [
          {
            path: "/app/all-category",
            name: "All Category"
          },
          {
            path: "/app/add-category",
            name: "Add Category"
          }
        ]
      },
      {
        name: "Benefactors",
        routes: [
          {
            path: "/app/all-benefactors",
            name: "All Benefactors"
          },
          {
            path: "/app/add-benefactors",
            name: "Add Benefactors"
          }
        ]
      },
      {
        name: "Collection",
        routes: [
          {
            path: "/app/all-collection",
            name: "All Collection"
          },
          {
            path: "/app/add-collection",
            name: "Add Collection"
          }
        ]
      }
    ]
  },
  // {
  //   icon: "TruckIcon",
  //   name: "Products",
  //   routes: [
  //     {
  //       path: "/app/all-products",
  //       name: "All Products",
  //     },
  //     {
  //       path: "/app/add-product",
  //       name: "Add Product",
  //     },
  //   ],
  // },
  {
    path: "/app/customers",
    icon: "GroupIcon",
    name: "Customers"
  },
  {
    path: "/app/chats",
    icon: "ChatIcon",
    name: "Chats"
  },
  {
    path: "/app/manage-profile",
    icon: "UserIcon",
    name: "Profile"
  },
  {
    path: "/app/settings",
    icon: "OutlineCogIcon",
    name: "Settings"
  },
  {
    path: "/app/logout",
    icon: "OutlineLogoutIcon",
    name: "Logout"
  }
]

export default routes
