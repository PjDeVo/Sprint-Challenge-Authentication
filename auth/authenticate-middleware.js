/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");

function restrict(role = "admin") {
  return async (req, res, next) => {
    const authError = {
      message: "Sorry, you do not have permission for that",
    };
    try {
      const token = req.cookies.token;

      if (!token) {
        res.status(404).json(authError);
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
        if (err || decodedPayload.userRole !== role) {
          return res.status(401).json(authError);
        }

        req.token = decodedPayload;

        next();
      });
    } catch (error) {
      res.status(404).json(error);
    }
  };
}
module.exports = restrict;

// module.exports = (req, res, next) => {
//   res.status(401).json({ you: "shall not pass!" });
// };
