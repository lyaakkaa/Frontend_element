import {API_URL} from "./config.js";

export const getRepos = async (user, page, perPage) => {
    const response = await fetch(`${API_URL}/users/${user}/repos?per_page=${perPage}&page=${page}`);
    const repos = await  response.json();

    return repos;
}