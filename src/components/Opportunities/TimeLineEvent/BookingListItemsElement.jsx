import styled from "styled-components";

export const BookingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  background: ${props => props.isRequestedEvent ? 'linear-gradient(135deg, #111 25%, transparent 25%, transparent 50%, #111 50%, #111 75%, transparent 75%, transparent);' : 'transparent'};;
  background-size: 60px 60px;
  margin-bottom: 1rem;
  
  .date {
    font-weight: 600;
    font-size: 1.125rem;
    flex-basis: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-right: 1px solid #f0f0f0;
    padding-right: 0.75rem;

    &.today-date {
      color: #E45221;
    }

    .date-digit {
      font-size: 2rem;
      font-weight: 800;
    }
  }

  .time-line {
    flex-basis: 25%;
    padding-left: 2rem;

    .time-line-detail {
       display: flex;
       align-items: center;
       margin-bottom: 0.75rem;

       &:last-child {
         margin-bottom: 0;
       }

       p {
         margin: 0 0.75rem;
       }

       .text-over-flow {
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
         width: 158px;
       }
    }

    .time-line-request {
      color: #E24612;
    }

  }

  .details {
    flex-basis: 55%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;

    .details-profile {
       display: flex;
       margin-top: 0.5rem;

       img {
         width: 40px;
         height: 40px;
         object-fit: cover;
         border-radius: 100%;
         
         :not(:first-child) {
            margin-left: -0.8rem;
         }
       }
    }

    .details-request {
        margin-right: 1rem;
        background-color: #FAE4DE;
        color: #9B3D1E;
        padding: 0.125rem 0.5rem;
        border-radius: 2rem;
        font-size: 0.75rem;
        font-weight: 600;
    }
  }

  .action {
    flex-basis: 10%;
    display: flex;
    justify-content: end;
    cursor: pointer;
    position: relative;

    .action-edit {
        background-color: #F8F8F8;
        display: flex;
        align-items: center;
        width: fit-content;
        color: #000000;
        padding: 0.75rem 1.25rem;
        border-radius: 8px;
    }

    p {
        margin-right: 0.75rem;
    }

    .action-dropdown {
        width: 260px;
        border: 1px solid #ccc;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        padding: 0.5rem;
        background-color: #f0f0f0;
        position: absolute; 
        top: 90%;        
        z-index: 1;
        color: #707272;

        .action-dropdown-list {
            display: flex;
            align-items: center;
            height: 3.5rem;
            padding: 0 1rem;

            &:last-child {
                padding-top: 0.5rem;
                margin-bottom: 0;
                border-top: 1px solid lightgray;
            }

            p {
                margin-left: 0.75rem;
            }

            &:hover {
              background-color: #DDD;
              border-radius: 8px;
              font-weight: 600;
              color: #000000;
            }
        }
    }
  }
`;