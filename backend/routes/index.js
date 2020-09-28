/**
 * API endpoints will be defined here
 */

const user = require('../controllers/user');


module.exports = (app) => {

    app.route('/demo').get(user.demo);
    app.route('/demoPost').post(user.demoPost);
    app.route('/harmonics').post(user.harmonics);
   
}
