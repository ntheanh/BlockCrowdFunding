import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../components/Icon";
import PageTitle from "../components/Typography/PageTitle";
import { FaCamera } from "react-icons/fa6";
import { HomeIcon, AddIcon, PublishIcon, StoreIcon } from "../icons";
import {
    Card,
    CardBody,
    Label,
    Input,
    Textarea,
    Button,
    Select,
} from "@windmill/react-ui";
import { Context } from "../utils/AppContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { baseURLImg } from "../utils/utils";

const FormTitle = ({ children }) => {
    return (
        <h2 className="mb-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
            {children}
        </h2>
    );
};

const EditProduct = () => {
    const { id } = useParams();

    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const { getAllCategories, categories, getAllBrands, brands, getAllCollection, collections, getProductId, productId, handleEditProduct } = useContext(Context);
    const [updatesData, setUpdatesData] = useState({
        productName: '',
        productDesc: '',
        productPrice: null,
        productQuantity: null,
        productDiameter: null,
    });
    const [inputCategory, setInputCategory] = useState(null)
    const [inputBrand, setInputBrand] = useState(null)
    const [inputCollection, setInputCollection] = useState(null)

    useEffect(() => {
        getAllCategories()
        getAllBrands()
        getAllCollection()
        getProductId(id)
    }, [])

    useEffect(() => {
        setUpdatesData(productId[0]?.attributes)
        setInputCollection(productId[0]?.attributes?.collection?.data?.id)
        setInputCategory(productId[0]?.attributes.category.data?.id)
    }, [productId])

    const updateEdit = (e) => {
        const newupdate = { ...updatesData };
        newupdate[e.target.id] = e.target.value;
        setUpdatesData(newupdate);
        console.log(newupdate);
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    };

    const handleEdit = async () => {
        await handleEditProduct(id, image, imageUrl, updatesData, inputCategory, inputBrand, inputCollection)
        await getProductId()
    }

    return (
        <div>
            <PageTitle>Edit Product</PageTitle>

            {/* Breadcum */}
            <div className="flex text-gray-800 dark:text-gray-300">
                <div className="flex items-center text-purple-600">
                    <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
                    <NavLink exact to="/app/dashboard" className="mx-2">
                        Dashboard
                    </NavLink>
                </div>
                {">"}
                <p className="mx-2">Edit Product</p>
            </div>

            <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-3 ">
                <Card className="row-span-2 md:col-span-2">
                    <CardBody>

                        {updatesData?.productName && (
                            <div className="border-2 border-dashed rounded-lg p-3 h-48 mb-3 flex items-center">
                                <div className="w-1/3 h-full flex justify-center">
                                    {imageUrl ? (
                                        <img src={imageUrl} className="w-auto h-full"></img>
                                    ) : (
                                        <img src={`${baseURLImg + updatesData?.productImg?.data[0]?.attributes?.url}`} alt="Product Image" className="w-auto h-full" />
                                    )}

                                </div>

                                <div className="w-2/3 font-medium py-3">
                                    <label>
                                        <span className="capitalize">Product name: {updatesData.productName}</span>
                                    </label>
                                    <div className="flex my-3">
                                        <label className="w-1/2"><span>Price: {updatesData.productPrice}</span></label>
                                        <label className="w-1/2"><span>Quantity: {updatesData.productQuantity}</span></label>
                                    </div>
                                    <label>
                                        <span>Description: {updatesData.productDesc.slice(0, 40)} ...</span>
                                    </label>
                                    <div className="flex my-3">
                                        <label className="w-1/2"><span>Diameter: {updatesData.productDiameter} .mm</span></label>
                                        <label className="w-1/2"><span>Category: {inputCategory}</span></label>
                                    </div>
                                    <div className="flex my-3">
                                        <label className="w-1/2"><span>Benefactors: {inputBrand}</span></label>
                                        <label className="w-1/2"><span>Collection: {inputCollection}</span></label>
                                    </div>
                                </div>
                            </div>
                        )}

                        <FormTitle>Product Name</FormTitle>
                        <Label>
                            <Input className="mb-4 capitalize" placeholder="Type product name here"
                                onChange={(e) => updateEdit(e)}
                                id="productName"
                                value={updatesData?.productName} />
                        </Label>

                        <FormTitle>Product Price</FormTitle>
                        <Label>
                            <Input className="mb-4" placeholder="Enter product price here" type="number"
                                onChange={(e) => updateEdit(e)}
                                id="productPrice"
                                value={updatesData?.productPrice}
                            />
                        </Label>

                        <FormTitle>Stock Quantity</FormTitle>
                        <Label>
                            <Input
                                className="mb-4"
                                placeholder="Enter product stock quantity"
                                onChange={(e) => updateEdit(e)}
                                id="productQuantity"
                                value={updatesData?.productQuantity}
                                type="number"
                            />
                        </Label>

                        <FormTitle>Description</FormTitle>
                        <Label>
                            <Textarea
                                className="mb-4"
                                rows="5"
                                placeholder="Enter product description here"
                                onChange={(e) => updateEdit(e)}
                                id="productDesc"
                                value={updatesData?.productDesc}
                            />
                        </Label>

                        <div className="w-full" onClick={() => handleEdit()}>
                            <Button size="large" iconLeft={AddIcon}>
                                Add Product
                            </Button>
                        </div>
                    </CardBody>
                </Card>

                <Card className="h-full">
                    <CardBody>
                        <div className="flex mb-8">
                            <Button layout="primary" className="mr-3" iconLeft={PublishIcon}>
                                Publish
                            </Button>
                            <Button layout="link" iconLeft={StoreIcon}>
                                Save as Draft
                            </Button>
                        </div>

                        <div class="form form-media mb-3">
                            <h4 class=" font-semibold">Media</h4>
                            <div class="media flex justify-center ">
                                <div class="media-input w-1/2 relative inline-block mr-3">
                                    <input type="file" class='input-img opacity-0 absolute z-[-1]' id='file-input' onChange={handleFileChange} />
                                    <label for="file-input" class='icon-camera border-2 border-dashed border-main-color rounded-md text-main-color cursor-pointer font-medium leading-6 py-3 px-6 transition duration-300 ease-in-out h-24 flex justify-center items-center'>
                                        <span class='icon block w-7 h-7'>
                                            <FaCamera />
                                        </span>
                                    </label>
                                </div>

                                <div class="media-img w-1/2 ml-3">

                                    {imageUrl ? (
                                        <img src={imageUrl} alt="Selected Image" class="w-auto h-24" />
                                    ) : (
                                        <img src={`${baseURLImg + updatesData?.productImg?.data[0]?.attributes?.url}`} alt="Product Image" class="w-auto h-24" />
                                    )}
                                </div>
                            </div>
                        </div>
                        <FormTitle>Diameter</FormTitle>
                        <Label>
                            <Input
                                className="mb-4"
                                placeholder="Enter product diameter here"
                                onChange={(e) => updateEdit(e)}
                                id="productDiameter"
                                value={updatesData?.productDiameter}
                            />
                        </Label>
                        <Label className="mt-4 border-b pb-6 border-gray-500">
                            <FormTitle>Select Product Category</FormTitle>
                            <Select className="mt-1"
                                name="categories"
                                value={categories?.id}
                                onChange={(e) => setInputCategory(Number(e.target.value))}
                            >
                                <option>Select category</option>
                                {categories?.map((category) => (
                                    <option key={category.id} value={category?.id} selected={category.id === inputCategory}>{category?.attributes?.categoryName}</option>
                                ))}
                            </Select>
                        </Label>

                        <Label className="mt-4 border-b pb-6 border-gray-500">
                            <FormTitle>Select Product Benefactors</FormTitle>
                            <Select className="mt-1"
                                name="brands"
                                value={brands?.id}
                                onChange={(e) => setInputBrand(Number(e.target.value))}>
                                <option>Select brand</option>
                                {brands?.map((brand) => (
                                    <option key={brand.id} value={brand?.id} selected={brand.id === inputBrand}>{brand.attributes.benefactorsName}</option>
                                ))}
                            </Select>
                        </Label>

                        <Label className="mt-4">
                            <FormTitle>Select Product Collection</FormTitle>
                            <Select className="mt-1"
                                name="collections"
                                value={collections?.id}
                                onChange={(e) => setInputCollection(Number(e.target.value))}
                            >
                                <option>Select collection</option>
                                {collections?.map((collection) => (
                                    <option key={collection.id} value={collection?.id} selected={collection.id === inputCollection}>{collection.attributes.collectionName}</option>
                                ))}
                            </Select>
                        </Label>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default EditProduct