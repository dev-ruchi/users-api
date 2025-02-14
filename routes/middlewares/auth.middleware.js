import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  const { authorization } = req.headers;

  if (typeof authorization !== "string") {
    console.log("Token not found");
    res.status(401).json({ message: "Unauthenticated" });
    return;
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    res.status(401).json({ message: "Unauthenticated" });
    return;
  }

  if (!token) {
    console.log("Invalid token");
    res.status(401).json({ message: "Unauthenticated" });
    return;
  }

  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthenticated" });
  }
}