var keystone = require('keystone'),
    admin = keystone.list('admin');
    system = keystone.list('system');
 
exports = module.exports = function(done) {
    
    new admin.model({
        email: 'super',
        password: 'superliu',
        name: '刘超',
        signDate: new Date()
    }).save(done);
    
    new system.model({
        name: '勿动',
        component_verify_ticket: '',
        component_access_token: '',
        pre_auth_code: ''
    }).save(done);
    
};
