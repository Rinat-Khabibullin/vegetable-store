import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { render } from '@testing-library/react';

export function renderWithProviders(ui: ReactNode) {
  return render(<MantineProvider>{ui}</MantineProvider>);
}
