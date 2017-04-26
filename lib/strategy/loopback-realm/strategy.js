/**
 * Module dependencies.
 */
var passport = require('passport-strategy'),
    util = require('util');



function Strategy(options, verify) {
  if (typeof options == 'function') {
    verify = options;
    options = {};
  }
  if (!verify) { throw new TypeError('RealmStrategy requires a verify callback'); }



  passport.Strategy.call(this);
  this.name = 'loopback-realm';
  this._verify = verify;
  this._passReqToCallback = options.passReqToCallback;
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy);

/**
 * Authenticate request based on the contents of a form submission.
 *
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function(req, options) {
  options = options || {};
  var username = req.body.username;
  var passwd = req.body.password;
  var realm = req.body.realm;

  if (!username || !passwd) { // we don't check realm because it may be in the username with realmDelimiter
    return this.fail({ message: options.badRequestMessage || 'Missing credentials' }, 400);
  }

  var self = this;

  function verified(err, user, info) {
    if (err) { return self.error(err); }
    if (!user) { return self.fail(info); }
    self.success(user, info);
  }

  try {
    var credentials = {
      username: username,
      password: passwd,
      realm: realm,
    };
    if (self._passReqToCallback) {
      this._verify(req, credentials, verified);
    } else {
      this._verify(username, credentials, verified);
    }
  } catch (ex) {
    return self.error(ex);
  }
};

/**

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
