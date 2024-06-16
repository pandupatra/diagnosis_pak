import styled from "@emotion/styled";
import { whiteColor } from "@/styles/styles";
const { Box, Typography, Container } = require("@mui/material")
const Hero = ({ title }) => {

  const HeroBox = styled(Box)`
    position: relative;
    padding: 200px 0;
    width: 100%;
    background-image: url('/hero.jpg');
    background-size: cover;
    z-index: 0;

    &::before {
      content: " ";
      position: absolute;
      top:0;
      left:0;
      width: 100%;
      height: 100%;
      background-color: #000;
      opacity: 0.7;
      z-index: -1;
    }
  `

  return (
    <HeroBox>
      <Container>
        <Typography textAlign="center" sx={{ color: whiteColor }} variant="h2">{title}</Typography>
      </Container>
    </HeroBox>
  )
}

export default Hero