import {
  Box,
  Container,
  Flex,
  IconButton,
  Image,
  Link,
  Icon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Center,
} from "@chakra-ui/react";
import {
  BiSkipNext,
  BiShuffle,
  BiSkipPrevious,
  BiRepeat,
} from "react-icons/bi";
import { GoPlay } from "react-icons/go";
import { AiOutlineHeart } from "react-icons/ai";
import {
  BsFillPauseCircleFill,
  BsFillPlayCircleFill,
  BsPip,
} from "react-icons/bs";
import { TbMicrophone2, TbDevices2 } from "react-icons/tb";
import { HiOutlineQueueList } from "react-icons/hi2";
import { SlVolume2 } from "react-icons/sl";
import pic from "../images/bg-spotify.jpg";
import { useEffect, useState } from "react";

export default function Playbar(props) {
  const [audio, setAudio] = useState({});
  const [duration, setDuration] = useState(0);
  const [counter, setCounter] = useState(0);
  const [pause, setPause] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    changePlaylist();
  }, [props.playlist]);

  useEffect(() => {
    updateTime();
  }, [currentTime]);

  async function updateTime() {
    if (currentTime == audio.duration && audio.duration) {
      setCounter(counter + 1);
      return await changeSong(counter + 1);
    }
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        if (!pause) {
          resolve(setCurrentTime(audio.currentTime));
        }
      }, 200);
    });
    return await promise;
  }

  function soundTrack() {
    if (props.playlist?.length) {
      const tempAudio = new Audio(
        require("../assets/audio/" + props.playlist[0].src)
      );
      tempAudio.addEventListener("loadedmetadata", function () {
        setDuration(tempAudio.duration);
        console.log(tempAudio.duration);
      });

      setAudio(tempAudio);
    }
  }

  function play(status) {
    setPause(status);
    if (!status) {
      audio.play();
      setTimeout(() => setCurrentTime(audio.currentTime), 500);
      return;
    }
    audio.pause();
  }

  async function changeSong(track) {
    if (track > props.playlist?.length - 1 || track < 0) {
      track = 0;
    }
    setCounter(track);
    audio.src = require("../assets/audio/" + props.playlist[track].src);

    return audio.play().finally(() => {
      setPause(false);
      updateTime();
    });
  }

  function changePlaylist() {
    setTimeout(() => setCurrentTime(audio?.currentTime), 500);

    if (audio.src) {
      setCounter(0);
      changeSong(0);
    } else {
      soundTrack();
    }
  }

  return (
    <Container bottom="0" position="fixed" width="100%" zIndex="3">
      <Flex
        className="music-container"
        bg="#111"
        w="100%"
        h={90}
        position={"fixed"}
        bottom={0}
        direction="row"
        align="center"
        justify={"space-between"}
      >
        {/* Description */}
        <Flex className="msc-desc" gap={3} w={"250px"} align={"center"}>
          <Image
            src={props.playlist?.length ? props.playlist[counter].img : null}
            w={"56px"}
            h={"56px"}
          />
          <Flex className="msc-intr" direction={"column"} justify={"center"}>
            <Link
              href="#"
              color={"white"}
              fontWeight={"bold"}
              fontSize={"14px"}
            >
              {props.playlist?.length ? props.playlist[counter].title : null}
            </Link>
            <Link href="#" color={"white"} fontSize={"11px"}>
              {props.playlist?.length ? props.playlist[counter].singer : null}
            </Link>
          </Flex>
          <Link href="#">
            <Icon as={AiOutlineHeart} w={5} h={5} color={"white"}></Icon>
          </Link>
          <Link href="#">
            <Icon as={BsPip} w={4} h={4} color={"white"}></Icon>
          </Link>
        </Flex>

        {/* Player Button */}
        <Flex
          className="msc-controller"
          direction="column"
          align="center"
          justify="center"
          width={"50%"}
        >
          <Flex
            className="ctrl-button"
            align={"center"}
            width={"100%"}
            justify={"center"}
            gap={3}
          >
            <Box>
              <IconButton
                variant={"link"}
                as={BiShuffle}
                style={{ width: "20px", height: "20px" }}
                color="#999"
              ></IconButton>
            </Box>
            <Box>
              <IconButton
                variant={"link"}
                as={BiSkipPrevious}
                style={{ width: "40px", height: "40px" }}
                color="#999"
                onClick={async () => {
                  setCounter(counter - 1);
                  await changeSong(counter - 1);
                }}
              ></IconButton>
            </Box>

            <IconButton
              variant={"link"}
              as={pause ? BsFillPlayCircleFill : BsFillPauseCircleFill}
              style={{ width: "40px", height: "40px" }}
              color="white"
              // onClick={() => audio.play()}
              onClick={() => play(!pause)}
            ></IconButton>

            <Box>
              <IconButton
                variant={"link"}
                as={BiSkipNext}
                style={{ width: "40px", height: "40px" }}
                color="#999"
                onClick={async () => {
                  setCounter(counter + 1);
                  await changeSong(counter + 1);
                }}
              ></IconButton>
            </Box>
            <Box>
              <IconButton
                variant={"link"}
                as={BiRepeat}
                style={{ width: "20px", height: "20px" }}
                color="#999"
              ></IconButton>
            </Box>
          </Flex>
          <Box height={1} width={"100%"}></Box>
          <Flex
            className="prog-pool"
            align={"center"}
            justify={"space-between"}
            width={"100%"}
          >
            <Box color={"white"} width={10}>
              <Center>
                {" "}
                0{Math.floor(audio.currentTime / 60)}:
                {Math.floor(audio.currentTime % 60) > 9
                  ? Math.floor(audio.currentTime % 60)
                  : "0" + Math.floor(audio.currentTime % 60)}
              </Center>
            </Box>

            <Box
              className="prog-bar"
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
            >
              <Slider
                aria-label="slider-ex-1"
                maxW={"100%"}
                defaultValue={0}
                colorScheme={"green"}
                w={"90%"}
                value={Math.round((audio.currentTime * 100) / audio.duration)}
                onChange={(val) => {
                  let changeDur = val / 100;
                  if (audio.duration) {
                    changeDur *= audio.duration;
                  }
                  audio.currentTime = changeDur;
                  setCurrentTime(audio?.currentTime);
                }}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>

            <Box color={"white"} width={10}>
              <Center>
                {" "}
                0{Math.floor(duration / 60)}:
                {Math.floor(duration % 60) > 9
                  ? Math.floor(duration % 60)
                  : "0" + Math.floor(duration % 60)}
              </Center>
            </Box>
          </Flex>
        </Flex>

        {/* Control */}
        <Flex
          className="msc-opt"
          w={"250px"}
          justify={"right"}
          gap={2}
          align={"center"}
          h={50}
          paddingRight={"50px"}
        >
          <Link>
            <Icon as={TbMicrophone2} w={6} h={5} color={"white"}></Icon>
          </Link>
          <Link>
            <Icon as={HiOutlineQueueList} w={6} h={5} color={"white"}></Icon>
          </Link>
          <Link>
            <Icon as={TbDevices2} w={6} h={5} color={"white"}></Icon>
          </Link>
          <Link>
            <Icon as={SlVolume2} w={6} h={5} color={"white"}></Icon>
          </Link>
          <Slider
            aria-label="slider-ex-1"
            w={28}
            defaultValue={100}
            colorScheme="green"
            Value={audio.volume * 100}
            onChange={(vol) => (audio.volume = vol / 100)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Flex>
      </Flex>
    </Container>
  );
}
