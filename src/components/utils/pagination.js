import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <ul className="flex mt-2 float-end">
            {Array.from({ length: totalPages }, (_, index) => (
                <li
                    key={index}
                    className={`mr-1 rounded cursor-pointer p-2 border border-dark-primary hover:bg-dark-primary w-[30px]  text-center ${currentPage === index + 1 ? "bg-dark-primary" : ""
                        }`}
                    onClick={() => onPageChange(index + 1)}
                >
                    {index + 1}
                </li>
            ))}
        </ul>
    );
};

export default Pagination;