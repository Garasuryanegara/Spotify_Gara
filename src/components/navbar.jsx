import "../css/stylesNavbar.css";
import { Box, Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { TfiArrowCircleRight } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth_types } from "../redux/types";

export default function Navbar() {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();
  function logout() {
    dispatch({ type: auth_types.logout });
    localStorage.removeItem("user");
    nav("/login");
  }

  return (
    <>
      <Box
        width={"100vw"}
        paddingLeft={"261px"}
        paddingRight={"20px"}
        alignItems={"center"}
        top={0}
        pos="fixed"
        height={"64px"}
        display={"flex"}
        justifyContent={"space-between"}
        bgColor={"black"}
        zIndex={"1"}
      >
        <Box>
          <ButtonGroup color={"black"}>
            <IconButton
              as={TfiArrowCircleLeft}
              bgColor={"black"}
              color={"white"}
            ></IconButton>
            <IconButton
              as={TfiArrowCircleRight}
              bgColor={"black"}
              color={"white"}
            ></IconButton>
          </ButtonGroup>
        </Box>
        <Box>
          <ButtonGroup>
            <Button
              color={"#A7A7A7"}
              font={"16px"}
              padding={"8px 32px 8px 8px"}
            >
              Sign Up
            </Button>
            <Button
              color={"#000000"}
              font={"16px"}
              bgColor={"#FFFFFF"}
              padding={"8px 32px"}
              onClick={logout}
            >
              {userSelector?.name}
            </Button>
            <Box w={"100px"} h={"40px"} bgColor={"white"}></Box>
          </ButtonGroup>
        </Box>
      </Box>
    </>
  );
}
