import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const [maxVisiblePages, setMaxVisiblePages] = useState(5);

    useEffect(() => {
        const handleResize = () => {
            setMaxVisiblePages(window.innerWidth < 640 ? 3 : 5);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const displayPageNumbers = () => {
        const pages = [];
        const halfVisible = Math.floor(maxVisiblePages / 2);

        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        pages.push(
            <li
                key="1"
                className={`min-w-[2.5rem] h-10 flex items-center justify-center px-3 rounded-md text-sm font-medium cursor-pointer transition-all duration-200 border border-gray-300 dark:border-gray-600 hover:bg-light-primary dark:hover:bg-dark-primary hover:text-white hover:scale-110 active:scale-95 hover:border-transparent dark:text-gray-200 ${currentPage === 1 ? "bg-light-primary dark:bg-dark-primary text-white border-transparent shadow-lg transform scale-105 cursor-default" : ""
                    }`}
                onClick={() => currentPage !== 1 && onPageChange(1)}
            >
                1
            </li>
        );

        if (startPage > 2) {
            pages.push(
                <li key="ellipsis1" className="min-w-[2.5rem] h-10 flex items-center justify-center text-gray-500 dark:text-gray-400 cursor-default">
                    ...
                </li>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            if (i === 1 || i === totalPages) continue;
            pages.push(
                <li
                    key={i}
                    className={`min-w-[2.5rem] h-10 flex items-center justify-center px-3 rounded-md text-sm font-medium cursor-pointer transition-all duration-200 border border-gray-300 dark:border-gray-600 hover:bg-light-primary dark:hover:bg-dark-primary hover:text-white hover:scale-110 active:scale-95 hover:border-transparent dark:text-gray-200 ${currentPage === i ? "bg-light-primary dark:bg-dark-primary text-white border-transparent shadow-lg transform scale-105 cursor-default" : ""
                        }`}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </li>
            );
        }

        if (endPage < totalPages - 1) {
            pages.push(
                <li key="ellipsis2" className="min-w-[2.5rem] h-10 flex items-center justify-center text-gray-500 dark:text-gray-400 cursor-default">
                    ...
                </li>
            );
        }

        if (totalPages > 1) {
            pages.push(
                <li
                    key={totalPages}
                    className={`min-w-[2.5rem] h-10 flex items-center justify-center px-3 rounded-md text-sm font-medium cursor-pointer transition-all duration-200 border border-gray-300 dark:border-gray-600 hover:bg-light-primary dark:hover:bg-dark-primary hover:text-white hover:scale-110 active:scale-95 hover:border-transparent dark:text-gray-200 ${currentPage === totalPages ? "bg-light-primary dark:bg-dark-primary text-white border-transparent shadow-lg transform scale-105 cursor-default" : ""
                        }`}
                    onClick={() => currentPage !== totalPages && onPageChange(totalPages)}
                >
                    {totalPages}
                </li>
            );
        }

        return pages;
    };

    return (
        <nav className="flex justify-center items-center my-8" aria-label="Pagination">
            <ul className="flex items-center gap-1 sm:gap-2">
                <li
                    className={`flex items-center justify-center w-10 h-10 rounded-md cursor-pointer transition-all duration-200 border border-gray-300 dark:border-gray-600 hover:bg-light-primary dark:hover:bg-dark-primary hover:text-white hover:scale-110 active:scale-95 hover:border-transparent dark:text-gray-200 ${currentPage === 1 ? "opacity-50 cursor-not-allowed hover:bg-transparent dark:hover:bg-transparent hover:text-current hover:scale-100 hover:border-gray-300 dark:hover:border-gray-600" : ""
                        }`}
                    onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                >
                    <IoIosArrowBack className="w-5 h-5" />
                </li>
                {displayPageNumbers()}
                <li
                    className={`flex items-center justify-center w-10 h-10 rounded-md cursor-pointer transition-all duration-200 border border-gray-300 dark:border-gray-600 hover:bg-light-primary dark:hover:bg-dark-primary hover:text-white hover:scale-110 active:scale-95 hover:border-transparent dark:text-gray-200 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed hover:bg-transparent dark:hover:bg-transparent hover:text-current hover:scale-100 hover:border-gray-300 dark:hover:border-gray-600" : ""
                        }`}
                    onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                >
                    <IoIosArrowForward className="w-5 h-5" />
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;