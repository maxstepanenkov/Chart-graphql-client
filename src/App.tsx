import React from 'react';
import { Container } from '@mui/material';
import './App.css';
import SalesDashboard from './sales/SalesContainer';

const App: React.FC = () => {
  return (
    <Container>
      <SalesDashboard />
    </Container>
  )
}

export default App;
