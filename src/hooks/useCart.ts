import { useState } from 'react';
import type { Product } from '../types/Product';

export function useCart() {
  const [items, setItems] = useState<{ product: Product; quantity: number }[]>([]);

  // delta может быть +1 / -1 / +N
  const addToCart = (product: Product, delta: number) => {
    if (!delta) return; // ничего не меняем

    setItems((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id);

      // Товар уже есть в корзине
      if (idx !== -1) {
        const current = prev[idx];
        const nextQty = current.quantity + delta;

        // Если стало <= 0 — удаляем товар
        if (nextQty <= 0) {
          return prev.filter((i) => i.product.id !== product.id);
        }

        // Иначе — обновляем количество
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: nextQty } : i
        );
      }

      // Товара ещё нет: добавляем только если delta > 0
      if (delta > 0) {
        return [...prev, { product, quantity: delta }];
      }

      // delta < 0 для несуществующего товара — игнорируем
      return prev;
    });
  };

  const remove = (id: number) =>
    setItems((prev) => prev.filter((i) => i.product.id !== id));

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return { items, addToCart, remove, total, count };
}
