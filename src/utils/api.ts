import axios from 'axios';

export const fetchCharacters = async () => {
    const response = await axios.get('https://swapi.dev/api/people/');
    return response.data;
};

export const fetchCharacterDetails = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
};

export const fetchFilmDetails = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
};

export const fetchHomeWorldDetails = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
};
export const fetchCharacterDetailsWithFilmsAndHomeworld = async (character: any) => {
    const films = await Promise.all(character.films.map(fetchFilmDetails));
    const homeworld = await fetchHomeWorldDetails(character.homeworld);
    return { ...character, films: films.map(film => film.title), homeworld: homeworld.name };
};
