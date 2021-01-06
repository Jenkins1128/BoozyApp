const usersController = require('../controllers').users;
const restaurantsController = require('../controllers').restaurants;
const yelpController = require('../controllers').yelp;
const verifyPlz = require('../controllers/verify')

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Boozy App!',
    }));
     
    // REGISTER
    app.post('/api/register', usersController.create);

    // LOGIN & LOGOUT 
    app.post('/api/login', usersController.login);
    app.post('/api/logout', verifyPlz, usersController.logout);

    // Add to user
    app.post('/api/user/:resId/restaurants', verifyPlz, restaurantsController.review);
    app.post('/api/user/:resId/menu', verifyPlz, restaurantsController.item);
    app.post('/api/user/add', verifyPlz, restaurantsController.Joint);
    
    // List items 
    app.get('/api/get', verifyPlz, restaurantsController.retrieve);
    app.post('/api/favorites', verifyPlz, restaurantsController.favs);
    app.get('/api/:resId/review', verifyPlz, restaurantsController.reviewCheck);
    app.post('/api/menu/list', verifyPlz, restaurantsController.list);

    // YELP calls
    app.get('/api/yelp/:lat/:long', verifyPlz, yelpController.load);
    app.get('/api/yelp/:search', verifyPlz, yelpController.call);
    app.get('/api/yelp/:search/:price/:term', verifyPlz, yelpController.filter);
}

