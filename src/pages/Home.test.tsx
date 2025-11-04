import { waitFor, screen } from '@testing-library/react';
import { Home } from './Home';
import { vi } from 'vitest';
import * as api from '../api/products';
import { renderWithProviders } from '../tests/utils';

vi.mock('../api/products', () => ({
  getProducts: vi.fn(),
}));

const mockProducts = [
  { id: 1, name: 'Tomato', price: 80, image: 'img1', category: 'veg' },
  { id: 2, name: 'Potato', price: 60, image: 'img2', category: 'veg' },
];

describe('Home page', () => {
  beforeEach(() => {
    vi.mocked(api.getProducts).mockResolvedValue(mockProducts as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('показывает загрузку при старте', () => {
    renderWithProviders(<Home />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('рендерит товары после загрузки', async () => {
    renderWithProviders(<Home />);
    await waitFor(() => {
      expect(screen.getByText('Tomato')).toBeInTheDocument();
      expect(screen.getByText('Potato')).toBeInTheDocument();
    });
  });
});
