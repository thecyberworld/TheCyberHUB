import React, {useState} from 'react';
import styled from "styled-components";
import SideDropdown from './SideDropdown';
import { Link } from 'react-router-dom';

export default function Dropdown() {
  const menu = [
    {title: "Roadmap", url: "/resources/roadmapResources" },
    {title: "Prep", url: ""},
    {title: "Events", url:"/resources/events" },
    {title: "Blogs", url: "/resources/blogs"},
    {title: "News", url: "/resources/cyberNews"},
  ]

  const [sideDrop, setSideDrop] = useState(false);

  const sideDropHandler = (title)=> {
     title == 'Prep' ? setSideDrop(true) : setSideDrop(false);
  }

  const Item = styled.ul`
    height: 32px; 
    position: relative;
    &:hover {
      cursor : pointer;
    }
  `

  return (
    <div style={{width :130, padding: 6, border:'1px solid green', color:'white', position: 'absolute', top: 80, }}>
        <li>
            {
                menu.map(i => (
                  <Item onMouseEnter={() => sideDropHandler(i.title)}>
                    <Link style={{textDecoration: 'none', color:'white' }} to={i.url}> {i.title} </Link >
                    {i.title == 'Prep' && sideDrop && <SideDropdown />}
                  </Item>
                ))
            }
        </li>
    </div>
  )
}
