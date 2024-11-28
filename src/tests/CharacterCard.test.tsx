import { render, fireEvent, waitFor } from '@testing-library/react';
import CharacterCard from '../components/CharacterCard';
import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom';
describe('CharacterCard', () => {
    it('opens modal with correct person information', async () => {
        const character = {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            films: ['https://swapi.dev/api/films/2/'],
            homeworld: 'https://swapi.dev/api/planets/1/',
            url: 'https://swapi.dev/api/people/1',
        };

        const { getByText, getByRole } = render(<CharacterCard character={character} />);
        const card = getByRole('heading');
        fireEvent.click(card);

        await waitFor(() => expect(getByText('Height: 172')).toBeInTheDocument());
        expect(getByText('Mass: 77')).toBeInTheDocument();
    });
});
