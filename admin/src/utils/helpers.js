export const dataChart = (orders) => {
    const ordersByCategory = {};
    const resp = orders?.forEach((order) => {
        console.log(order);
        const test = order?.attributes.products?.forEach((product) => {
            console.log(product)
            const category = product?.product?.attributes?.category?.data
            console.log(category);
            const { categoryName } = category?.attributes;
            if (!ordersByCategory[categoryName]) {
                ordersByCategory[categoryName] = 0;
            }
            ordersByCategory[categoryName] += product.quantity;
        });
    });

    const resultObject = {
        data: Object.values(ordersByCategory),
        label: Object.keys(ordersByCategory),
    };

    const data = {
        datasets: [
            {
                data: resultObject.data,
                /**
                 * These colors come from Tailwind CSS palette
                 * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
                 */
                backgroundColor: ["#0694a2", "#1c64f2", "#7e3af2"],
                label: "Dataset 1",
            },
        ],
        labels: resultObject.label,
    }

    const legends = [
        { title: Object.values(ordersByCategory), color: 'bg-teal-600' }
    ]

    const res = { data, legends }

    return res
}

export const calculateTotalPrice = (productPayment) => {
    return productPayment?.reduce((acc, item) => {
        return acc + item?.product?.attributes?.productPrice * item?.quantity;
    }, 0);
};