import { waitFor, screen } from '@testing-library/react';
import { vi } from 'vitest';
import * as api from './api/products';
import { renderWithProviders } from './tests/utils';
import App from './App';

vi.mock('./api/products', () => ({
  getProducts: vi.fn(),
}));

const mockProducts = [
  { id: 1, name: 'Tomato', price: 80, image: 'img1', category: 'veg' },
  { id: 2, name: 'Potato', price: 60, image: 'img2', category: 'veg' },
];

describe('App', () => {
  beforeEach(() => {
    vi.mocked(api.getProducts).mockResolvedValue(mockProducts as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('рендерит лоадер при загрузке', () => {
    renderWithProviders(<App />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('рендерит продукты после загрузки', async () => {
    renderWithProviders(<App />);
    await waitFor(() => {
      expect(screen.getByText('Tomato')).toBeInTheDocument();
      expect(screen.getByText('Potato')).toBeInTheDocument();
    });
  });

  test('рендерит кнопку Add to cart', async () => {
    renderWithProviders(<App />);
    await waitFor(() => {
      expect(screen.getAllByRole('button', { name: /add to cart/i }).length).toBeGreaterThan(0);
    });
  });
});
