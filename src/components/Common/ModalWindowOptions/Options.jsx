import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbEditCircle } from "react-icons/tb";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdClose } from "react-icons/md";

import {
    OptionsList,
    OptionsContainer,
    OptionsMainContainer,
    OptionsItem,
    OptionLabel,
    OptionsClose,
} from "./OptionsElements";
import "./Options.css";

const Options = ({ onDelete, onEdit }) => {
    const [isOpen, setIsOpen] = useState(false);
    const modalWindow = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalWindow.current && !modalWindow.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalWindow]);
    const handleClickEvent = (e, option) => {
        e.stopPropagation();
        e.preventDefault();
        setIsOpen(option);
    };

    return (
        <OptionsMainContainer ref={modalWindow} $isOpen={isOpen} onClick={(e) => handleClickEvent(e, true)}>
            <BsThreeDotsVertical />
            {isOpen && (
                <OptionsContainer>
                    <OptionsClose onClick={(e) => handleClickEvent(e, false)}>
                        <MdClose className="icon icon-close" size="18px" title="Close" />
                    </OptionsClose>
                    <OptionsList>
                        <OptionsItem onClick={onEdit}>
                            <OptionLabel>Edit</OptionLabel>
                            <button>
                                <TbEditCircle className="icon icon-edit" size="18px" title="Edit" />
                            </button>
                        </OptionsItem>
                        <OptionsItem onClick={onDelete}>
                            <OptionLabel>Delete</OptionLabel>
                            <button>
                                <AiTwotoneDelete className="icon icon-delete" size="18px" title="Delete" />
                            </button>
                        </OptionsItem>
                    </OptionsList>
                </OptionsContainer>
            )}
        </OptionsMainContainer>
    );
};
export default Options;
