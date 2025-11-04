import { Card, Image, Text, Group, Button, Flex } from "@mantine/core";
import { IconShoppingCart, IconMinus, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import type { Product } from "../../types/Product";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product, qty: number) => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const [qty, setQty] = useState(1);

  return (
    <Card
      radius={24}
      p={16}
      bg="#FFFFFF"
      style={{
        width: 302,
        height: 414,
        border: "none",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)")
      }
    >
      <Card.Section>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 0,
          }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fit="contain"
            style={{
              width: 276,
              height: 276,
              borderRadius: 8,
              display: "block",
            }}
          />
        </div>
      </Card.Section>

      <Flex justify="space-between" align="center" mt="md" mb="xs">
        <Group gap={6} wrap="nowrap" style={{ minWidth: 0 }}>
          <Text
            fw={600}
            c="#212529"
            fz="md"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: 170,
            }}
            title={product.name}
          >
            {product.name.replace(/ - \d+(\.\d+)?\s?[KkGg]+$/, "")}
          </Text>
          <Text size="sm" c="#868E96" style={{ whiteSpace: "nowrap" }}>
            1 kg
          </Text>
        </Group>

        <Flex align="center" gap={8}>
          <Button
            variant="default"
            radius="md"
            size="compact-sm"
            aria-label="decrease-qty"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            style={{
              width: 26,
              height: 26,
              padding: 0,
              backgroundColor: "#DEE2E6",
              color: "#000",
            }}
          >
            <IconMinus size={14} />
          </Button>

          <Text w={20} ta="center">
            {qty}
          </Text>

          <Button
            variant="default"
            radius="md"
            size="compact-sm"
            aria-label="increase-qty"
            onClick={() => setQty((q) => q + 1)}
            style={{
              width: 30,
              height: 30,
              padding: 0,
              color: "#212529",
              backgroundColor: "#F1F3F5",
            }}
          >
            <IconPlus size={14} />
          </Button>
        </Flex>
      </Flex>

      <Flex justify="space-between" align="center" mt="sm">
        <Text fw={700} fz="lg" c="#212529">
          ${" "}{product.price}
        </Text>

        <Button
          radius="md"
          bg="#E9F8EE"
          c="#3B944E"
          fw={600}
          leftSection={<IconShoppingCart size={18} color="#3B944E" />}
          onClick={() => onAdd(product, qty)}
          styles={{
            root: {
              display: "flex",
              alignItems: "center",
              gap: "6px",
              height: "40px",
              padding: "0 32px",
              backgroundColor: "#E9F8EE",
              color: "#3B944E",
              fontWeight: 600,
              transition: "background-color 0.15s ease",
            },
            section: { margin: 0 },
          }}
        >
          Add to cart
        </Button>
      </Flex>
    </Card>
  );
}
