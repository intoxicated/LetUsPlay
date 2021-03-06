/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = function(req, res, next) {

  sails.log("isAuthenticated processing");

  if (!req.headers.token)
    return next();
    //return res.forbidden("Not authenticated to perform this action");

  var token = req.headers.token;

  sails.log("Token: " + token);

  UserManager.authenticateToken(token, function (err, user) {

    if (err)
      return res.send(500);

    if (!user)
      return res.send(404);

    req.user = user;
    next();
  });
};
