import Category from "./category.model.js"

export const newCategory = async (req, res) => {
  try {
    const data = req.body

    const category = await Category.create(data)

    return res.status(201).json({
      message: "Catogory created.",
      name: category.name,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error creating category.",
      error: err.message,
    })
  }
}

export const getCategories = async (req, res) => {
  const { limit = 10, from = 5 } = req.query
  const query = { status: true }

  try {
    const categories = await Category.find(query).skip(Number(from)).limit(Number(limit))
    const total = await Category.countDocuments(query)

    return res.status(200).json({
      success: true,
      total,
      categories: categories,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Category listing failed.",
      error: err.message,
    })
  }
}

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    const category = await Category.findByIdAndUpdate(id, data, { new: true })

    return res.status(200).json({
      success: false,
      message: "Category updated.",
      category,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error updating category.",
      error: err.message,
    })
  }
}

export const removeCategory = async (req, res) => {
  try {
    const { id } = req.params

    await Caregory.findByIdAndUpdate(id, { status: false })

    return res.status(200).json({
      success: true,
      message: "Category removed.",
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error removing category.",
      error: err.message,
    })
  }
}
