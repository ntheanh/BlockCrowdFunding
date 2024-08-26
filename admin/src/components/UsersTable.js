import React, { useState, useEffect } from "react"
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
  Pagination,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label
} from "@windmill/react-ui"
import response from "../utils/demo/usersData"
import { useContext } from "react"
import { Context } from "../utils/AppContext"
import { baseURLImg } from "../utils/utils"

const UsersTable = ({ resultsPerPage, filter }) => {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [role, setRole] = useState()
  const [userName, setUsername] = useState()
  const [phone, setPhone] = useState()
  const [password, setPassword] = useState()
  const [email, setEmail] = useState()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const {
    customers,
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
  } = useContext(Context)

  const totalResults = customers?.length

  useEffect(() => {
    getCustomers()
  }, [])
  useEffect(() => {
    setData(
      customers?.slice((page - 1) * resultsPerPage, page * resultsPerPage)
    )
  }, [page, resultsPerPage, filter, customers])

  function onPageChange(p) {
    setPage(p)
  }

  function openModal(user = null) {
    setCurrentUser(user)
    setIsModalOpen(true)
  }

  function closeModal() {
    setCurrentUser(null)
    setIsModalOpen(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    // const userData = Object.fromEntries(formData)
    const userData = {
      username: userName,
      password: password,
      phone: phone,
      email: email,
      role: role
    }
    await createCustomer(userData)
    console.log("userData", userData)
    setIsModalOpen(false)
  }

  async function handleUpdate(e) {
    e.preventDefault()

    // const userData = Object.fromEntries(formData)
    const userData = {
      username: userName,
      password: password,
      phone: phone,
      email: email,
      role: role
    }
    await createCustomer(userData)
    console.log("userData", userData)
    setIsModalOpen(false)
  }

  async function handleDelete(userId) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteCustomer(userId)
      getCustomers()
    }
  }

  console.log(customers)
  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(
      customers?.slice((page - 1) * resultsPerPage, page * resultsPerPage)
    )
  }, [page, resultsPerPage, filter])

  return (
    <div>
      <Button onClick={() => openModal()} className="mb-4">
        Add New User
      </Button>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Full Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Joined on</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {customers?.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      src={
                        user?.avatar && user.avatar[0]?.url
                          ? baseURLImg + user.avatar[0].url
                          : "default-image-url" // replace with your default image URL
                      }
                      alt="User image"
                    />
                    <div>
                      <p className="font-semibold">{user.username}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.phone}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.email}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => openModal(user)}
                    size="small"
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(user.id)}
                    size="small"
                    layout="danger"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={customers?.length}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={currentUser ? handleUpdate : handleSubmit}>
          <ModalHeader>
            {currentUser ? "Edit User" : "Add New User"}
          </ModalHeader>
          <ModalBody>
            <Label>
              <span>Username</span>
              <Input
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                defaultValue={currentUser?.username}
              />
            </Label>
            <Label className="mt-4">
              <span>Email</span>
              <Input
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={currentUser?.email}
              />
            </Label>
            <Label className="mt-4">
              <span>Phone</span>
              <Input
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                defaultValue={currentUser?.phone}
              />
            </Label>
            <Label className="mt-4">
              <span>Password</span>
              <Input
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                defaultValue={currentUser?.password}
              />
            </Label>
            <Label className="mt-4">
              <select
                onChange={(e) => setRole(e.target.value)}
                name=""
                id="role"
                defaultValue={currentUser?.role.name}
              >
                <option value="4">Admin</option>
                <option value="2">User</option>
              </select>
            </Label>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" className="mr-2">
              {currentUser ? "Update" : "Create"}
            </Button>
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  )
}

export default UsersTable
