const allowedParams = ["price", "stock", "sold", "creationDate"]

export const getSortOptions = (req) => {
  if (
    !req.query.sort ||
    !allowedParams.includes(req.query.sort) ||
    !req.query.order ||
    !["asc", "desc"].includes(req.query.order)
  ) {
    return { _id: 1 }
  }
  const sortField = req.query.sort
  const sortOrder = req.query.order === "desc" ? -1 : 1
  return { [sortField]: sortOrder }
}
