const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const Country = require('../models/country');

// Getting All (get /countries.js/)
router.get('/', async (req, res) => {
    res.render('countries');
    /*try {
        // async wait for this to find all data from model country
        const countries = await Country.find()
        res.json(countries)
    } catch (err){
        // any err 500 code is a server error
        res.status(500).json({message: err.message})
    }*/
})

// Getting One
router.get('/:id', getCountry, (req, res) => {
    res.json(res.country);
})

// Creating One
router.post('/', async (req, res) => {
    const country = new Country({
        name: req.body.name,
        continent: req.body.continent,
        countrycode: req.body.countrycode,
        population: req.body.population
    })
    try{
        const newCountry = await country.save();
        // status 201 = succesfull created object 
        // by default, status is 200 = everything was succesfull
        res.status(201).json(newCountry);
    } catch (err){
        // error 400 is user errors
        // we use 400 to display an error stating the inputs are incorrect
        res.status(400).json({message: err.message});
    }
})

// Updating One
// Using patch to update the changes only, instead of the whole file using .put()
router.patch('/:id', getCountry, async (req, res) => {
    if(req.body.name != null){
        res.country.name = req.body.name;
    }
    if(req.body.continent != null){
        res.country.continent = req.body.continent;
    }
    if(req.body.countrycode != null){
        res.country.countrycode = req.body.countrycode;
    }
    if(req.body.population != null){
        res.country.population = req.body.population;
    }
    try{
        const updatedCountry = await res.country.save();
        res.json(updatedCountry);
    } catch (err){
        res.status(400).json({message: err.message})
    }
})

// Deleting One
router.delete('/:id', getCountry, async (req, res) => {
    try{
        await res.country.remove()
        res.json({message: 'Deleted country'});
    } catch (err){
        res.status(500).json({message: err.message});
    }
})

// function to avoid redondent code, getting country id
async function getCountry(req, res, next){
    // set undefined variable
    let country;
    try{
        // find country by id, which is set in request.params.id
        country = await Country.findById(req.params.id);
        // if nothing found, return error 404
        // if error, stop code block from moving to next middleware
        if(country == null){
            return res.status(404).json({message: 'Cannot find country'});
        }
    } catch (err){
        return res.status(500).json({ message: err.message});
    }
    res.country = country;
    // on succes, move to next middleware function
    next();
}

module.exports = router