const url = require('url');
const Agency = require('../models/agency');


const getAgencies = async (req, res) => {


    try {
        // Save queries made by front end
        const queryObject = req.query;
        console.log(queryObject)
        
        agencies = await getAllAgencies();

        var result = agencies;

        // Query
        if(queryObject.name != null)
        {
           result = agencies.filter(item => item.name == queryObject.name);
        }
        if(queryObject.phone != null)
        {
           result = agencies.filter(item => item.phone == queryObject.phone);
        }
        if(queryObject.supervisor != null)
        {
           result = agencies.filter(item => item.supervisor == queryObject.supervisor);
        }
        if(queryObject.supervisorRank != null)
        {
           result = agencies.filter(item => item.supervisorRank == queryObject.supervisorRank);
        }

        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

const createAgencies = async (req, res) => {

    const agency = new Agency ({
        name: req.body.name,
        supervisor: req.body.supervisor,
        supervisorRank: req.body.supervisorRank,
        phone: req.body.phone,
        email: req.body.email
    })
    
    try {
        const newAgencyItem = await agency.save();
        res.status(201).json(newAgencyItem);

    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

const getAgency = async (req, res) => {


    try {
        res.status(200).json(res.agency);
    } catch(err) {
        res.status(400).json({message:err.message});
    }

}

const deleteAgency = async (req, res) => {

    try {
        await res.agency.deleteOne();
        res.status(200).json({message: "Delete Successful."});
    } catch(err) {
        res.status(400).json({message:err.message});
    }

}

const updateAgency = async (req, res) => {


    if(req.body.name != null)
    {
        res.agency.name = req.body.name;
    }

    if(req.body.supervisor != null)
    {
        res.agency.supervisor = req.body.supervisor;
    }
    if(req.body.supervisorRank != null)
    {
        res.agency.supervisorRank = req.body.supervisorRank;
    }

    if(req.body.phone != null)
    {
        res.agency.phone = req.body.phone;
    }
    if(req.body.email != null)
    {
        res.agency.email = req.body.email;
    }

    try {
        const updatedAgency = await res.agency.save();
        res.status(200).json(updatedAgency);

    } catch(err) {
        res.status(400).json({message: err.message});

    }

}

// MIDDLEWARE
async function getAgencyById(req, res, next) {
    let agency;

    try {
        agency = await Agency.findById(req.params.id);

        if(agency == null)
        {
            return res.status(404).json({message: "Could not find specified score by ID. Check ID and try again."});
        }
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
    res.agency = agency;
    next();
}

// Internal Private helper function
async function getAllAgencies()
{
    agencies = await Agency.find();

    return agencies;
}

module.exports = {
    getAgencies,
    createAgencies,
    getAgency,
    deleteAgency,
    updateAgency,
    getAgencyById
}