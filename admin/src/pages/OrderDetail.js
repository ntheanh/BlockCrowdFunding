import React from 'react'
import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Context } from '../utils/AppContext'
import { useEffect } from 'react'
import { baseURLImg } from '../utils/utils'
import { FaShop } from 'react-icons/fa6'
import { GrPrevious } from 'react-icons/gr'
import { calculateTotalPrice } from '../utils/helpers'
import { useState } from 'react'
import { FaRegStar } from "react-icons/fa6";

const OrderDetail = () => {
    const { id } = useParams()
    const [total, setTotal] = useState()
    const [nameStatus, setNameStatus] = useState()
    const [statusId, setStatusId] = useState()

    const { orderId, getOrderId, getStatus, status, getUpdateStatus } = useContext(Context)
    const orderDetail = orderId?.data[0]
    const productTotal = orderDetail?.attributes?.products
    const statusdataId = orderDetail?.attributes?.status?.data?.id

    console.log(statusId);

    useEffect(() => {
        setStatusId(statusdataId + 1)
    }, [statusdataId])

    useEffect(() => {
        handleUpdateState()
    }, [statusId, status])

    useEffect(() => {
        setTotal(calculateTotalPrice(productTotal))
    }, [productTotal])

    useEffect(() => {
        getOrderId(id)
        getStatus()
    }, [])

    const handleUpdateState = async () => {
        const id = await Number(statusId)
        const result = await status?.find(item => (item.id === id));
        if (result) {
            const nameWithId = result?.attributes?.statusName;
            setNameStatus(nameWithId)
        } else {
            console.log('Không tìm thấy dữ liệu với id tương ứng');
        }

    }

    const handleClick = async () => {
        await handleUpdateState()
        await getUpdateStatus(id, statusId)
        getOrderId(id)
    }

    console.log(nameStatus);
    return (
        <div>
            <div className='full mb-10'>
                <div className='w-full'>
                    <div className='flex justify-between items-center bg-white p-4 py-6'>
                        <Link to='/app/orders'>
                            <div className='flex items-center text-lg'>
                                <span><GrPrevious className='mr-2' /></span>
                                <h3>Back</h3>
                            </div>
                        </Link>
                        <div className='flex items-center text-lg'>
                            <h3>Order ID: 00{orderDetail?.id}</h3>
                            <span className='text-base font-medium mx-2'>|</span>
                            <h3 className='text-orange-600'>{orderDetail?.attributes?.status?.data?.attributes?.statusName}</h3>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1 mt-4">
                        <div className="border-t-2 border-red-500 flex-1"></div>
                        <div className="border-t-2 border-orange-500 flex-1"></div>
                        <div className="border-t-2 border-yellow-500 flex-1"></div>
                        <div className="border-t-2 border-green-500 flex-1"></div>
                        <div className="border-t-2 border-blue-500 flex-1"></div>
                        <div className="border-t-2 border-indigo-500 flex-1"></div>
                        <div className="border-t-2 border-purple-700 flex-1"></div>
                    </div>

                    <div className='flex justify-between items-center border-b border-gray-300 bg-white'>
                        <div className='flex items-center py-3'>
                            <div className='flex items-center mr-2'>
                                <span className='mx-2'><FaShop className='w-5 h-auto' /></span>
                                <h3 className='text-sm font-medium '>Accessory shop</h3>
                            </div>
                            <span className='text-lg font-medium'>|</span>
                            <div className='flex items-center px-2 py-1'><label className='text-base font-medium '>Order details</label></div>
                        </div>
                    </div>

                    <div className='bg-white mt-0.5'>

                        <div className='p-4 flex'>
                            <div className='w-1/2'>
                                <span className='font-medium py-2 border-b border-orange-600'>Receiving information</span>
                                <div className='mt-4 text-sm'>
                                    <h3>Full name: {orderDetail?.attributes?.userDetail[0]?.username}</h3>
                                    <h3>Phone Number: (+84){orderDetail?.attributes?.userDetail[0]?.phone}</h3>
                                </div>
                            </div>

                            <div className='w-1/2'>
                                <span className='font-medium py-2 border-b border-orange-600'>Delivery Address</span>
                                <div className='mt-4 text-sm'>
                                    <h3>Address: {orderDetail?.attributes?.deliveryAddress}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white p-4 border-t'>

                        <div className=''>
                            {orderDetail?.attributes?.products?.map((product) => (
                                <div className='flex py-2 border-b border-gray-300 items-center'>
                                    <div className='w-1/2 flex'>
                                        <img src={baseURLImg + product?.product?.attributes?.productImg?.data[0].attributes?.url} className='w-20 h-20'></img>

                                        <div>
                                            <h3 className='text-base font-medium'>{product?.product?.attributes?.productName}</h3>
                                            <label className='text-sm'>{product?.product?.attributes?.category?.data?.attributes?.categoryName}</label>
                                            <h3>X {product.quantity}</h3>
                                        </div>
                                    </div>

                                    <div className='w-1/2'>
                                        <h3 className='text-right'>{product?.product?.attributes?.productPrice}.00 USD</h3>
                                    </div>

                                </div>
                            ))

                            }

                        </div>
                    </div>

                    <div className='border-t bg-white text-right'>
                        <div className='text-sm border-b px-4 flex'>
                            <div className='w-2/3 border-r p-3'><h3>Total cost of goods</h3></div>
                            <div className='w-1/3 py-3'><h3>${total}.00</h3></div>
                        </div>
                        <div className='text-sm border-b px-4 flex '>
                            <div className='w-2/3 border-r  p-3'><h3>Transport fee</h3></div>
                            <div className='w-1/3 py-3'><h3>${orderDetail?.attributes?.shipping?.data?.attributes?.shippingPrice}.00</h3></div>
                        </div>
                        <div className='text-sm border-b px-4 flex'>
                            <div className='w-2/3 border-r p-3'><h3>Total amount</h3></div>
                            <div className='w-1/3 py-3 text-lg text-orange-600 font-medium'><h3>${orderDetail?.attributes?.totalPrice}.00</h3></div>
                        </div>
                        <div className='text-sm border-b px-4 flex'>
                            <div className='w-2/3 border-r p-3'><h3>Payment methods</h3></div>
                            <div className='w-1/3 py-3 text-base'><h3>{orderDetail?.attributes?.payment?.data?.attributes?.paymentName}</h3></div>
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        {statusId === 5 ? (
                            <div className='flex items-center justify-between px-12 py-3 border-2 border-green-600 w-1/6 mt-6'>
                                <span><FaRegStar className='w-5 h-auto mr-4 text-green-600' /></span>
                                <label className='text-green-600 font-medium'>Complete</label>
                            </div>
                        ) : (
                            <div className='text-right mt-6' onClick={() => handleClick()}>
                                <label className='px-12 py-3 bg-green-600 text-white text-lg font-medium'>{nameStatus}</label>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OrderDetail