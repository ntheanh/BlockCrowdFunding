import React, { useState, useEffect, useContext } from "react"
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination
} from "@windmill/react-ui"
import response from "../utils/demo/ordersData"
import { Context } from "../utils/AppContext"
import { baseURLImg } from "../utils/utils"
import { IoEyeOutline } from "react-icons/io5"
import { Link } from "react-router-dom"

const OrdersTable = ({ resultsPerPage, filter }) => {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  const { orders, getOrder } = useContext(Context)

  // pagination setup
  const totalResults = orders?.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  useEffect(() => {
    getOrder()
  }, [])

  useEffect(() => {
    // If Filters Applied
    if (filter === "paid") {
      setData(
        response
          .filter((order) => order.status === "Paid")
          .slice((page - 1) * resultsPerPage, page * resultsPerPage)
      )
    }
    if (filter === "un-paid") {
      setData(
        response
          .filter((order) => order.status === "Un-paid")
          .slice((page - 1) * resultsPerPage, page * resultsPerPage)
      )
    }
    if (filter === "completed") {
      setData(
        response
          .filter((order) => order.status === "Completed")
          .slice((page - 1) * resultsPerPage, page * resultsPerPage)
      )
    }

    // if filters dosent applied
    if (filter === "all" || !filter) {
      setData(
        response.slice((page - 1) * resultsPerPage, page * resultsPerPage)
      )
    }
  }, [page, resultsPerPage, filter])

  return (
    <div>
      {/* Table */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>ACtion</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {orders?.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      src={
                        baseURLImg +
                        user?.attributes?.userDetail[0]?.avatar[0]?.url
                      }
                      alt="User image"
                    />
                    <div>
                      <p className="font-semibold">
                        {user?.attributes?.userDetail[0]?.username}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">#00{user?.id}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    $ {user?.attributes?.totalPrice}.00
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    type={
                      user.status === "Un-paid"
                        ? "danger"
                        : user.status === "Paid"
                        ? "success"
                        : user.status === "Completed"
                        ? "warning"
                        : "neutral"
                    }
                  >
                    {user?.attributes?.status?.data?.attributes?.statusName}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(user?.attributes?.createdAt).toLocaleDateString()}
                  </span>
                </TableCell>

                <TableCell>
                  <Link to={`order/${user.id}`}>
                    <button>
                      <span className="text-sm flex items-center">
                        <IoEyeOutline className="mr-2 w-5 h-auto text-yellow-400" />
                        <h3>Order Detail</h3>
                      </span>
                    </button>
                  </Link>
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
    </div>
  )
}

export default OrdersTable
