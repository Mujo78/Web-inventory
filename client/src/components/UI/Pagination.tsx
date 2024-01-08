import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

type Props = {
  currentPage: number;
  totalPages: number;
  handleNavigate: (page: number) => void;
};

function CustomPagination({ currentPage, totalPages, handleNavigate }: Props) {
  const [pageNum, setPage] = useState<number>(currentPage || 1);

  useEffect(() => {
    setPage(currentPage || 1);
  }, [currentPage]);

  function handlePageChange(page: number) {
    setPage(page);
    handleNavigate(page);
  }

  const pageRange = 5;
  const startPage = Math.max(1, pageNum - pageRange);
  const endPage = Math.min(totalPages, pageNum + pageRange);

  const pagesToDisplay = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div
      className={`flex items-center w-full mt-auto border-t border-gray-200 bg-white px-4 py-3 sm:px-6`}
    >
      <div className="flex-1">
        <nav
          className="relative w-full justify-between z-0 inline-flex -space-x-px"
          aria-label="Pagination"
        >
          <div className="w-2/12">
            {pageNum > 1 && (
              <Button
                color="success"
                onClick={() => handlePageChange(pageNum - 1)}
                className="relative inline-flex justify-start items-center px-2 py-2 text-gray-700 bg-white hover:!bg-gray-50"
              >
                <HiArrowLeft style={{ color: "black" }} />
              </Button>
            )}
          </div>
          <div className="flex justify-center items-center gap-3">
            {pagesToDisplay.map((pageNumber) => (
              <Button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`relative inline-flex items-center mx-auto justify-center focus:ring-green-200 rounded-lg p-1 text-sm font-medium ${
                  pageNumber === pageNum
                    ? "text-white bg-green-500 hover:!bg-green-600"
                    : "text-gray-700 bg-gray-200 hover:!bg-gray-300"
                }`}
              >
                {pageNumber}
              </Button>
            ))}
          </div>
          <div className="flex justify-end w-2/12">
            {pageNum < totalPages && (
              <Button
                color="success"
                onClick={() => handlePageChange(pageNum + 1)}
                className="relative inline-flex items-center px-2 py-2 text-gray-700 bg-white hover:!bg-gray-50"
              >
                <HiArrowRight style={{ color: "black" }} />
              </Button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default CustomPagination;
