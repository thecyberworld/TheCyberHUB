import React from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { Section } from "../Resources/WriteUps/WriteUpsElements";
import image from "./img.webp";
import "./Osp.css";

import Osp from "./OspData";
import {encodeURL} from "./util";

const ViewOsp = (props) => {
  const {title} = useParams();
  let searchedOsp = Osp.find(
    (Osp) => encodeURL(Osp.title).toLowerCase() === title.toLowerCase()
  );
  return (
    <Section>
      <div className="viewOsp">
        <h1>{searchedOsp.title}</h1>
        <h3>
          {searchedOsp.author} | {searchedOsp.date}
        </h3>
        <p>{searchedOsp.content}</p>
      </div>
      <div className="tags">
        {searchedOsp.tags.map((tag, index) => (
          <div className="tag" key={index}>
            {tag}
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ViewOsp;
