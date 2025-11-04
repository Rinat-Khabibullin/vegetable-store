import { fireEvent, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import { renderWithProviders } from '../../tests/utils';

const product = {
  id: 1,
  name: 'Tomato',
  price: 80,
  image: 'img',
  category: 'veg',
};

describe('ProductCard', () => {
  test('рендерит название и цену', () => {
    renderWithProviders(<ProductCard product={product as any} onAdd={() => {}} />);
    expect(screen.getByText('Tomato')).toBeInTheDocument();
    expect(screen.getByText(/\$\s*80/)).toBeInTheDocument();
  });

  test('увеличивает количество при клике на +', () => {
    renderWithProviders(<ProductCard product={product as any} onAdd={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'increase-qty' }));
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('вызывает onAdd при добавлении товара', () => {
    const onAdd = vi.fn();
    renderWithProviders(<ProductCard product={product as any} onAdd={onAdd} />);
    fireEvent.click(screen.getByRole('button', { name: /Add to cart/i }));
    expect(onAdd).toHaveBeenCalledWith(product, 1);
  });
});
