import React, { createContext, useState } from "react"
import { baseURL, config } from "./utils"
import axios from "axios"
import { toast } from "react-toastify"

export const Context = createContext()

const AppContext = ({ children }) => {
  const [products, setProducts] = useState()
  const [productId, setProductId] = useState({})

  const [collections, setCollections] = useState()
  const [collectionId, setCollectionId] = useState()

  const [brands, setBrands] = useState()
  const [brandId, setBrandId] = useState()

  const [categories, setCategories] = useState()
  const [categoryId, setCategoryId] = useState()

  const [orders, setOrders] = useState()
  const [orderId, setOrderId] = useState()

  const [customers, setCustomers] = useState()

  const [status, setStatus] = useState()

  // CRUD Product Admin

  const getAllProduct = async () => {
    const response = await axios.get(`${baseURL}products?populate=*`, config)
    if (response) {
      setProducts(response?.data?.data)
      return response
    }
  }

  const getProductId = async (id) => {
    const response = await axios.get(
      `${baseURL}products?populate=*&[filters][id]=${id}`,
      config
    )
    if (response) {
      setProductId(response?.data?.data)
      return response
    }
  }

  const handleSubmit = async (image, data) => {
    const formData = new FormData()
    formData.append("files", image)

    try {
      console.log(formData)
      const uploadResponse = await axios.post(`${baseURL}upload`, formData)

      const res = await axios.post(`${baseURL}products`, {
        data: {
          productName: data.productName,
          productPrice: Number(data.productPrice),
          productQuantity: Number(data.productQuantity),
          productDesc: data.productDesc,
          productDiameter: Number(data.productDiameter),
          productHeart: 0,
          productStar: 0,
          category: data.category,
          brand: data.brand,
          collection: data.collection,
          productImg: uploadResponse.data[0].id
        }
      })

      if (res.status === 200) {
        toast.success("Add product successfully")
        console.log("Success")
      }
    } catch (error) {
      console.error("Error:", error.message)
    }
  }

  const handleDeleProduct = async (id) => {
    const response = await axios.delete(`${baseURL}products/${id}`)
    if (response) {
      toast.success("Delete product successfully")
    }
  }

  const handleEditProduct = async (
    id,
    image,
    imageUrl,
    data,
    category,
    brand,
    collection
  ) => {
    const formData = new FormData()
    formData.append("files", image)

    try {
      let uploadResponse
      let imgUrlData

      if (image) {
        uploadResponse = await axios.post(`${baseURL}upload`, formData)
      }

      if (image) {
        imgUrlData = uploadResponse?.data[0].id
      } else {
        imgUrlData = data?.productImg?.data[0]?.id
      }
      const res = await axios.put(`${baseURL}products/${id}?populate=*`, {
        data: {
          productName: data.productName,
          productPrice: Number(data.productPrice),
          productQuantity: Number(data.productQuantity),
          productDesc: data.productDesc,
          productDiameter: Number(data.productDiameter),
          productHeart: 0,
          productStar: 0,
          category: category,
          brand: brand,
          collection: collection,
          productImg: imgUrlData
        }
      })
      toast("Upload successfully")
    } catch (error) {
      toast.error("Upload Error", {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }

  // CRUD Category Admin

  const getAllCategories = async () => {
    const response = await axios.get(`${baseURL}categories?populate=*`, config)
    if (response) {
      setCategories(response?.data?.data)
      return response
    }
  }

  const handleNewCategory = async (image, data) => {
    const formData = new FormData()
    formData.append("files", image)

    try {
      console.log(formData)
      const uploadResponse = await axios.post(`${baseURL}upload`, formData)

      const res = await axios.post(`${baseURL}categories`, {
        data: {
          categoryName: data.categoryName,
          categoryDesc: data.categoryDesc,
          categoryImg: uploadResponse.data[0].id
        }
      })

      if (res.status === 200) {
        toast.success("Add category successfully")
        console.log("Success")
      }
    } catch (error) {
      console.error("Error:", error.message)
    }
  }

  const getCategoryId = async (id) => {
    const response = await axios.get(
      `${baseURL}categories?populate=*&[filters][id]=${id}`,
      config
    )
    if (response) {
      setCategoryId(response?.data)
      return response
    }
  }

  const handleDeleCategory = async (id) => {
    const response = await axios.delete(`${baseURL}categories/${id}`)
    if (response) {
      toast.success("Delete category successfully")
    }
  }

  const handleEditCate = async (id, image, data) => {
    const formData = new FormData()
    formData.append("files", image)

    try {
      let uploadResponse
      let imgUrlData

      if (image) {
        uploadResponse = await axios.post(`${baseURL}upload`, formData)
      }

      if (image) {
        imgUrlData = uploadResponse?.data[0].id
      } else {
        imgUrlData = data?.categoryImg?.data[0]?.id
      }
      const res = await axios.put(`${baseURL}categories/${id}?populate=*`, {
        data: {
          categoryName: data.categoryName,
          categoryDesc: data.categoryDesc,
          categoryImg: imgUrlData
        }
      })
      toast("Upload successfully")
    } catch (error) {
      toast.error("Upload Error", {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }

  // CRUD Brand Admin

  const getAllBrands = async () => {
    const response = await axios.get(`${baseURL}brands?populate=*`, config)
    if (response) {
      setBrands(response?.data?.data)
      return response
    }
  }

  const handleNewBrand = async (image, data) => {
    const formData = new FormData()
    formData.append("files", image)

    try {
      console.log(formData)
      const uploadResponse = await axios.post(`${baseURL}upload`, formData)

      const res = await axios.post(`${baseURL}brands`, {
        data: {
          benefactorsName: data.brandName,
          benefactorsDesc: data.brandDesc,
          benefactorsImg: uploadResponse.data[0].id
        }
      })

      if (res.status === 200) {
        toast.success("Add brand successfully")
        console.log("Success")
      }
    } catch (error) {
      console.error("Error:", error.message)
    }
  }

  const getBrandId = async (id) => {
    const response = await axios.get(
      `${baseURL}brands?populate=*&[filters][id]=${id}`,
      config
    )
    if (response) {
      setBrandId(response?.data)
      return response
    }
  }

  const handleDeleBrand = async (id) => {
    const response = await axios.delete(`${baseURL}brands/${id}`)
    if (response) {
      toast.success("Delete brand successfully")
    }
  }

  const editBrand = async (id, image, data) => {
    const formData = new FormData()
    formData.append("files", image)

    try {
      let uploadResponse
      let imgUrlData

      if (image) {
        uploadResponse = await axios.post(`${baseURL}upload`, formData)
      }

      if (image) {
        imgUrlData = uploadResponse?.data[0].id
      } else {
        imgUrlData = data?.brandImg?.data[0]?.id
      }
      const res = await axios.put(`${baseURL}brands/${id}?populate=*`, {
        data: {
          benefactorsName: data.benefactorsName,
          benefactorsDesc: data.benefactorsDesc,
          benefactorsImg: imgUrlData
        }
      })
      toast("Upload successfully")
    } catch (error) {
      toast.error("Upload Error", {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }

  // CRUD Collection Admin

  const getAllCollection = async () => {
    const response = await axios.get(`${baseURL}collections?populate=*`, config)
    if (response) {
      setCollections(response?.data?.data)
      return response
    }
  }

  const handleNewCollection = async (image, data) => {
    const formData = new FormData()
    formData.append("files", image)

    try {
      console.log(formData)
      const uploadResponse = await axios.post(`${baseURL}upload`, formData)

      const res = await axios.post(`${baseURL}collections`, {
        data: {
          collectionName: data.collectionName,
          collectionDesc: data.collectionDesc,
          collectionImg: uploadResponse.data[0].id
        }
      })

      if (res.status === 200) {
        toast.success("Add collection successfully")
        console.log("Success")
      }
    } catch (error) {
      console.error("Error:", error.message)
    }
  }

  const getCollectionId = async (id) => {
    const response = await axios.get(
      `${baseURL}collections?populate=*&[filters][id]=${id}`,
      config
    )
    if (response) {
      setCollectionId(response?.data)
      return response
    }
  }

  const handleDeleCollection = async (id) => {
    const response = await axios.delete(`${baseURL}collections/${id}`)
    if (response) {
      toast.success("Delete collection successfully")
    }
  }

  const editCollection = async (id, image, data) => {
    const formData = new FormData()
    formData.append("files", image)

    try {
      let uploadResponse
      let imgUrlData

      if (image) {
        uploadResponse = await axios.post(`${baseURL}upload`, formData)
      }

      if (image) {
        imgUrlData = uploadResponse?.data[0].id
      } else {
        imgUrlData = data?.collectionImg?.data[0]?.id
      }
      const res = await axios.put(`${baseURL}collections/${id}?populate=*`, {
        data: {
          collectionName: data.collectionName,
          collectionDesc: data.collectionDesc,
          collectionImg: imgUrlData
        }
      })
      toast("Upload successfully")
    } catch (error) {
      toast.error("Upload Error", {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }

  // ORDER

  const getOrder = async () => {
    const response = await axios.get(`${baseURL}orders?populate=*`, config)
    if (response) {
      setOrders(response?.data?.data)
      return response
    }
  }

  const getOrderId = async (id) => {
    const response = await axios.get(
      `${baseURL}orders?populate=*&[filters][id]=${id}`,
      config
    )
    if (response) {
      setOrderId(response?.data)
      return response
    }
  }

  // CUSTOMERs

  const getCustomers = async () => {
    const response = await axios.get(`${baseURL}users?populate=*`, config)
    if (response) {
      setCustomers(response?.data)
      return response
    }
  }

  const createCustomer = async (userData) => {
    try {
      console.log("User Data:", userData) // Log userData để kiểm tra
      console.log("Config:", config) // Log config để kiểm tra

      const response = await axios.post(`${baseURL}users`, userData, config)
      if (response.status === 200) {
        toast.success("Customer added successfully")
        getCustomers()
      }
      return response
    } catch (error) {
      console.error(
        "Error adding customer:",
        error.response?.data || error.message
      ) // Log thông tin chi tiết về lỗi
      toast.error("Failed to add customer")
    }
  }

  const updateCustomer = async (id, userData) => {
    try {
      const response = await axios.put(
        `${baseURL}users/${id}`,
        userData,
        config
      )
      if (response.status === 200) {
        toast.success("Customer updated successfully")
        getCustomers() // Refresh the customer list
      }
    } catch (error) {
      console.error("Error updating customer:", error)
      toast.error("Failed to update customer")
    }
  }

  const deleteCustomer = async (id) => {
    try {
      const response = await axios.delete(`${baseURL}users/${id}`, config)
      if (response.status === 200) {
        toast.success("Customer deleted successfully")
        getCustomers() // Refresh the customer list
      }
    } catch (error) {
      console.error("Error deleting customer:", error)
      toast.error("Failed to delete customer")
    }
  }

  const getStatus = async () => {
    const response = await axios.get(
      `${baseURL}status-orders?populate=*`,
      config
    )
    if (response) {
      setStatus(response?.data?.data)
      return response
    }
  }

  const getUpdateStatus = async (id, statusId) => {
    const res = await axios.put(`${baseURL}orders/${id}?populate=*`, {
      data: {
        status: statusId
      }
    })
    if (res) {
      toast("Upload status successfully")
      return res
    }
  }

  return (
    <Context.Provider
      value={{
        getAllProduct,
        products,
        getProductId,
        productId,
        getAllCollection,
        handleDeleCollection,
        collections,
        getAllBrands,
        handleDeleBrand,
        brands,
        getAllCategories,
        categories,
        handleSubmit,
        handleDeleProduct,
        handleEditProduct,
        handleNewCategory,
        getCategoryId,
        categoryId,
        handleDeleCategory,
        handleEditCate,
        handleNewBrand,
        getBrandId,
        brandId,
        editBrand,
        handleNewCollection,
        getCollectionId,
        editCollection,
        collectionId,
        getOrder,
        orders,
        getCustomers,
        customers,
        getOrderId,
        orderId,
        getStatus,
        status,
        getUpdateStatus,
        deleteCustomer,
        updateCustomer,
        createCustomer
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default AppContext
