/*
This hook is intended to be used concurrently with the Table
component to enable frontend-driven pagination.
*/

import Big from 'big.js';
import { useState } from 'react';

interface FrontendPaginationProps {
  // The data to be paginated. Must be an array
  data: any[];
  // The number of data items to display in each page
  count: number;
  // Optional starting page (default is 1)
  startingPage?: number;
}

export const useFrontendPagination = ({
  data,
  count,
  startingPage = 1,
}: FrontendPaginationProps) => {
  // Create state variables for changing page
  const [currentPage, changePage] = useState(startingPage);
  // Calculate total pages
  const totalPages = new Big(data.length).div(count).round(0, 3).toNumber();
  // Determine tableData to return
  const startIndex = new Big(currentPage).minus(1).times(count).toNumber();
  const endIndex = new Big(startIndex).plus(count).toNumber();
  const tableData = data.slice(startIndex, endIndex);
  return {
    currentPage,
    changePage,
    tableData,
    totalPages,
  };
};
