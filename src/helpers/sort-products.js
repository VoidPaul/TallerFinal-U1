const allowedParams = ["name", "price", "stock", "sold", "creationDate"]

export const getSortOptions = (req) => {
  const { sort, order } = req.query

  if (!sort || !allowedParams.includes(req.query.sort) || !order || !["asc", "desc"].includes(req.query.order)) {
    return { _id: 1 }
  }

  if (sort === "category") {
    return { "category.name": order === "desc" ? -1 : 1 }
  }

  const sortOrder = req.query.order === "desc" ? -1 : 1
  return { [sort]: sortOrder }
}
