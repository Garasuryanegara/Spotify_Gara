import {
  Box,
  Flex,
  Image,
  Icon,
  Center,
  Input,
  Checkbox,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import logo from "../assets/spotify-logo2.png";
import { BsApple, BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { TbAlertCircleFilled } from "react-icons/tb";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth_types } from "../redux/types";
import { userLogin } from "../../src/redux/middlewares/userauth";
import axios from "axios";

export default function LoginPage() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user?.email && user?.password) {
  //     return nav("/home");
  //   }
  // }, []);

  useEffect(() => {
    console.log("ada ketikan password baru");
  }, [account.password]);

  function inputHandler(event) {
    const { value, id } = event.target;
    const tempAccount = { ...account };
    tempAccount[id] = value;
    setAccount(tempAccount);
  }

  const [seePassword, setSeePassword] = useState(false);
  const toast = useToast();

  async function login() {
    // await axios
    //   .get("http://localhost:2001/user", {
    //     params: {
    //       email: account.email.toLowerCase(),
    //       password: account.password,
    //     },
    //   })
    //   .then((res) => {
    //     if (res.data.length) {
    //       dispatch({
    //         type: auth_types.login,
    //         payload: res.data[0],
    //       });
    //       localStorage.setItem("user", JSON.stringify(res.data[0]));

    //       return nav("/home");
    //     } else {
    //       alert("email atau password salah!");
    //     }
    //   });

    toast.closeAll();
    const status = await dispatch(userLogin(account));

    if (status) {
      toast({
        title: "Login Successfull.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      return nav("/home");
    }
    return toast({
      title: "Login failed, wrong Email/Password.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <>
      <Center flexDir={"column"} w={"100vw"} gap={"10px"} paddingX={"10px"}>
        <Center
          w={"100%"}
          paddingTop={"25px"}
          paddingBottom={"22px"}
          borderBottom={"1px solid #d9dadc"}
        >
          <Image src={logo} w="88px" h={"27px"} />
        </Center>
        <Center fontWeight={"700"} pt={"25px"}>
          To continue, log in to Spotify
        </Center>
        <Center
          w={"100%"}
          maxW={"450px"}
          fontSize={"14px"}
          color={"white"}
          flexDir={"column"}
          gap={"10px"}
        >
          <Center
            w={"100%"}
            bgColor={"#1877F2"}
            h={"48px"}
            borderRadius={"25px"}
            fontWeight={"700"}
            gap={"10px"}
            color={"whiteAlpha.800"}
            letterSpacing={"1.5px"}
            border={"1px solid #1877f2"}
            _hover={{ borderColor: "black" }}
          >
            <Icon w={"20px"} h={"20px"} as={BsFacebook}></Icon>
            CONTINUE WITH FACEBOOK
          </Center>
          <Center
            w={"100%"}
            bgColor={"#191919"}
            h={"48px"}
            borderRadius={"25px"}
            fontWeight={"700"}
            gap={"10px"}
            color={"whiteAlpha.800"}
            letterSpacing={"1.5px"}
            border={"1px solid #191919"}
            _hover={{ borderColor: "black" }}
          >
            <Icon w={"20px"} h={"20px"} as={BsApple}></Icon>
            CONTINUE WITH APPLE
          </Center>
          <Center
            w={"100%"}
            bgColor={"white"}
            h={"48px"}
            borderRadius={"25px"}
            fontWeight={"700"}
            gap={"10px"}
            color={"#6a6a6a"}
            border={"1px solid #A5a5a5"}
            letterSpacing={"1.5px"}
            _hover={{ borderColor: "black" }}
          >
            <Icon w={"20px"} h={"20px"} as={FcGoogle}></Icon>
            CONTINUE WITH GOOGLE
          </Center>
          <Center
            w={"100%"}
            bgColor={"white"}
            h={"48px"}
            borderRadius={"25px"}
            fontWeight={"700"}
            gap={"10px"}
            color={"#6a6a6a"}
            border={"1px solid #A5a5a5"}
            letterSpacing={"1.5px"}
            _hover={{ borderColor: "black" }}
          >
            CONTINUE WITH PHONE NUMBER
          </Center>

          <Center
            w={"100%"}
            h={"48px"}
            color={"black"}
            gap={"20px"}
            fontWeight={"800"}
            paddingBottom={"12px"}
          >
            <Center w={"100%"}>
              <Box h={"1.6px"} w={"100%"} bgColor={"#d9dadc"}></Box>
            </Center>
            <Box height={"38px"} paddingTop={"13px"}>
              OR
            </Box>
            <Center w={"100%"}>
              <Box h={"1.6px"} w={"100%"} bgColor={"#d9dadc"}></Box>
            </Center>
          </Center>
        </Center>
        <Box maxW={"450px"} w={"100%"} color={"black"} alignItems={"left"}>
          <Box fontWeight={"700"}>
            <Box paddingBottom={"8px"}>Email address or username</Box>

            <Input
              id="email"
              border={"1px solid #a5a5a5"}
              placeholder="Email address or username"
              height={"48px"}
              _hover={{ borderColor: "black" }}
              onChange={inputHandler}
            ></Input>
          </Box>
          <Box paddingTop={"16px"} fontWeight={"700"} paddingBottom={"16px"}>
            <Box paddingBottom={"8px"}>Password</Box>
            <InputGroup>
              <Input
                id="password"
                type={seePassword ? "text" : "password"}
                border={"1px solid #a5a5a5"}
                placeholder="Password"
                height={"48px"}
                _hover={{ borderColor: "black" }}
                onChange={inputHandler}
              ></Input>
              <InputRightElement height={"48px"} paddingRight={"12px"}>
                <Icon
                  w={"24px"}
                  h={"24px"}
                  color={"#A5A5A5"}
                  cursor={"pointer"}
                  as={seePassword ? AiOutlineEye : AiOutlineEyeInvisible}
                  onClick={() => setSeePassword(!seePassword)}
                ></Icon>
              </InputRightElement>
            </InputGroup>
            {account.password.length < 8 ? (
              <Box color={"red"} fontWeight={"light"}>
                minimum 8 characters
              </Box>
            ) : null}
          </Box>
        </Box>
        <Box
          fontSize={"16px"}
          fontWeight={"light"}
          textDecor={"underline"}
          paddingBottom={"16px"}
          cursor={"pointer"}
        >
          <Box _hover={{ color: "#117a37" }} width={"170px"}>
            Forgot your password?
          </Box>
        </Box>
        <Box
          height={"48px"}
          maxW={"450px"}
          width={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box maxW={"144px"} w={"100%"} height={"48px"}>
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={"10px"}
              fontSize={"14px"}
            >
              <Box height={"16px"} width={"16px"} borderRadius={"3px"}>
                <Checkbox colorScheme="green" id="remember-me" />
              </Box>
              <label htmlFor="remember-me">Remember me</label>
            </Box>
          </Box>
          <Box
            w={"121px"}
            h={"48px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Flex
              w={"100%"}
              bgColor={"#1ed760"}
              h={"48px"}
              borderRadius={"25px"}
              fontWeight={"700"}
              gap={"10px"}
              color={"black"}
              fontSize={"14px"}
              border={"1px solid #A5a5a5"}
              justifyContent={"center"}
              alignItems={"center"}
              letterSpacing={"1.5px"}
              onClick={login}
            >
              LOG IN
            </Flex>
            <Flex
              w={"123px"}
              bgColor={"#1fdf64"}
              h={"50px"}
              borderRadius={"25px"}
              fontWeight={"700"}
              gap={"10px"}
              color={"black"}
              fontSize={"15px"}
              border={"1px solid #A5a5a5"}
              justifyContent={"center"}
              alignItems={"center"}
              position={"absolute"}
              opacity={"0"}
              letterSpacing={"1.5px"}
              _hover={{ opacity: "1" }}
              onClick={login}
            >
              LOG IN
            </Flex>
          </Box>
        </Box>
        <Box
          w={"100%"}
          maxW={"450px"}
          paddingTop={"12px"}
          paddingBottom={"20px"}
        >
          <Box height={"1.6px"} w={"100%"} bgColor={"#d9dadc"} />
        </Box>
        <Center
          maxW={"450px"}
          w={"100%"}
          flexDir={"column"}
          paddingBottom={"10px"}
        >
          <Center fontSize={"18px"} paddingBottom={"20px"} fontWeight={"700"}>
            Don't have an account?
          </Center>
          <Center
            w={"100%"}
            bgColor={"white"}
            h={"48px"}
            borderRadius={"25px"}
            fontWeight={"700"}
            // gap={"10px"}
            color={"#6a6a6a"}
            border={"1px solid #A5a5a5"}
            letterSpacing={"1.5px"}
            _hover={{ borderColor: "black" }}
          >
            SIGN UP FOR SPOTIFY
          </Center>
        </Center>
      </Center>
    </>
  );
}
