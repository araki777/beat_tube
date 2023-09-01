import { useLocation } from "react-router-dom";

const MovieShow = () => {
  const location = useLocation();
  const item = location.state;

  if (!item) {
    return <div>Data not available</div>;
  }

  return (
    <div>
      <h2>{item.snippet.title}</h2>
      <p>{item.snippet.description}</p>
    </div>
  );
};
export default MovieShow;
