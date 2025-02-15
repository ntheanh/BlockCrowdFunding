import React, { useState, useEffect, useContext } from "react"
import PageTitle from "../components/Typography/PageTitle"
import { Link, NavLink } from "react-router-dom"
import {
  EditIcon,
  EyeIcon,
  GridViewIcon,
  HomeIcon,
  ListViewIcon,
  TrashIcon
} from "../icons"
import {
  Card,
  CardBody,
  Label,
  Select,
  Button,
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@windmill/react-ui"
import response from "../utils/demo/productData"
import Icon from "../components/Icon"
import { genRating } from "../utils/genarateRating"
import { Context } from "../utils/AppContext"
import { baseURLImg } from "../utils/utils"

const ProductsAll = () => {
  const [view, setView] = useState("grid")
  const { getAllProduct, products, handleDeleProduct } = useContext(Context)

  // Table and grid data handlling
  const [page, setPage] = useState(1)
  const [datas, setDatas] = useState([])
  const [id, setId] = useState()
  // pagination setup
  const [resultsPerPage, setResultsPerPage] = useState(8)
  const totalResultss = products?.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  useEffect(() => {
    getAllProduct()
  }, [])

  useEffect(() => {
    setDatas(
      products?.slice((page - 1) * resultsPerPage, page * resultsPerPage)
    )
  }, [page, resultsPerPage, products])

  // Delete action model
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(null)
  async function openModal(productName, id) {
    // console.log(product);
    setSelectedDeleteProduct(productName)
    setIsModalOpen(true)
    setId(id)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  // Handle list view
  const handleChangeView = () => {
    if (view === "list") {
      setView("grid")
    }
    if (view === "grid") {
      setView("list")
    }
  }

  const handleDelete = async (id) => {
    await handleDeleProduct(id)
    await setIsModalOpen(false)
    await getAllProduct()
  }

  return (
    <div>
      <PageTitle>All Products</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">All Products</p>
      </div>

      {/* Sort */}
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All Products
              </p>

              <Label className="mx-3">
                <Select className="py-3">
                  <option>Sort by</option>
                  <option>Asc</option>
                  <option>Desc</option>
                </Select>
              </Label>

              <Label className="mx-3">
                <Select className="py-3">
                  <option>Filter by Category</option>
                  <option>Electronics</option>
                  <option>Cloths</option>
                  <option>Mobile Accerssories</option>
                </Select>
              </Label>

              <Label className="mr-8">
                {/* <!-- focus-within sets the color for the icon when input is focused --> */}
                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                  <input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Number of Results"
                    value={resultsPerPage}
                    onChange={(e) => setResultsPerPage(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                    {/* <SearchIcon className="w-5 h-5" aria-hidden="true" /> */}
                    Results on {`${view}`}
                  </div>
                </div>
              </Label>
            </div>
            <div className="">
              <Button
                icon={view === "list" ? ListViewIcon : GridViewIcon}
                className="p-2"
                aria-label="Edit"
                onClick={handleChangeView}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Delete product model */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader className="flex items-center">
          {/* <div className="flex items-center"> */}
          <Icon icon={TrashIcon} className="w-6 h-6 mr-3" />
          Delete Product
          {/* </div> */}
        </ModalHeader>
        <ModalBody>
          Make sure you want to delete product {selectedDeleteProduct}
        </ModalBody>
        <ModalFooter>
          {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button onClick={() => handleDelete(id)}>Delete</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large">
              Delete
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      {/* Product Views */}
      {view === "list" ? (
        <>
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Name</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>QTY</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Action</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {datas?.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Avatar
                          className="hidden mr-4 md:block"
                          src={
                            baseURLImg +
                            product?.attributes?.productImg?.data[0].attributes
                              ?.url
                          }
                          alt="Product image"
                        />
                        <div>
                          <p className="font-semibold">
                            {product?.attributes?.productName}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-sm">
                      {genRating(product?.attributes?.productStar, 3, 5)}
                    </TableCell>
                    <TableCell className="text-sm">
                      {product?.attributes?.productQuantity}
                    </TableCell>
                    <TableCell className="text-sm">
                      {product?.attributes?.productPrice}
                    </TableCell>
                    <TableCell>
                      <div className="flex">
                        <Link to={`/app/product/${product.id}`}>
                          <Button
                            icon={EyeIcon}
                            className="mr-3"
                            aria-label="Preview"
                          />
                        </Link>
                        <Link to={`/app/edit-product/${product.id}`}>
                          <Button
                            icon={EditIcon}
                            className="mr-3"
                            layout="outline"
                            aria-label="Edit"
                          />
                        </Link>
                        <Button
                          icon={TrashIcon}
                          layout="outline"
                          onClick={() =>
                            openModal(
                              product?.attributes?.productName,
                              product.id
                            )
                          }
                          aria-label="Delete"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter>
              <Pagination
                totalResults={totalResultss}
                resultsPerPage={resultsPerPage}
                label="Table navigation"
                onChange={onPageChange}
              />
            </TableFooter>
          </TableContainer>
        </>
      ) : (
        <>
          {/* Car list */}
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8">
            {datas?.map((product) => (
              <div className="" key={product.id}>
                <Card>
                  <img
                    className="object-cover w-full"
                    src={
                      baseURLImg +
                      product?.attributes?.productImg?.data[0].attributes?.url
                    }
                    alt="product"
                  />
                  <CardBody>
                    <div className=" py-2 text-[#7A7A7A] text-lg font-semibold">
                      <p>
                        {
                          product?.attributes?.benefactors?.data?.attributes
                            ?.benefactorsName
                        }
                      </p>
                    </div>
                    <Link to={`/app/product/${product.id}`}>
                      <div className="mb-3 flex items-center justify-between">
                        <p className="font-semibold truncate text-gray-600 dark:text-gray-300 hover:text-main">
                          {product?.attributes?.productName}
                        </p>
                      </div>
                    </Link>

                    <p className="mb-2 text-red-500 font-bold text-lg">
                      {product?.attributes?.productPrice} BNB
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <Link to={`/app/product/${product.id}`}>
                          <Button
                            icon={EyeIcon}
                            className="mr-3 "
                            aria-label="Preview"
                            size="small"
                          />
                        </Link>
                      </div>
                      <div>
                        <Link to={`/app/edit-product/${product.id}`}>
                          <Button
                            icon={EditIcon}
                            className="mr-3"
                            layout="outline"
                            aria-label="Edit"
                            size="small"
                          />
                        </Link>
                        <Button
                          icon={TrashIcon}
                          layout="outline"
                          aria-label="Delete"
                          onClick={() =>
                            openModal(
                              product?.attributes?.productName,
                              product.id
                            )
                          }
                          size="small"
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>

          <Pagination
            totalResults={totalResultss}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </>
      )}
    </div>
  )
}

export default ProductsAll
