const {Contact} = require("../models/contact");

const HttpError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
}
const ctrlWrapper = ctrl => {
    const func = async(req, res, next) => {
        try {
            await ctrl(req, res, next);
        } catch (error) {
            next(error)
        }
    }

    return func;
}

const list = async(req, res)=> {
const result = await Contact.find({});
res.json(result);
}


const getById = async (req, res) => {
    const {id} = req.params;
    const result = await Contact.findOne({id: id});
    if(!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}


const addById = async(req, res)=> {
      const result = await Contact.create(req.body);
      res.status(201).json(result);
    }


  const updateById = async (req, res) => {
    const {id} = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if(!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
    }


  const updateFavorite = async (req, res) => {
    const {id} = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if(!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
    }

 const deleteById = async (req, res) => {
    const {id} = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if(!result) {
        throw HttpError(404, "Not found");
    } 
    res.json({
    message: "contact deleted"
    })
    } 


module.exports = { 
    list: ctrlWrapper(list),
    getById: ctrlWrapper(getById),
    deleteById: ctrlWrapper(deleteById),
    addById: ctrlWrapper(addById),
    updateById: ctrlWrapper(updateById),
    updateFavorite: ctrlWrapper(updateFavorite),
}