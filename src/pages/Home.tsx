import { useEffect, useState } from 'react';
import { getProducts } from '../api/products';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { Header } from '../components/Header/Header';
import { SimpleGrid, Center, Loader, Container, Title } from '@mantine/core';
import { useCart } from '../hooks/useCart';
import { CartPopup } from '../components/CartPopup/CartPopup';

export function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cart = useCart();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    getProducts().then(setProducts).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div data-testid="loader">
      <Center mt="xl">
        <Loader color="#3B944E" />
      </Center>
    </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F3F5FA', minHeight: '100vh' }}>
      <Header
        count={cart.count}
        total={cart.total}
        onCartClick={() => setOpened(true)}
      />

      <Container
        fluid
        styles={{
          root: {
            paddingTop: 20,
            paddingLeft: 30,
            paddingRight: 10,
            paddingBottom: 60,
            boxSizing: 'border-box',
          },
        }}
      >
        <Title order={2} mb="lg" c="#212529">
          Catalog
        </Title>

        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing={24}
          verticalSpacing={28}
        >
          {products.map((p: any) => (
            <ProductCard key={p.id} product={p} onAdd={cart.addToCart} />
          ))}
        </SimpleGrid>
      </Container>

      <CartPopup opened={opened} onClose={() => setOpened(false)} cart={cart} />
    </div>
  );
}
