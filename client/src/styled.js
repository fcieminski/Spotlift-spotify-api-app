import styled from "styled-components";

export const StyledNav = styled.nav`
  width: 300px;
  height: 10%;
  background-color: white;
  border-bottom-right-radius: 50px;
`;

export const StyledButton = styled.button`
  width: 200px;
  height: 30px;
  border: none;
  border-radius: 10px;
  margin: 20px;
  border: 2px solid rgb(144, 144, 144);
  background-color: transparent;
`;

export const StyledSection = styled.section`
  position: relative;
  height: 250px;
  margin-bottom: 10vh;
  overflow: hidden;
`;

export const PlaylistImg = styled.div`
  position: relative;
  &::after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 0;
    height: 250px;
    transition: all 0.5s;
    background-image: linear-gradient(
      rgba(0, 0, 0, 0.404),
      rgba(0, 0, 0, 0.404)
    );
  }
`;

export const PlaylistBox = styled.div`
  width: 250px;
  height: 250px;
  margin: 10px;
  &:hover ${PlaylistImg} {
    &::after {
      transition: all 0.5s;
      width: 250px;
    }
  }
  &:hover .playlist-info {
    visibility: visible;
  }
`;
