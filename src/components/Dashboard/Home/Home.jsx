import React from "react";
import {
  Header,
  Container,
  MainSection,
  Title,
  HomeContainer,
} from "./HomeElements";

const Home = () => {
  return (
    <HomeContainer>
            <Header>
                <h1>Home</h1>
            </Header>
            <Container>
                <MainSection>
                    <Title>Posts</Title>
                    <h1>Home</h1>
                </MainSection>  
            </Container>
        </HomeContainer>
  )
}

export default Home