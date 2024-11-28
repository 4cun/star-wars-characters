import React, { useState} from 'react';
import { fetchCharacterDetails } from '../utils/api';
import Character from "./Character.tsx";

const CharacterCard: React.FC<{ character: Character }> = ({ character }) => {
    const [details, setDetails] = useState<Character | null>(null);
    const [photo] = useState<number>(Math.random());
    const handleMouseOver = () => {
        // Add animation on mouse over
        const card = document.getElementById(`card-${character.name}`);
        if (card) {
            card.classList.add('animate');
        }
    };

    const handleMouseOut = () => {
        // Remove animation on mouse out
        const card = document.getElementById(`card-${character.name}`);
        if (card) {
            card.classList.remove('animate');
        }
    };

    const handleClick = async () => {
        const detailsResponse = await fetchCharacterDetails(character.url);
        detailsResponse.films = character.films;
        detailsResponse.homeworld = character.homeworld;
        setDetails(detailsResponse);
    };

    return (
        <div
            id={`card-${character.name}`}
            className="card"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleClick}
        >
            <h2>{character.name}</h2>
            <img src={`https://picsum.photos/200/300?random=${photo}`} alt="Random Image" />
            {details && (
                <div className="modal">
                    <h2>{details.name}</h2>
                    <p>Height: {details.height}</p>
                    <p>Mass: {details.mass}</p>
                    <p>Homeworld: {details.homeworld}</p>
                    <p>Films: {details.films.join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default CharacterCard;