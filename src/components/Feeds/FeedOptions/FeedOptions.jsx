import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbEditCircle } from "react-icons/tb";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdClose } from "react-icons/md";

import {
    FeedOptionsList,
    FeedOptionsContainer,
    FeedOptionsMainContainer,
    FeedOptionsItem,
    OptionLabel,
    OptionButton,
    FeedOptionsClose,
} from "./FeedOptionsElements";
import "./Feed.css";

const FeedOptions = () => {
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

    const handleDeleteFeed = () => {};
    const handleEditFeed = () => {};
    return (
        <FeedOptionsMainContainer ref={modalWindow} isOpen={isOpen} onClick={(e) => handleClickEvent(e, true)}>
            <BsThreeDotsVertical />
            {isOpen && (
                <FeedOptionsContainer>
                    <FeedOptionsClose onClick={(e) => handleClickEvent(e, false)}>
                        <MdClose className="icon icon-close" size="18px" title="Close" />
                    </FeedOptionsClose>
                    <FeedOptionsList>
                        <FeedOptionsItem>
                            <OptionLabel>Edit</OptionLabel>
                            <OptionButton>
                                <TbEditCircle
                                    className="icon icon-edit"
                                    size="18px"
                                    title="Edit"
                                    onClick={handleEditFeed}
                                />
                            </OptionButton>
                        </FeedOptionsItem>
                        <FeedOptionsItem>
                            <OptionLabel>Delete</OptionLabel>
                            <OptionButton>
                                <AiTwotoneDelete
                                    className="icon icon-delete"
                                    size="18px"
                                    title="Delete"
                                    onClick={handleDeleteFeed}
                                />
                            </OptionButton>
                        </FeedOptionsItem>
                    </FeedOptionsList>
                </FeedOptionsContainer>
            )}
        </FeedOptionsMainContainer>
    );
};
export default FeedOptions;
