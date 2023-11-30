import React from "react";
import { SearchBox, SearchIcon, SearchInput } from "./SearchInputBoxElements";

const SearchInputBox = ({ placeholder, value, onChange }) => {
    return (
        <SearchBox>
            <SearchIcon />
            <SearchInput type="text" placeholder={placeholder} value={value} onChange={onChange} />
        </SearchBox>
    );
};

export default SearchInputBox;
