import React, { useEffect, useState } from 'react';
import { useAppDistpatch, useAppSelector } from '../hooks';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import Select, { SelectProps, selectClasses } from '@mui/base/Select';
import Option, { optionClasses } from '@mui/base/Option';
import Popper from '@mui/base/Popper';
import { salesActions, selectSalesLoading, selectData } from './SalesSlice';
import { styled } from 'styled-components';

interface SalesData {
  product: string;
  salesRevenue: number;
}

const QUANTITY = [
  "10",
  "20",
  "50",
]

function CustomSelect(props: SelectProps<number, false>) {
  const slots: SelectProps<number, false>['slots'] = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <Select {...props} slots={slots} />;
}

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-width: 320px;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: left;
  line-height: 1.5;
  background: #fff;
  border: 1px solid #d0d7de;
  color: #24292f;
  box-shadow: 0px 2px 6px rgba(0,0,0, 0.05);

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: #f6f8fa;
    border-color: #afb8c1;
  }

  &.${selectClasses.focusVisible} {
    border-color: '#3399FF';
    outline: 3px solid '#99CCF3'};
  }

  &.${selectClasses.expanded} {
    &::after {
      content: '▴';
    }
  }
  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: #fff;
  border: 1px solid #d0d7de';
  color: #24292f;
  box-shadow: 0px 2px 6px rgba(0,0,0, 0.05)
  `,
);

const StyledOption = styled(Option)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: #DAECFF;
    color: #003A75;
  }

  &.${optionClasses.highlighted} {
    background-color: #eaeef2;
    color: #24292f;
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: #DAECFF;
    color: #003A75;
  }

  &.${optionClasses.disabled} {
    color: #8c959f;
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: #eaeef2;
    color: #24292f;
  }
  `,
);

const StyledPopper = styled(Popper)`
  z-index: 1;
`;

const SalesDashboard: React.FC = () => {
  const dispatch = useAppDistpatch()
  const loading = useAppSelector(selectSalesLoading);
  const salesData = useAppSelector(selectData);
  const [quantity, setQuanty] = useState<any>(10);
  useEffect(() => {
    dispatch(salesActions.fetchData());
  }, [dispatch]);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );
  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Sale revenue'
      }
    }
  };
  const data = {
    labels: salesData.map((item: any) => item.product),
    datasets: [
      {
        label: 'Sales Figures',
        data: salesData.map((item: any) => item.salesRevenue),
      },
    ],
  }
  
  const handlerHighestSales = () => {
    dispatch(salesActions.fetchHighestData(quantity));
  }

  return (
    <div>
      <div>
        <Typography variant="h4" align="center">Sales Dashboard</Typography>
        <Button
          onClick={handlerHighestSales}
        >Highest sales</Button>
        <CustomSelect 
          value={quantity}
          onChange={(_, newQuantity: number | null): void => setQuanty(newQuantity)}
        >
          {QUANTITY.map((item: string | number) => (
            <Option value={item}>{item}</Option>
          ))}
        </CustomSelect>
      </div>
      <div>
        <Bar data={data} options={options}></Bar>
      </div>
    </div>
  )
};

export default SalesDashboard;