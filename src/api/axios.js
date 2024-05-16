import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "48114dacee8693265d112676301c2113",
        language: "ko-KR",
    }
});

export default instance;