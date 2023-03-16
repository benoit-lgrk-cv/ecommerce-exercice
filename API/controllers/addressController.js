const Address = require('../models/adressModel');
const User = require('../models/userModel');

module.exports = {
    postAddress: async (req, res) => {
         
        await Address.create({
            addressName: req.body.adressName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            number: req.body.number,
            street: req.body.street,
            postCode: req.body.postCode,
            city: req.body.city,
            contry: req.body.body,
            userId: req.params.id
         });
        res.redirect('/sign-in')
    },
}