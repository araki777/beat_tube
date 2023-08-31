import { Grid } from "@mantine/core";
import PropType from "prop-types";
import { useState } from "react";
import { Pagination } from "@mantine/core";

const Home = ({ searchResults }) => {
  const [activePage, setPage] = useState(1);

  return (
    <>
      <Grid gutter="md">
        {searchResults &&
          searchResults.map((data, index) => (
            <Grid.Col span={4} key={index}>
              <iframe
                id="player"
                width="100%"
                height="100%"
                src={"https://www.youtube.com/embed/" + data.id.videoId}
                allowFullScreen
              />
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
