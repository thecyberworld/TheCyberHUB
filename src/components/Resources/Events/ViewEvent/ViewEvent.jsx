import React from 'react'
import { useParams } from 'react-router';
import styled from 'styled-components';
import CTFData from '../../../CyberGames/CTF/CTFData';
import { encodeURL } from '../../../Learn/Blogs/util';
import { Section } from '../../WriteUps/WriteUpsElements';
import EventsData from '../EventsData/EventsData';

const ViewEventComponent = styled.div`
    display: flex;
    flex-direction: column;
    max-width:800px;
    margin: 0 auto;
    padding-top: 0;
    align-items: center;
    justify-content: space-between;
    font-family: "Montserrat", sans-serif;

    * {
        margin: 10px 0;
    }

    p {
        text-align: left;
        padding: 0 50px;
        white-space: pre-line;
        font-size: 20px;
    }

    img {
        margin-top: 0;
        width:100%;
        object-fit:contain;
    }
    & .imageVenueWrapper{
        min-height:200px;
        height:fit-content;
        position:relative;
        width:100%;
        & .venue{
            position:absolute;
            padding:8px 20px;
            background-color:#eeeeee;
            color:#333333;
            right:0;
            bottom:0;
            white-space:nowrap;
        }
    }
`;

const ViewEvent = () => {
  const {slug} = useParams();
  const event = [...EventsData, ...CTFData].find((event)=>encodeURL(event.title)===slug)

  return (
    <Section>
        <ViewEventComponent>
            <div className='imageVenueWrapper'>
                <img onError={()=>alert("Image Error")} className="viewImg" src={event.image} alt={event.title} />
                <span className='venue'>{event.venue}</span>
            </div>
            <h1>{event.title}</h1>
            <h3>
               {event.date}
            </h3>
            <p>{event.content}</p>
        </ViewEventComponent>
    </Section>
  )
}

export default ViewEvent