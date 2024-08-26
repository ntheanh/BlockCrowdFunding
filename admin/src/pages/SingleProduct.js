import React, { useContext, useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import Icon from "../components/Icon"
import PageTitle from "../components/Typography/PageTitle"
import { EditIcon, HomeIcon, TrashIcon } from "../icons"
import response from "../utils/demo/productData"
import { Card, CardBody, Badge, Button, Avatar } from "@windmill/react-ui"
import { genRating } from "../utils/genarateRating"
import { Context } from "../utils/AppContext"
import { baseURLImg } from "../utils/utils"

const SingleProduct = () => {
  const { id } = useParams()
  const [activeComponent, setActiveComponent] = useState(1)

  const { getProductId, productId } = useContext(Context)

  // change view component
  const [tabView, setTabView] = useState("reviews")
  const handleTabView = (viewName) => setTabView(viewName)

  const handleActiveComponent = (number) => {
    setActiveComponent(number)
  }
  //   get product
  let product = response.filter((product) => product.id == id)[0]

  useEffect(() => {
    getProductId(id)
  }, [id])

  console.log("productId", productId)

  return (
    <div>
      <PageTitle>Product Details</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
      </div>

      <Card className="my-8 shadow-md">
        <CardBody>
          <div className="grid grid-col items-center md:grid-cols-2 lg:grid-cols-2">
            <div>
              <img
                src={
                  baseURLImg +
                  productId[0]?.attributes?.productImg?.data[0].attributes?.url
                }
                alt=""
                className="w-9/12 rounded-lg"
              />
            </div>

            <div className="mx-8 pt-5 md:pt-0">
              <h1 className="text-3xl mb-4 font-semibold text-gray-700 dark:text-gray-200">
                {productId[0]?.attributes?.productName}
              </h1>
              <p className="font-semibold text-lg ">
                {
                  productId[0]?.attributes?.benefactors?.data?.attributes
                    ?.benefactorsName
                }
              </p>
              <h4 className="mt-4 text-red-500 text-2xl font-semibold">
                {productId[0]?.attributes?.productPrice} BNB
              </h4>
              <div className="flex gap-6 justify-end mt-6">
                <Button
                  icon={EditIcon}
                  className="mr-3"
                  layout="outline"
                  aria-label="Edit"
                />
                <Button icon={TrashIcon} layout="outline" aria-label="Delete" />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="my-8 shadow-md">
        <CardBody>
          <div className="flex items-center">
            <Button
              className="mx-5"
              layout="link"
              onClick={() => handleTabView("reviews")}
            >
              Nội dung
            </Button>
            <Button layout="link" onClick={() => handleTabView("description")}>
              Danh sách ủng hộ
            </Button>
          </div>

          <hr className="mx-3 my-2 customeDivider" />

          <div className="mx-3 mt-4">
            {tabView === "reviews" ? (
              <>
                <div className="mt-4">
                  {" "}
                  <p className="mb-2 text-sm text-gray-800 dark:text-gray-300">
                    {productId[0]?.attributes?.productDesc}
                  </p>
                </div>
              </>
            ) : tabView === "description" ? (
              <>
                <div className="px-3">
                  <p className="text-sm text-gray-800 dark:text-gray-300">
                    {product.londDescription}
                  </p>
                </div>
              </>
            ) : tabView === "faq" ? (
              <>faq</>
            ) : (
              <></>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default SingleProduct
