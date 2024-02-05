import React from "react";

import { Option, Select } from "./BlogsElements";

const BlogFilter = ({ selectedBlogs, handleSelectedBlogs }) => {
    return (
        <div className="flex clex-col w-full justify-end align-center ">
            <p className="mt-1.5 mr-1">Filter</p>
            <Select value={selectedBlogs} onChange={handleSelectedBlogs}>
                <Option value="all"> All </Option>
                <Option value="following"> Following </Option>
            </Select>
        </div>
    );
};

export default BlogFilter;
