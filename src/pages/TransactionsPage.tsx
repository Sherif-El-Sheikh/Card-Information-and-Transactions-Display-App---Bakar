import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Filter, BadgeEuro, Search, X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import type { Transaction } from '@/types/transaction';
import html2canvas from 'html2canvas';
import { Helmet } from 'react-helmet-async';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // Initial filter values
  const [filters, setFilters] = useState({
    status: "",
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: "",
  });

  const [showFilters, setShowFilters] = useState(false);
  // Reference to the table DOM element
  const tableRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Transaction data from a json server
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "https://my-json-server.typicode.com/Sherif-El-Sheikh/Transactions-Information-Backend/transactions"
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Downloading the transaction table as an image
  const handleDownload = async () => {
    if (tableRef.current) {
      try {
        const canvas = await html2canvas(tableRef.current);
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "transactions.png";
        link.click();
      } catch (error) {
        console.error("Error generating image:", error);
      }
    }
  };

  // Status color for each transaction
  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      Succeeded: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Canceled: "bg-gray-100 text-gray-800",
      Failed: "bg-red-100 text-red-800",
      Refunded: "bg-purple-100 text-purple-800",
      Disputed: "bg-orange-100 text-orange-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };


  // Search and Filter transactions table
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.cardholder.toLowerCase().includes(search.toLowerCase()) ||
      transaction.status.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      !filters.status || transaction.status === filters.status;
    const matchesMinAmount =
      !filters.minAmount || transaction.amount >= parseFloat(filters.minAmount);
    const matchesMaxAmount =
      !filters.maxAmount || transaction.amount <= parseFloat(filters.maxAmount);
    const matchesStartDate =
      !filters.startDate ||
      new Date(transaction.created) >= new Date(filters.startDate);
    const matchesEndDate =
      !filters.endDate ||
      new Date(transaction.created) <= new Date(filters.endDate);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesMinAmount &&
      matchesMaxAmount &&
      matchesStartDate &&
      matchesEndDate
    );
  });

  // Paginate filtered transactions
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // format Creation Date (Nov 15, 2006)
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Reset filter values
  const resetFilters = () => {
    setFilters({
      status: "",
      minAmount: "",
      maxAmount: "",
      startDate: "",
      endDate: "",
    });
  };

  // skeleton loaders
  if (loading) {
    return (
      <div className="space-y-4 pt-9">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-[450px] w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* page title */}
      <Helmet>
        <title>Transactions - Card Info & Transaction Tracker</title>
      </Helmet>

      <div className="flex items-center space-x-2 mb-5">
        <BadgeEuro className="h-6 w-6" />
        <h1 className="text-lg sm:text-xl font-bold">Transactions</h1>
      </div>

      {/* searching by cardholder or status */}
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex-1 max-w-sm relative">
            <Input
              placeholder="Search by cardholder or status"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 sm:max-w-xs pl-10"
            />
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex space-x-2">
          {/* Filter the table */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            {/* Download Table as an image */}
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Filters section */}
        {showFilters && (
          <div className="p-4 border-b bg-gray-50">
            <div className="flex flex-wrap flex-col gap-4 ">
            {/* Status */}
              <div className="flex-1 max-w-[250px] sm:max-w-[800px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, status: e.target.value }))}
                  className="w-full p-1 px-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                  <option value="">All</option>
                  <option value="Succeeded">Succeeded</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
                  <option value="Disputed">Disputed</option>
                </select>
              </div>

              {/* Amount Range */}
              <div className="flex-1 max-w-[250px] sm:max-w-[800px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount Range
                </label>
                <div className="flex gap-2">
                {/* Min */}
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minAmount}
                    onChange={(e) =>
                      setFilters((prev) => ({...prev, minAmount: e.target.value,}))}
                  />
                  {/* Max */}
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxAmount}
                    onChange={(e) =>
                      setFilters((prev) => ({...prev, maxAmount: e.target.value,}))}
                  />
                </div>
              </div>

              {/* Date Range */}
              <div className="flex-1 max-w-[250px] sm:max-w-[800px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <div className="flex gap-2">
                  {/* Start Date */}
                  <Input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) =>
                      setFilters((prev) => ({...prev, startDate: e.target.value,}))}
                    className="px-1 sm:px-3"
                  />
                  {/* End Date */}
                  <Input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) =>
                      setFilters((prev) => ({...prev, endDate: e.target.value,}))}
                    className="px-1 sm:px-3"
                  />
                </div>
              </div>
            </div>

            {/* Reset Filter */}
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="text-gray-600"
                >
                <X className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
            </div>
          </div>
        )}

        {/* Transaction Table */}
        <div className="hidden md:block overflow-x-auto" ref={tableRef}>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Currency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cardholder
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {/* Format amount to 2 decimals */}
                    {transaction.amount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  {/* currency */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.currency}
                  </td>
                  {/* cardholder Name */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.cardholder}
                  </td>
                  {/* status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  {/* Creation Date */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(transaction.created)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Responsive for Mobile screens */}
        <div className="md:hidden">
          {paginatedTransactions.map((transaction, index) => (
            <div key={index} className="p-4 border-b">
              <div className="flex justify-between items-start mb-2">
                {/* Amount & currency */}
                <div className="text-sm font-medium text-gray-900">
                  <span className="font-medium text-sm text-gray-500">
                    Amount:{" "}
                  </span>
                  {transaction.amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  {transaction.currency}
                </div>

                {/* status */}
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                  {transaction.status}
                </span>
              </div>

              {/* cardholder Name */}
              <div className="space-y-1">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Cardholder:</span>{" "}
                  {transaction.cardholder}
                </div>

                {/* Creation Date */}
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Date:</span>{" "}
                  {formatDate(transaction.created)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* results */}
        <div className="p-4 border-t flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-3 sm:mb-0">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredTransactions.length)}{" "}
            of {filteredTransactions.length} results
          </div>

          {/* Pagination controls */}
          <div className="flex space-x-2">
            {/* Prev Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {/* Next Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}