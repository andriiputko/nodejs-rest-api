const express = require('express')
const ctrl = require("../../controllers/contacts")
const router = express.Router()
const schemas = require("../../schemas/contacts")

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if(!isValidObjectId(id)) {
      next(HttpError(400, `${id} is not valid id`))
  }
  next();
}

const validateBody = schema => {
  const func = (req, res, next) => {
      const {error} = schema.validate(req.body);
      if(error) {
        next(HttpError(400, error.message));
      }
      next()
  }
  return func;
}


router.get("/", ctrl.list);


router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addById);

router.delete('/:id', isValidId, ctrl.deleteById);

router.put('/:id', isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch('/:id/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

module.exports = router