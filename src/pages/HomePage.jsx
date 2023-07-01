import Navbar from "../components/navbar";
import Playbar from "../components/playbar";
import MainPage from "../components/main";
import Sidebar from "../components/sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";

function HomePage(props) {
  const [loading, setLoading] = useState(true);
  const UserSelector = useSelector((state) => state.auth);

  let nav = useNavigate();
  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user"));
    // if (!user?.email || !user?.password) {
    //   return nav("/login");
    // }

    setTimeout(() => setLoading(false), 100);
  }, []);

  const [playlist, setPlaylist] = useState([]);
  const [home_playlist, setHome_playlist] = useState();
  const [home_playlist2, setHome_playlist2] = useState();
  const [sidebarPlaylist, setSidebarPlaylist] = useState();

  async function fetchData() {
    await axios
      .get("http://localhost:3000/musics")
      .then((res) => setPlaylist(res.data));

    await axios
      .get("http://localhost:3000/playlist", { params: { type: "focus" } })
      .then((res) => {
        console.log(res.data);
        setHome_playlist(res.data);
      });

    await axios
      .get("http://localhost:3000/playlist", {
        params: { type: "spotify_playlist" },
      })
      .then((res) => setHome_playlist2(res.data));

    await axios
      .get("http://localhost:3000/playlist", {
        params: { createdBy: UserSelector.email },
      })
      .then((res) => setSidebarPlaylist(res.data));
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Center w="100vw" h="100vh">
          <Spinner size={"xl"} color="green" />
        </Center>
      ) : (
        <>
          <Navbar />
          <Sidebar sidebar={sidebarPlaylist} setPlaylist={setPlaylist} />
          <Playbar playlist={playlist} />
          <MainPage
            data={home_playlist}
            setPlaylist={setPlaylist}
            data2={home_playlist2}
          />
        </>
      )}
    </>
  );
}

export default HomePage;
