import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

vi.mock('../utils/api', () => ({
    fetchCharacterDetails: vi.fn().mockResolvedValue({
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        films: ['Attack of the Clones'],
        homeworld: 'Tatooine',
    }),
}));