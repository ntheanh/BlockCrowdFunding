import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../components/Icon";
import PageTitle from "../components/Typography/PageTitle";
import { FaCamera } from "react-icons/fa6";
import { HomeIcon, AddIcon, PublishIcon, StoreIcon } from "../icons";
import { RiArrowDropDownLine } from "react-icons/ri";
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
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const FormTitle = ({ children }) => {
    return (
        <h2 className="mb-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
            {children}
        </h2>
    );
};

const AddCategory = () => {
    const { handleNewCategory, getAllCategories, categories } = useContext(Context)
    const [show, setShow] = useState(false)
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [updatesData, setUpdatesData] = useState({
        categoryName: '',
        categoryDesc: '',
    });

    useEffect(() => {
        getAllCategories()
    }, [])

    console.log(categories);

    const updateEdit = (e) => {
        const newupdate = { ...updatesData };
        newupdate[e.target.id] = e.target.value;
        setUpdatesData(newupdate);
        console.log(newupdate);
    };

    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    };


    const handleAddCategory = async () => {
        await handleNewCategory(image, updatesData)
        await getAllCategories()
    }
    return (
        <div>
            <PageTitle>Add New Category</PageTitle>

            {/* Breadcum */}
            <div className="flex text-gray-800 dark:text-gray-300">
                <div className="flex items-center text-purple-600">
                    <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
                    <NavLink exact to="/app/dashboard" className="mx-2">
                        Dashboard
                    </NavLink>
                </div>
                {">"}
                <p className="mx-2">Add new Category</p>
            </div>

            <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-3 ">
                <Card className="row-span-2 md:col-span-2">
                    <CardBody>
                        <div class="form form-media mb-3">
                            <h4 class=" font-semibold">Media</h4>
                            <div class="media flex justify-center mt-3">
                                <div class="media-input w-1/2 relative inline-block mr-3">
                                    <input type="file" class='input-img opacity-0 absolute z-[-1]' id='file-input' onChange={handleFileChange} />
                                    <label for="file-input" class='icon-camera border-2 border-dashed border-main-color rounded-md text-main-color cursor-pointer font-medium leading-6 py-3 px-6 transition duration-300 ease-in-out h-40 flex justify-center items-center'>
                                        <span class='icon block w-7 h-7'>
                                            <FaCamera />
                                        </span>
                                    </label>
                                </div>

                                <div class="media-img w-1/2 ml-3">
                                    {imageUrl && <img src={imageUrl} alt="Selected Image" class="w-auto h-40" />}
                                </div>
                            </div>
                        </div>

                        <FormTitle>Category Name</FormTitle>
                        <Label>
                            <Input className="mb-4 capitalize" placeholder="Type product name here"
                                onChange={(e) => updateEdit(e)}
                                id="categoryName"
                                value={updatesData.categoryName} />
                        </Label>

                        <FormTitle>Description</FormTitle>
                        <Label>
                            <Textarea
                                className="mb-4"
                                rows="5"
                                placeholder="Enter product description here"
                                onChange={(e) => updateEdit(e)}
                                id="categoryDesc"
                                value={updatesData.categoryDesc}
                            />
                        </Label>

                        <div className="w-full" onClick={() => handleAddCategory()}>
                            <Button size="large" iconLeft={AddIcon}>
                                Add Category
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

                        <Label className="mt-4">
                            <FormTitle>PARENT CATEGORY</FormTitle>
                            <Link onClick={() => setShow(!show)}><div className="flex items-center font-medium"><h3 className="mr-6">{1 ? "Hide category" : "Select category"}</h3> <span><RiArrowDropDownLine className="w-8 h-auto" /></span></div></Link>
                            {show && (
                                <div>
                                    <ul>
                                        {categories?.map((category) => (
                                            <li key={category.id} className="my-2">{category?.attributes?.categoryName}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        </Label>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default AddCategory