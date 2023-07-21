import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import SalesDashboard from './SalesContainer';

const mocks = [];

it('renders without error', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SalesDashboard />
    </MockedProvider>
  )
  expect()
})