import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface SalesData {
  product: string;
  salesRevenue: number;
}

export interface SalesState {
  loading: boolean;
  data: SalesData[];
  highestData: SalesData[];
}

const initialState: SalesState = {
  loading: false,
  data: [],
  highestData: [],
}

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },
    fetchHighestData<T>(state: SalesState, action: PayloadAction<SalesData[]>) {
      state.loading = true;
    },
    fetchDataSuccess(state) {
      state.loading = false;
    },
    fetchDataFailed(state) {
      state.loading = false;
    },
    setData(state, action: PayloadAction<SalesData[]>) {
      state.data = action.payload
    },
    setHighestData(state, action: PayloadAction<SalesData[]>) {
      state.highestData = action.payload
    }
  }
})

export const salesActions = salesSlice.actions;

export const selectSalesLoading = (state: RootState) => state.sales.loading;
export const selectData = (state: RootState) => state.sales.data;
const salesReducer = salesSlice.reducer;
export default salesReducer;