import { PlaylistApis } from "@/apis/playlist";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    PlaylistApis.getRecommendResource().then((res: any) => {
      console.log(res);
    });
  }, []);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
