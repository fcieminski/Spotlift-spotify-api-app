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

export const RecentlyPlayed = styled.div`
  transition: all 0.2s;
  background-color: rgb(238, 238, 238);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  margin-bottom: 10px;
  border: 1px solid rgb(221, 221, 221);
  box-shadow: 5px 2px 11px -8px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  max-width: 340px;
  width: 100%;
  &:hover {
    background-color: rgb(206, 206, 206);
  }
`;
