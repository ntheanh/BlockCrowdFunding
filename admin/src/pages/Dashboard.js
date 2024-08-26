import React, { useContext, useEffect } from "react"

import InfoCard from "../components/Cards/InfoCard"
import ChartCard from "../components/Chart/ChartCard"
import { Bar, Doughnut, Line } from "react-chartjs-2"
import ChartLegend from "../components/Chart/ChartLegend"
import PageTitle from "../components/Typography/PageTitle"
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "../icons"
import RoundIcon from "../components/RoundIcon"
import {
  lineOptions,
  lineLegends,
  realTimeUsersBarLegends,
  realTimeUsersBarOptions
} from "../utils/demo/chartsData"

import { Context } from "../utils/AppContext"
import { useState } from "react"

function Dashboard() {
  const {
    customers,
    getCustomers,
    products,
    getAllProduct,
    brands,
    getAllBrands,
    collections,
    getAllCollection
  } = useContext(Context)
  const [data, setData] = useState()
  const legend = data?.legends
  console.log(legend)

  useEffect(() => {
    getCustomers()
    getAllProduct()
    getAllBrands()
    getAllCollection()
  }, [])

  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      {/* <CTA /> */}
      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total Customers" value={customers?.length}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="Total Projects" value={products?.length}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Benefactors" value={brands?.length}>
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Collection" value={collections?.length}>
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>{" "}
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="User Analytics">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>

        <ChartCard title="Online Visitors">
          <Bar {...realTimeUsersBarOptions} />
          <ChartLegend legends={realTimeUsersBarLegends} />
        </ChartCard>
      </div>
    </>
  )
}

export default Dashboard
