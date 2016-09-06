// placeholder for server utility functions
// that are not related to database
var bcrypt = require('bcrypt-nodejs');

exports.encryptPassword = function(user, cb) {

  var SALT_WORK_FACTOR = 10;

  // only hash the password if it has been modified (or is new)
  console.log('is user modified ' + !user.isModified('password'))
  if (!user.isModified('password')) return cb();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        cb();
    });
  });
};

// compare to encrypted password
exports.comparePassword = function(pwd, user, cb) {
  bcrypt.compare(pwd, user.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

// get user from database
exports.findByUsername = function (username, cb) {
  User.findOne({ username: username }, cb);
};


