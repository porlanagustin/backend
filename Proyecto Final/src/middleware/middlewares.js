import logger from "../lib/logger.js";

const invalidUrl = (req, res, next) => {
    logger.warn({
        method: req.method,
        url: req.url
    });
    res.render("routing-error");
};

const requireAuth = (req, res, next) => {
    if (!req.session.passport || !req.session.passport.user) {
      const redirectUrl = "/login";
      return res.redirect(redirectUrl);
    }
  
    next();
  };

export const middlewares = { invalidUrl, requireAuth};