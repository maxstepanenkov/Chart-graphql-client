import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { salesActions } from './sales/SalesSlice';

interface SalesData {
  product: string;
  salesRevenue: number;
}

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache()
});

function* fetchSalesDataSaga() {
  const { data } = yield client.query({
    query: gql`
      {
        sales {
          product
          salesRevenue
        }
      }
    `
  });
  yield put({ type: salesActions.fetchDataSuccess});
  yield put({ type: salesActions.setData, payload: data.sales })
}

function* fetchHighestSalesDataSaga({ payload }: any) {
  console.log(payload)
  const { data } = yield client.query({
    variables: {
      quantity: +payload || 10
    },
    query: gql`
      query ($quantity: Int)
        {
          sortedSales(quantity: $quantity) {
            product
            salesRevenue
          }
        }
      `
  });
  yield put({ type: salesActions.fetchDataSuccess });
  yield put({ type: salesActions.setData, payload: data.sortedSales })
}

function* salesData() {
  yield takeEvery(salesActions.fetchData.type, fetchSalesDataSaga);
  yield takeEvery(salesActions.fetchHighestData.type, fetchHighestSalesDataSaga);
}

export default salesData;