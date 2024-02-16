import React, { useRef, useState } from "react";
import { SearchBox, SearchIcon, SearchInput, CancelIcon } from "./SearchInputBoxElements";

const SearchInputBox = ({ placeholder, value, onChange, setValue }) => {
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
    const clearValue = () => {
        setValue("");
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
            {value && <CancelIcon aria-label="toggle password visibility" onClick={clearValue} />}
        </SearchBox>
    );
};

export default SearchInputBox;
