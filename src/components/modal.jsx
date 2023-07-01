import {
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Input,
  Textarea,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
export function CreatePlaylist(props) {
  const [imgUrl, setImgUrl] = useState(
    require("../assets/default-spotify.png")
  );

  function input(e) {
    if (!e.target.value) {
      setImgUrl(require("../assets/default-spotify.png"));
      return;
    }
    setImgUrl(e.target.value);
  }

  return (
    <>
      <Flex
        bgColor={"#282828"}
        color={"white"}
        maxW={"524px"}
        // maxH={'389px'}
        w={"524px"}
        h="100%"
        borderRadius={"5px"}
        flexDir={"column"}
        pb="20px"
      >
        <Flex
          justifyContent={"space-between"}
          w="100%"
          fontSize="24px"
          padding={"24px"}
        >
          <Flex fontWeight={"bold"}>Playlist details</Flex>
          <Flex alignItems={"end"}>
            <Icon
              as={IoMdClose}
              color="#87878"
              cursor={"pointer"}
              onClick={() => props.onClose()}
            ></Icon>
          </Flex>
        </Flex>
        <Flex padding={"0px 24px 24px 24px"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} gap="10px">
            <Image
              w={"180px"}
              h="180px"
              src={imgUrl}
              boxShadow={"0px 0px 20px black"}
            ></Image>
            <Input
              bgColor={"#3E3E3E"}
              border={"none"}
              w="180px"
              h="40px"
              placeholder="Image URL"
              onChange={input}
            ></Input>
          </Flex>
          <Flex flexDir={"column"} justifyContent={"space-between"}>
            <Input
              bgColor={"#3E3E3E"}
              border={"none"}
              w="280px"
              h="40px"
              placeholder="Title"
            ></Input>
            <Textarea
              bgColor={"#3E3E3E"}
              border={"none"}
              w="280px"
              maxH="75%"
              h={"100%"}
              resize={"none"}
              placeholder="Description"
            ></Textarea>
          </Flex>
        </Flex>
        <Flex flexDir={"column"}>
          <Flex paddingX={"24px"} fontWeight={"bold"}>
            Add Musics
          </Flex>
          <ListMusics />
        </Flex>

        <Center w="100%">
          <Center
            borderRadius={"5px"}
            fontWeight={"600"}
            bgColor={"#1ED760"}
            h="48px"
            w="90%"
            cursor={"pointer"}
          >
            SAVE
          </Center>
        </Center>
      </Flex>
    </>
  );
}

export function ListMusics() {
  const [createPlaylist, setCreatePlaylist] = useState([]);
  const [pages, setPages] = useState(1);

  async function fetchMusic() {
    await axios
      .get("http://localhost:2001/musics", {
        params: { _limit: "5", _page: pages },
      })
      .then((res) => setCreatePlaylist(res.data));
  }

  useEffect(() => {
    fetchMusic();
  }, []);
  console.log(createPlaylist);
  console.log(pages);
  return (
    <>
      <Flex flexDir={"column"} paddingBottom="10px" gap={"10px"}>
        <Grid
          templateColumns="1fr 2fr 1fr"
          columnGap={5}
          maxH={"550px"}
          overflow={"hidden"}
        >
          <GridItem w="100%" h="25px"></GridItem>
          <GridItem w="100%" h="25px" fontWeight={"bold"}>
            Title
          </GridItem>
          <GridItem w="100%" h="25px" fontWeight={"bold"}>
            Artist
          </GridItem>

          {createPlaylist.map((val) => {
            return (
              <>
                <GridItem w="100%" h="25px" fontWeight={"bold"}>
                  <Center>Add</Center>
                </GridItem>
                <GridItem w="100%" h="25px">
                  {val.title}
                </GridItem>
                <GridItem w="100%" h="25px">
                  {val.singer?.length > 12
                    ? val.singer.substring(0, 9) + "..."
                    : val.singer}
                </GridItem>
              </>
            );
          })}
        </Grid>

        <Flex gap={"20px"} w="100%" justifyContent={"center"}>
          <Flex
            cursor={"pointer"}
            onClick={() => {
              setPages(pages - 1);
            }}
          >
            Prev
          </Flex>
          <Flex
            cursor={"pointer"}
            onClick={() => {
              setPages(pages + 1);
            }}
          >
            Next
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
