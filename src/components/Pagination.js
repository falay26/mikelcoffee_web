/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React from "react";
//PaginationHelper
import PaginationRange from "../helpers/PaginationRange";

const Pagination = ({ dataPerPage, totalData, paginate, currentPage }) => {
  let pagination_array = PaginationRange(
    Math.ceil(totalData / dataPerPage),
    currentPage,
    dataPerPage,
    4
  );

  if (totalData > dataPerPage) {
    return (
      <div>
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <span
              className="page-link"
              onClick={() => {
                paginate(1);
              }}
            >
              &laquo;
            </span>
          </li>
          <li className="page-item">
            <span
              className="page-link"
              onClick={() => {
                if (currentPage !== 1) {
                  paginate((prev) => prev - 1);
                }
              }}
            >
              &lsaquo;
            </span>
          </li>
          {pagination_array.map((number) => (
            <li
              key={number}
              className={
                currentPage === number ? "page-item active" : "page-item"
              }
            >
              <a
                onClick={() => {
                  if (
                    number !== "..." &&
                    number !== " ..." &&
                    number !== "... "
                  ) {
                    paginate(number);
                  }
                }}
                href="javascript:void(0)"
                className="page-link"
              >
                {number}
              </a>
            </li>
          ))}
          <li className="page-item">
            <span
              className="page-link"
              onClick={() => {
                if (currentPage !== Math.ceil(totalData / dataPerPage)) {
                  paginate((prev) => prev + 1);
                }
              }}
            >
              &rsaquo;
            </span>
          </li>
          <li className="page-item">
            <span
              className="page-link"
              onClick={() => {
                paginate(Math.ceil(totalData / dataPerPage));
              }}
            >
              &raquo;
            </span>
          </li>
        </ul>
      </div>
    );
  }
};

export default Pagination;
