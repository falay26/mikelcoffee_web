import _ from "lodash";

const PaginationRange = (totalPage, page, limit, siblings) => {
  let totalPageNumber = 7 + siblings;
  if (totalPageNumber >= totalPage) {
    return _.range(1, totalPage + 1);
  }
  let leftSiblingsIndex = Math.max(page - siblings, 1);
  let rigthSiblingsIndex = Math.min(page + siblings, totalPage);

  let showLeftDots = leftSiblingsIndex > 2;
  let showRightDots = rigthSiblingsIndex < totalPage - 2;

  if (!showLeftDots && showRightDots) {
    let leftItemsCount = 3 + 2 * siblings;
    let leftRange = _.range(1, leftItemsCount + 1);
    return [...leftRange, " ...", totalPage];
  } else if (showLeftDots && !showRightDots) {
    let rightItemsCount = 3 + 2 * siblings;
    let rightRange = _.range(totalPage - rightItemsCount + 1, totalPage + 1);
    return [1, "... ", ...rightRange];
  } else {
    let middleRange = _.range(leftSiblingsIndex, rigthSiblingsIndex + 1);
    return [1, "... ", ...middleRange, " ...", totalPage];
  }
};

export default PaginationRange;
