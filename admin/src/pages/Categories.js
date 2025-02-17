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
import { baseURL, baseURLImg, config } from "../utils/utils"
import axios from "axios"

const Categories = () => {
  const { getAllCategories, categories, handleDeleCategory } =
    useContext(Context)

  // Table and grid data handlling
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [id, setId] = useState()

  // pagination setup
  const [resultsPerPage, setResultsPerPage] = useState(5)
  const totalResults = categories?.length
  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}categories?populate=*`,
          config
        )
        console.log("Response Data:", response.data.data) // Log response data
        setData(response.data.data)
      } catch (error) {
        console.error("Error fetching data:", error)
        // handle error state if needed
      }
    }

    fetchData()
  }, [])

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(
      categories?.slice((page - 1) * resultsPerPage, page * resultsPerPage)
    )
  }, [page, resultsPerPage, categories])

  // Delete action model
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(null)
  async function openModal(productId) {
    let product = await data?.filter((product) => product.id === productId)[0]
    // console.log(product);
    setSelectedDeleteProduct(product)
    setIsModalOpen(true)
    setId(productId)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  const handleDelete = async () => {
    await handleDeleCategory(id)
    await setIsModalOpen(false)
    await getAllCategories()
  }

  return (
    <div>
      <PageTitle>All Category</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">All Category</p>
      </div>

      {/* Sort */}
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All Category
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
                    Results on list
                  </div>
                </div>
              </Label>
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
          Make sure you want to delete product{" "}
          {selectedDeleteProduct && `"${selectedDeleteProduct.name}"`}
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
          <div className="hidden sm:block" onClick={() => handleDelete()}>
            <Button>Delete</Button>
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
      <>
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Name</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Action</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {data?.map((category) => (
                <TableRow key={category?.id}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Avatar
                        className="hidden mr-4 md:block"
                        src={
                          category?.attributes?.categoryImg?.data &&
                          category?.attributes?.categoryImg?.data[0]?.attributes
                            ?.url
                            ? baseURLImg +
                              category.attributes.categoryImg.data[0].attributes
                                .url
                            : "default-image-url" // replace with your default image URL
                        }
                        alt="Product image"
                      />
                      <div>
                        <p className="font-semibold">
                          {category?.attributes?.categoryName}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge type={100 > 0 ? "success" : "danger"}>
                      {100 > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-sm">
                    {category?.attributes?.categoryDesc
                      ? `${category.attributes.categoryDesc.slice(
                          0,
                          60
                        )}...${category.attributes.categoryDesc.slice(-10)}`
                      : "No description available"}
                  </TableCell>
                  <TableCell>
                    <div className="flex">
                      <Link to={`/app/edit-category/${category?.id}`}>
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
                        onClick={() => openModal(category?.id)}
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
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              label="Table navigation"
              onChange={onPageChange}
            />
          </TableFooter>
        </TableContainer>
      </>
    </div>
  )
}

export default Categories
