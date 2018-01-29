
var keystone = require('keystone');

staff = keystone.list('staff');
 

const test1 = async (req, res, next) => {

    const result = await staff.model.create({
        email: 'super',
        name: 'Super',
        password: 'superliu',
        character: 'MANAGER',
    });
    res.send(result);
}

exports = module.exports = function (app) {

    app.get('/test/1', test1);

};

