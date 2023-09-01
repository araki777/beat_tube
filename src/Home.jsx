import { Grid } from "@mantine/core";
import PropType from "prop-types";
import { useState } from "react";
import { Pagination } from "@mantine/core";
import { Link } from "react-router-dom";

const Home = ({ searchResults }) => {
  const [activePage, setPage] = useState(1);

  return (
    <>
      <Grid gutter="md">
        {searchResults &&
          searchResults.map((videoData, index) => (
            <Grid.Col span={3} key={index}>
              <div>
                {/* ビデオデータを表示 */}
                <Link
                  to={`/movie/show/${videoData.id.videoId}`}
                  state={videoData}
                >
                  <p>{videoData.snippet.channelTitle}</p>
                  <img
                    alt={videoData.snippet.title}
                    src={videoData.snippet.thumbnails.default.url}
                  />
                </Link>
              </div>
            </Grid.Col>
          ))}
      </Grid>
      <Pagination value={activePage} onChange={setPage} total={10} />
    </>
  );
};

Home.propTypes = {
  searchResults: PropType.array.isRequired,
};

export default Home;
