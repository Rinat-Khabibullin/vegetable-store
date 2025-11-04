import { renderHook, act } from '@testing-library/react';
import { useCart } from './useCart';

const product = { id: 1, name: 'Tomato', price: 80, image: 'img' };

test('добавляет товар в корзину', () => {
  const { result } = renderHook(() => useCart());

  act(() => {
    result.current.addToCart(product, 1);
  });

  expect(result.current.items.length).toBe(1);
  expect(result.current.items[0].quantity).toBe(1);
});
