import { Grid } from "@mantine/core";
import PropType from "prop-types";

const Home = ({ searchResults }) => {
  return (
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
    // <div></div>
  );
};

Home.propTypes = {
  searchResults: PropType.array.isRequired,
};

export default Home;
