import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export async function authenticateUser(req, _, next) {
  console.log("Auth Middleware() called ✅");
  const { token } = req.cookies;
   if (!token) {
     // ✅ Forward the error instead of throwing directly
     return next(new UnauthenticatedError("Authentication-Invalid!"));
   }
  if (!token) throw new UnauthenticatedError("Authentication-Invalid!");
  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (err) {
    console.log(err.message);
    throw new UnauthenticatedError("Authentication-Invalid!");
  }
}
