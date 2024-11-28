import { useState } from 'react';
import {fetchCharacters, fetchCharacterDetailsWithFilmsAndHomeworld} from '../utils/api';
import CharacterCard from "./CharacterCard.tsx";
import Character from "./Character.tsx";
import {useAuth} from "../useAuth.tsx";
const SearchAndFilter = () =>{
    const [characters, setCharacters] = useState<Character[]>([]);
    const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('homeworld');
    const [filterValue, setFilterValue] = useState('');
    const { onLogout } = useAuth();

    const fetchCharactersData = async () => {
        const data = await fetchCharacters();
        const detailedCharacters = await Promise.all(data.results.map(fetchCharacterDetailsWithFilmsAndHomeworld));
        setCharacters(detailedCharacters);
        setFilteredCharacters(detailedCharacters);
    };
    fetchCharactersData();
    const handleSearch = () => {
        const filtered = characters.filter(character =>
            character.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCharacters(filtered);
    };

    const handleFilter = () => {
        let filtered = characters;
        if (filterBy === 'homeworld') {
            filtered = filtered.filter(character =>
                character.homeworld.toLowerCase() == filterValue.toLowerCase()
            );
        } else if (filterBy === 'film') {
            filtered = filtered.filter(character =>
                character.films.some(film => film.toLowerCase() == filterValue.toLowerCase())
            );
        }
        setFilteredCharacters(filtered);
    };

    return (
        <div>
            <h2>Search and Filter (Authenticated)</h2>

            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name"
            />
            <button onClick={handleSearch}>Search</button>&ensp;
            <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                <option value="homeworld">Homeworld</option>
                <option value="film">Film</option>
            </select>
            <input
                type="text"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                placeholder="Filter value"
            />
            <button onClick={handleFilter}>Filter</button>&ensp;
            <button onClick={onLogout}>Logout</button>
            <div className="character-list">
                {filteredCharacters.map((character) => (
                    <CharacterCard key={character.name} character={character} />
                ))}
            </div>
        </div>
    );
};

export default SearchAndFilter;