import multer from "multer"
import { dirname, extname, join } from "path"
import { fileURLToPath } from "url"

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))
const MIMETYPES = ["image/png", "image/jpg", "image/jpeg"]
const MAX_SIZE = 100000000
const PFP_DIR = "../../public/uploads/pictures/profile"

const createMulterConfig = (destinationFolder) => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const fullPath = join(CURRENT_DIR, destinationFolder)
        req.filePath = fullPath
        cb(null, fullPath)
      },
      filename: (req, file, cb) => {
        const fileExtension = extname(file.originalname)
        const fileName = file.originalname.split(fileExtension)[0]
        destinationFolder == PFP_DIR
          ? cb(null, `user-profile-${Date.now()}${fileExtension}`)
          : cb(null, `${fileName}-${Date.now()}${fileExtension}`)
      },
    }),
    fileFilter: (req, file, cb) => {
      if (MIMETYPES.includes(file.mimetype)) cb(null, true)
      else cb(new Error(`Only these file extensions are supported: ${MIMETYPES.join(" ")}`))
    },
    limits: {
      fileSize: MAX_SIZE,
    },
  })
}

export const uploadProfilePicture = createMulterConfig(PFP_DIR)
