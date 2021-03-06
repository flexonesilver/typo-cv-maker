/**
 * MOST Web Framework Model Listener
 * Created by kbarbounakis on 2015-11-22.
 */

/**
 * @param {DataEventArgs} event
 * @param {function(Error=)} callback
 */
exports.beforeSave = function (event, callback) {
    try {
        var context = event.model.context;
        if (event.state!=1) { return callback(); }
        //save account
        var user = {
            name:event.target.email,
            external: event.target.external ? true: false,
            description:event.target.description,
            external:event.target.external,
            image:event.target.image,
            groups:event.target.groups || [
                { name:'Users' }
            ]
        };
        context.model('User').save(user, function(err) {
            event.target.user = user;
            callback(err);
        });
    }
    catch (e) {
        callback(e)
    }
};
