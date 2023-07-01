import {
  Box,
  Flex,
  Image,
  Icon,
  Center,
  Input,
  Checkbox,
  Button,
  InputGroup,
  InputRightElement,
  Select,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import login from "../assets/login_button1.png";
import logo from "../assets/spotify-logo2.png";
import { BsApple, BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { TbAlertCircleFilled } from "react-icons/tb";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth_types } from "../redux/types";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useFormik } from "formik";
import axios from "axios";

export default function RegisterPage() {
  YupPassword(Yup);

  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      email2: "",
      password: "",
      name: "",
      day: "",
      month: "",
      year: "",
      gender: "Male",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("You need to enter your email.")
        .email(
          "This email is invalid. Make sure it's written like example@email.com"
        ),
      email2: Yup.string()
        .required("You need to confirm your email.")
        .oneOf([Yup.ref("email"), null], "The email addresses don't match."),
      password: Yup.string()
        .required("You need to enter a password.")
        .min(8, "Your password is too short."),
      name: Yup.string().required("Enter a name for your profile."),
      day: Yup.number()
        .required("Enter a valid day of the month.")
        .moreThan(0, "Enter a valid day of the month.")
        .lessThan(32, "Enter a valid day of the month."),
      month: Yup.string().required("Select your birth month."),
      year: Yup.number()
        .required("Enter a valid year.")
        .moreThan(0, "Enter a valid year."),
    }),
    onSubmit: async () => {
      const { email, name, password, year, month, day, gender } = formik.values;

      const account = { email, name, password, gender };
      account.birthdate = new Date(year, month, day);

      const checkEmail = await axios
        .get("http://localhost:3000/user", {
          params: { email: account.email },
        })
        .then((res) => {
          if (res.data.length) {
            return true;
          } else {
            return false;
          }
        });

      if (checkEmail) {
        return alert("email already used");
      } else {
        await axios.post("http://localhost:3000/user", account).then((res) => {
          nav("/login");
        });
      }
      console.log(account);
    },
  });

  const month = [
    { name: "January", number: 1 },
    { name: "February", number: 2 },
    { name: "March", number: 3 },
    { name: "April", number: 4 },
    { name: "May", number: 5 },
    { name: "June", number: 6 },
    { name: "July", number: 7 },
    { name: "August", number: 8 },
    { name: "September", number: 9 },
    { name: "October", number: 10 },
    { name: "November", number: 11 },
    { name: "December", number: 12 },
  ];

  function inputHandler(event) {
    const { value, id } = event.target;
    formik.setFieldValue(id, value);
  }
  const [seePassword, setSeePassword] = useState(false);

  return (
    <>
      <Center
        flexDir={"column"}
        w={"100vw"}
        gap={"10px"}
        paddingX={"10px"}
        paddingBottom={"10%"}
      >
        <Center w={"100%"} paddingTop={"25px"} paddingBottom={"22px"}>
          <Image src={logo} w="88px" h={"27px"} />
        </Center>
        <Center
          fontWeight={"700"}
          pt={"25px"}
          fontSize={"32px"}
          color={"black"}
        >
          Sign up for free to start listening.
        </Center>
        <Center
          w={"100%"}
          maxW={"402px"}
          fontSize={"14px"}
          color={"white"}
          flexDir={"column"}
          gap={"10px"}
        >
          <Center
            maxW={"394px"}
            w={"100%"}
            bgColor={"#405a93"}
            h={"48px"}
            borderRadius={"25px"}
            fontWeight={"700"}
            gap={"10px"}
            color={"whiteAlpha.800"}
            border={"1px solid #405a93"}
            _hover={{ borderColor: "black" }}
            fontSize={"16px"}
          >
            <Icon w={"20px"} h={"20px"} as={BsFacebook}></Icon>
            Sign up with Facebook
          </Center>
          <Center
            maxW={"394px"}
            w={"100%"}
            bgColor={"white"}
            h={"48px"}
            borderRadius={"25px"}
            fontWeight={"700"}
            gap={"10px"}
            color={"#6a6a6a"}
            border={"3px solid #A5a5a5"}
            _hover={{ borderColor: "black" }}
          >
            <Icon w={"20px"} h={"20px"} as={FcGoogle}></Icon>
            Sign up with Google
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
              or
            </Box>
            <Center w={"100%"}>
              <Box h={"1.6px"} w={"100%"} bgColor={"#d9dadc"}></Box>
            </Center>
          </Center>
        </Center>
        <Box maxW={"450px"} w={"100%"} color={"black"} alignItems={"left"}>
          <Box fontWeight={"700"}>
            <Box paddingBottom={"8px"}>What's your email?</Box>

            <Input
              id="email"
              border={"1px solid #a5a5a5"}
              placeholder="Enter your email."
              height={"48px"}
              _hover={{ borderColor: "black" }}
              onChange={inputHandler}
            ></Input>
          </Box>
          <Box
            display={"flex"}
            color={"#d41b2d"}
            alignItems={"center"}
            gap={"2px"}
            paddingTop={"8px"}
            display={formik.errors.email ? "box" : "none"}
          >
            <Icon as={TbAlertCircleFilled} w={"20px"} h={"20px"} />
            {formik.errors.email}
          </Box>
          <Box
            color={"#117a37"}
            textDecor={"underline"}
            fontWeight={"hairline"}
            width={"200px"}
            paddingBottom={"24px"}
          >
            Use phone number instead.
          </Box>
          <Box fontWeight={"700"}>
            <Box paddingBottom={"8px"}>Confirm your email</Box>

            <Input
              id="email2"
              border={"1px solid #a5a5a5"}
              placeholder="Enter your email again."
              height={"48px"}
              _hover={{ borderColor: "black" }}
              onChange={inputHandler}
            ></Input>
          </Box>
          <Box
            display={"flex"}
            color={"#d41b2d"}
            alignItems={"center"}
            gap={"2px"}
            paddingTop={"8px"}
            display={formik.errors.email2 ? "box" : "none"}
          >
            <Icon as={TbAlertCircleFilled} w={"20px"} h={"20px"} />{" "}
            {formik.errors.email2}
          </Box>
          <Box paddingTop={"24px"} fontWeight={"700"} paddingBottom={"24px"}>
            <Box paddingBottom={"8px"}>Create a password</Box>
            <InputGroup>
              <Input
                id="password"
                type={seePassword ? "text" : "password"}
                border={"1px solid #a5a5a5"}
                placeholder="Create a password."
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
            <Box
              display={"flex"}
              color={"#d41b2d"}
              alignItems={"center"}
              gap={"2px"}
              paddingTop={"8px"}
              fontWeight={"light"}
              display={formik.errors.password ? "box" : "none"}
            >
              <Icon as={TbAlertCircleFilled} w={"20px"} h={"20px"} />{" "}
              {formik.errors.password}
            </Box>

            <Box fontWeight={"700"}>
              <Box paddingBottom={"8px"} paddingTop={"24px"}>
                What should we call you?
              </Box>

              <Input
                id="name"
                border={"1px solid #a5a5a5"}
                placeholder="Enter your profile name."
                height={"48px"}
                _hover={{ borderColor: "black" }}
                onChange={inputHandler}
              ></Input>
            </Box>
            <Box
              display={"flex"}
              color={"#d41b2d"}
              alignItems={"center"}
              gap={"2px"}
              paddingTop={"8px"}
              fontWeight={"light"}
              display={formik.errors.name ? "box" : "none"}
            >
              <Icon as={TbAlertCircleFilled} w={"20px"} h={"20px"} />
              {formik.errors.values}
            </Box>
            <Box width={"200px"} fontWeight={"hairline"} paddingTop={"8px"}>
              This appears on your profile.
            </Box>

            <Box
              fontWeight={"700"}
              maxW={"450px"}
              w={"100%"}
              paddingTop={"24px"}
            >
              <Box paddingBottom={"8px"}>What's your date of birth?</Box>
              <Flex justifyContent={"space-between"} gap={"20px"}>
                <Input
                  maxW={"80px"}
                  w={"100%"}
                  id="day"
                  border={"1px solid #a5a5a5"}
                  placeholder="DD"
                  height={"48px"}
                  _hover={{ borderColor: "black" }}
                  onChange={inputHandler}
                ></Input>
                <Select
                  maxW={"250px"}
                  w={"100%"}
                  id="month"
                  border={"1px solid #a5a5a5"}
                  color={"#6a6a6a"}
                  placeholder="Month"
                  height={"48px"}
                  _hover={{ borderColor: "black" }}
                  onChange={inputHandler}
                >
                  {month.map((val) => (
                    <option value={val.number}>{val.name}</option>
                  ))}
                </Select>
                <Input
                  maxW={"80px"}
                  w={"100%"}
                  id="year"
                  border={"1px solid #a5a5a5"}
                  placeholder="YYYY"
                  height={"48px"}
                  _hover={{ borderColor: "black" }}
                  onChange={inputHandler}
                ></Input>
              </Flex>
            </Box>
            <Box
              display={"flex"}
              color={"#d41b2d"}
              alignItems={"center"}
              gap={"2px"}
              paddingTop={"8px"}
              fontWeight={"light"}
              display={formik.errors.day ? "box" : "none"}
            >
              <Icon as={TbAlertCircleFilled} w={"20px"} h={"20px"} />{" "}
              {formik.errors.day}
            </Box>
            <Box
              display={"flex"}
              color={"#d41b2d"}
              alignItems={"center"}
              gap={"2px"}
              paddingTop={"8px"}
              fontWeight={"light"}
              display={formik.errors.month ? "box" : "none"}
            >
              <Icon as={TbAlertCircleFilled} w={"20px"} h={"20px"} />{" "}
              {formik.errors.month}
            </Box>
            <Box
              display={"flex"}
              color={"#d41b2d"}
              alignItems={"center"}
              gap={"2px"}
              paddingTop={"8px"}
              fontWeight={"light"}
              display={formik.errors.year ? "box" : "none"}
            >
              <Icon as={TbAlertCircleFilled} w={"20px"} h={"20px"} />{" "}
              {formik.errors.year}
            </Box>
          </Box>
          <Box fontWeight={"700"} maxW={"450px"} w={"100%"}>
            <Box paddingBottom={"8px"}>What's your gender?</Box>
          </Box>
          <RadioGroup defaultValue="Male">
            <Flex
              w={"100%"}
              flexWrap={"wrap"}
              rowGap={"5px"}
              columnGap={"10px"}
              paddingBottom={"24px"}
              id="gender"
              onChange={inputHandler}
            >
              <Radio colorScheme="green" value="Male" name="gender"></Radio>Male
              <Radio colorScheme="green" value="Female" name="gender"></Radio>
              Female
              <Radio
                colorScheme="green"
                value="Non-binary"
                name="gender"
              ></Radio>
              Non-binary
              <Radio colorScheme="green" value="Other" name="gender"></Radio>
              Other
              <Flex
                w={"100%"}
                flexWrap={"wrap"}
                rowGap={"5px"}
                columnGap={"10px"}
              >
                <Radio
                  colorScheme="green"
                  value="Prefer not to say"
                  name="gender"
                ></Radio>
                Prefer not to say
                <Box
                  display={"flex"}
                  color={"#d41b2d"}
                  alignItems={"center"}
                  gap={"2px"}
                  paddingTop={"4px"}
                  fontWeight={"light"}
                  display={formik.errors.gender ? "box" : "none"}
                >
                  <Icon as={TbAlertCircleFilled} w={"20px"} h={"20px"} />{" "}
                  {formik.errors.gender}
                </Box>
              </Flex>
            </Flex>
          </RadioGroup>
          <Flex h={"40px"} fontSize={"14px"} paddingBottom={"24px"}>
            <Checkbox colorScheme="green" id="marketing"></Checkbox>
            <Box
              h={"100%"}
              display={"flex"}
              alignItems={"center"}
              paddingLeft={"12px"}
              paddingRight={"24px"}
            >
              <label htmlFor="marketing">
                I would prefer not to receive marketing messages from Spotify
              </label>
            </Box>
          </Flex>
          <Flex h={"40px"} fontSize={"14px"}>
            <Checkbox colorScheme="green" id="content"></Checkbox>
            <Box
              h={"100%"}
              display={"flex"}
              alignItems={"center"}
              paddingLeft={"12px"}
              paddingRight={"24px"}
            >
              <label htmlFor="content">
                Share my registration data with Spotify's content providers for
                marketing purposes.
              </label>
            </Box>
          </Flex>
        </Box>
        <Box paddingTop={"40px"} justifyContent={"center"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"2px"}
            fontSize={"8px"}
            color={"#6a6a6a"}
            justifyContent={"center"}
          >
            <Box>By clicking on sign-up, you agree to Spotify's</Box>
            <Box
              color={"green"}
              textDecor={"underline"}
              cursor={"pointer"}
              _hover={{ color: "#1fdf64" }}
            >
              Terms and Conditions of Use.
            </Box>
          </Box>
          <Box
            justifyContent={"center"}
            display={"flex"}
            alignItems={"center"}
            gap={"2px"}
            fontSize={"8px"}
            color={"#6a6a6a"}
          >
            <Box>By clicking on sign-up, you agree to the </Box>
            <Box
              color={"green"}
              textDecor={"underline"}
              cursor={"pointer"}
              _hover={{ color: "#1fdf64" }}
            >
              Spotify Privacy Policy.
            </Box>
          </Box>
          <Box
            w={"100%"}
            h={"100%"}
            display={"flex"}
            justifyContent={"center"}
            flexDir={"column"}
            alignItems={"center"}
            paddingTop={"20px"}
          >
            <Flex
              w={"158px"}
              bgColor={"#1ed760"}
              h={"56px"}
              borderRadius={"30px"}
              fontWeight={"700"}
              gap={"10px"}
              color={"black"}
              fontSize={"18px"}
              border={"1px solid #1ed760"}
              justifyContent={"center"}
              alignItems={"center"}
              cursor={"pointer"}
              onClick={formik.handleSubmit}
            >
              Sign up
            </Flex>
            <Flex
              w={"160px"}
              bgColor={"#1fdf64"}
              h={"58px"}
              borderRadius={"30px"}
              fontWeight={"700"}
              gap={"10px"}
              color={"black"}
              fontSize={"19px"}
              border={"1px solid #1fdf64"}
              justifyContent={"center"}
              alignItems={"center"}
              cursor={"pointer"}
              position={"absolute"}
              bottom={"66px"}
              opacity={"0"}
              _hover={{ opacity: "1" }}
              onClick={formik.handleSubmit}
            >
              Sign up
            </Flex>
            <Flex
              w={"100%"}
              flexWrap={"wrap"}
              columnGap={"5px"}
              justifyContent={"center"}
              textAlign={"center"}
              paddingTop={"10px"}
            >
              <Box
                fontSize={"13px"}
                paddingBottom={"20px"}
                fontWeight={"700"}
                textAlign={"center"}
              >
                Have an account?
              </Box>
              <Link to={"/login"}>
                <Box
                  fontSize={"13px"}
                  paddingBottom={"20px"}
                  fontWeight={"700"}
                  textAlign={"center"}
                  color={"green"}
                  textDecor={"underline"}
                  _hover={{ color: "#1fdf64" }}
                >
                  Log in
                </Box>
              </Link>
            </Flex>
          </Box>
        </Box>
      </Center>
    </>
  );
}
