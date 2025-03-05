export const initCart = (req, res, next) => {
  if (!req.cart) req.cart = { items: [] }
  next()
}
