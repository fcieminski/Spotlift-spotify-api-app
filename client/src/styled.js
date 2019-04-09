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
    height: 200px;
    transition: all 0.5s;
    background-image: linear-gradient(
      rgba(0, 0, 0, 0.404),
      rgba(0, 0, 0, 0.404)
    );
  }
`;

export const PlaylistBox = styled.div`
  width: 200px;
  height: 200px;
  margin: 5px;
  &:hover ${PlaylistImg} {
    &::after {
      transition: all 0.5s;
      width: 200px;
    }
  }
  &:hover .playlist-info {
    visibility: visible;
  }
`;

export const RecentlyPlayedBox = styled.div`
  transition: all 0.2s;
  background-color: rgb(238, 238, 238);
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 5px 2px 11px -8px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  width: 100%;
  margin-bottom: 10px;
  &:hover {
    background-color: rgb(206, 206, 206);
    transform: translateY(5px);
  }
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto 100px;
  height: 100vh;
`;

export const GridSection = styled.div`
  grid-row: 2;
  grid-column: 1 / 6;
`;

export const GridMain = styled.div`
  grid-column: 2 / 6;
  overflow: auto;
`;

export const GridNav = styled.nav``;

export const PlaylistContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 1050px;
  width: 100%;
`;
