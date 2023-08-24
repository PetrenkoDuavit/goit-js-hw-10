import axios from "axios";

axios.defaults.headers.common["x-api-key"] =
  "live_A2jv0Ki5sXBkZ5c1zxqWzsY9Lbe7PubCffybHQcC3SeK9xsOzLBNFKDnoZOHuv0e";

axios.defaults.baseURL = "https://api.thecatapi.com/v1/";

function fetchBreeds() {
  return axios.get(`breeds`).then((res) => res.data);
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`images/search?breed_ids=${breedId}`)
    .then((res) => res.data);
}
export { fetchBreeds, fetchCatByBreed };
