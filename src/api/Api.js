import axios from "axios";

export const fetchSuggestion = async (keyword) => {
  try {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          q: keyword,
          part: "snippet",
          type: "video",
          maxResults: "10",
          videoCategoryId: "10",
          key: import.meta.env.VITE_API_KEY,
        },
      }
    );
    return res.data.items;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSearchList = async (keyword) => {
  try {
    if (keyword) {
      const res = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            q: keyword,
            part: "snippet",
            type: "video",
            key: import.meta.env.VITE_API_KEY,
            videoCategoryId: "10",
            maxResults: 50,
          },
        }
      );
      return res.data.items;
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchDefaultSearchList = async () => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          chart: "mostPopular",
          part: "snippet",
          type: "video",
          key: import.meta.env.VITE_API_KEY,
          videoCategoryId: "10",
          maxResults: 16,
        },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error(error);
  }
};
