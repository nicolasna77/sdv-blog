import Header from "../components/Header";
import Post from "../components/Post";
import { makeClient } from "../service/api";
import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import AddEntryContext from "../components/context/Context.jsx";

const Home = () => {
  const { session } = useContext(AddEntryContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    makeClient()
      .get("/posts")
      .then((res) => {
        setPosts(res.data);
      });
  }, [posts]);
  useEffect(() => {
    if (!session) {
      return;
    }

    setId(session.payload.user.id);
  }, [session]);
  return (
    <div>
      <Header />
      {posts.map((post) => (
        <Link href={"/posts/" + post.id} key={post.id}>
          <a>
            <Post key={post.id} post={post} />
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Home;
