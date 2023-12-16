import React, { useRef, useState } from "react";
import { SearchBox, SearchIcon, SearchInput } from "./SearchInputBoxElements";

const SearchInputBox = ({ placeholder, value, onChange }) => {
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
        inputRef.current.focus();
    };
    const handleFocusOut = () => {
        setIsFocused(false);
        inputRef.current.blur();
    };
    return (
        <SearchBox>
            <SearchIcon onClick={handleFocus} />
            <SearchInput
                onClick={handleFocus}
                onBlur={handleFocusOut}
                type="text"
                placeholder={isFocused ? "" : placeholder}
                value={value}
                onChange={onChange}
                ref={inputRef}
            />
        </SearchBox>
    );
};

export default SearchInputBox;
