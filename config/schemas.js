export const userSchema = {
  type: "object",
  properties: {
    _id: { type: "string", description: "The unique identifier of the user" },
    name: { type: "string", maxLength: 25, description: "The user's first name" },
    lastName: { type: "string", maxLength: 25, description: "The user's last name" },
    username: { type: "string", minLength: 5, maxLength: 25, description: "The user's unique username" },
    email: { type: "string", format: "email", description: "The user's email address" },
    password: { type: "string", description: "The hashed password (not returned in responses)" },
    phone: { type: "string", minLength: 8, maxLength: 10, description: "The user's phone number (optional)" },
    profilePicture: { type: "string", description: "The filename of the user's profile picture", example: "default-pfp.png" },
    role: { type: "string", enum: ["ADMIN", "USER"], description: "The user's role" },
    status: { type: "boolean", description: "The user's account status", example: true },
  },
  required: ["name", "lastName", "username", "email", "password", "role"],
}