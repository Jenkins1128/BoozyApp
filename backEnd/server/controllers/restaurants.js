const Restaurant = require('../models').restaurant;
const Review = require('../models').review;
const MenuItem = require('../models').menuItem;
const UserRestaurant = require('../models').userRestaurant

module.exports = {
    async Joint(req, res) {
        const exists = await UserRestaurant.findOne({
            where: {
                userId: req.userId.id, // CHANGED
                restaurantId: req.body.restaurantId
            }
        })
        
        if (exists)
        {
            return UserRestaurant.findOne({
                where: {
                    userId: req.userId.id, // CHANGED 
                    restaurantId: req.body.restaurantId
                }
            })
            .then(deleteMe => {
                if(!deleteMe)
                {
                    return res.status(404).send('Relationship not found');
                }
                
                return deleteMe.destroy()
                .then(() => res.status(204).send("delete"))
                .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
        }

        return UserRestaurant.create({
            userId: req.userId.id, // CHANGED 
            restaurantId: req.body.restaurantId,
            name: req.body.name
        }).then((uRestaurant) => res.status(201).send(uRestaurant))
        .catch(error => res.status(400).send(error));
    },
    async review(req, res) {
        const exists = await Restaurant.findOne({
            where: {
                id: req.params.resId
            }
        })

        if (exists) {
            return Review.create({
                content: req.body.content,
                restaurantId: req.params.resId,
                userId: req.userId.id
            }).then(review => res.status(201).send(review))
            .catch(error => res.status(400).send(error))
        }
        return Restaurant
        .create({
            name: req.body.name,
            id: req.params.resId
        })
        .then(Review.create({
            content: req.body.content,
            restaurantId: req.params.resId,
            userId: req.userId.id
        }))
        .then(review => res.status(201).send(review))
        .catch(error => res.status(400).send(error));
    },
    async reviewCheck(req, res) {
        const exists = await Review.findOne({
            where: {
                userId: req.userId.id,
                restaurantId: req.params.resId
            }
        })

        var returnMe = []

        if (exists) {
            returnMe.push({ contains: true})
            return res.status(202).send(returnMe);
        }
        else {
            returnMe.push({ contains: false });
            return res.status(202).send(returnMe);
        }
    },
    async favs(req, res) {
        const exists = await UserRestaurant.findOne({
            where: {
                userId: req.userId.id,
                restaurantId: req.body.restaurantId
            }
        })

        var returnMe = [];

        if (exists) {
            returnMe.push({ contains: true })
            return res.status(202).send(returnMe);
        }
        else {
            returnMe.push({ contains: false });
            return res.status(202).send(returnMe);
        }
    },
    async item(req, res) {
        const exists = await Restaurant.findOne({
            where: {
                id: req.params.resId,   // CHANGED ?
            }
        })

        if (exists) {
            return MenuItem.create({
                content: req.body.content,
                restaurantId: req.params.resId,
                price: req.body.price
            }).then(menuItem => res.status(201).send(menuItem))
            .catch(error => res.status(400).send(error))
        }

        return Restaurant
        .create({
            name: req.body.name,
            id: req.params.resId
        })
        .then(MenuItem.create({
            content: req.body.content,
            restaurantId: req.params.resId,
            price: req.body.price
        }))
        .then(menuitem => res.status(201).send(menuitem))
        .catch(error => res.status(400).send(error));
    },
    async retrieve(req, res) {
        return UserRestaurant.findAll({
            where: {
                userId: req.userId.id
            }
        }).then(returnMe => res.status(202).send(returnMe))
        .catch(error => res.status(400).send(error));
    },
    async list(req, res) {
        return MenuItem
        .findAll({
            where: {
                restaurantId: req.body.restaurantId
            },
        })
        .then(returnMe => res.status(202).send(returnMe))
        .catch(error => res.status(400).send(error));
    }
};