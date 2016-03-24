var web = require('most-web'),
    async = require('async'),
    randoms = require('./randoms');
web.current.unattended(function(context) {

    var arr = [];
    for (var i = 0; i < 20; i++) {
        arr.push(randoms.person());
    }
    async.eachSeries(arr, function(item,cb) {
        randoms.avatar(function(err, result) {
            if (err) { return cb(err); }
            item.image = result;
            cb();
        });
    }, function(err) {
        if (err) {
            web.common.log(err);
            return process.exit(1);
        }
        else {
            context.model('Person').silent().save(arr, function(err) {
                if (err) {
                    web.common.log(err);
                    return process.exit(1);
                }
                web.common.log('The operation was completed succesfully.');
                return process.exit(0);
            });
        }
    });
});