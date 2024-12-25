import React from 'react';

/**
 * PaginationController component for paginating search results.
 * @param {Object} props - The component props.
 * @param {number} props.currentPage - The current page number.
 * @param {number} props.totalPages - The total number of pages.
 * @param {Function} props.handlePageChange - The function to handle page change.
 * @param {Function} props.handlePreviousPageChange - The function to handle previous page change.
 * @param {Function} props.handleNextPageChange - The function to handle next page change.
 *
 * @returns {JSX.Element} The rendered PaginationController component.
 */
const PaginationController = ({
  currentPage,
  totalPages,
  handlePageChange,
  handlePreviousPageChange,
  handleNextPageChange,
}) => {
  const isNextDisabled = currentPage >= totalPages;
  const isPreviousDisabled = currentPage <= 1;

  const renderPageButtons = () => {
    return Array.from({ length: totalPages }, (_, index) => {
      const pageNumber = index + 1;
      const isActive = currentPage === pageNumber;
      return (
        <li key={pageNumber}>
          <button
            onClick={() => handlePageChange(pageNumber)}
            className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
              isActive ? 'bg-brand text-white' : 'bg-white text-gray-500'
            }`}
          >
            {pageNumber}
          </button>
        </li>
      );
    });
  };

  return (
    <div className="pagination flex justify-center border-t">
      <nav className="mt-2">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          {/* Previous Button */}
          <li>
            <button
              disabled={isPreviousDisabled}
              onClick={handlePreviousPageChange}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${
                isPreviousDisabled ? 'cursor-not-allowed' : ''
              }`}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>

          {/* Page Buttons */}
          {renderPageButtons()}

          {/* Next Button */}
          <li>
            <button
              disabled={isNextDisabled}
              onClick={handleNextPageChange}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${
                isNextDisabled ? 'cursor-not-allowed' : ''
              }`}
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginationController;
