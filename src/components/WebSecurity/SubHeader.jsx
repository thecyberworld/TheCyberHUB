// In SubHeader.js
import React from "react";
import {
    Nav,
    Ul,
    Li,
    NavLink,
    DropdownContainer,
    DropdownTitle,
    DropdownUl,
    DropdownLi,
    DropdownLink,
} from "./Common/SubHeaderElements"; // Make sure to provide the correct path

const SubHeader = (props) => {
    const { subHeaderData } = props;

    return (
        <Nav>
            <Ul>
                <Li>
                    <NavLink
                        to={"./"}
                        style={{
                            color: "#FF6B08",
                            fontWeight: "bold",
                            fontSize: "20px",
                            marginRight: "20px",
                        }}
                    >
                        {" "}
                        {props.heading}{" "}
                    </NavLink>
                </Li>
            </Ul>
            <Ul>
                {!props?.onlyCat
                    ? subHeaderData.map((item) => (
                          <Li key={item.id}>
                              {item.isDropdown ? (
                                  <DropdownContainer>
                                      <DropdownTitle>{item.title}</DropdownTitle>
                                      <DropdownUl>
                                          {item.dropdownOptions.map((subItem) => (
                                              <DropdownLi key={subItem.id}>
                                                  <DropdownLink to={`#${subItem.link}`}>{subItem.title}</DropdownLink>
                                              </DropdownLi>
                                          ))}
                                      </DropdownUl>
                                  </DropdownContainer>
                              ) : (
                                  <NavLink to={item.link}>{item.title}</NavLink>
                              )}
                          </Li>
                      ))
                    : subHeaderData.map((item, index) => (
                          <NavLink to={item.category} key={index}>
                              {item.category}
                          </NavLink>
                      ))}
            </Ul>
            <span></span>
        </Nav>
    );
};

export default SubHeader;
