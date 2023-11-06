const {Schema, model} = require("mongoose");

const handleMongooseError = (error, data, next) => {
  error.status = 400;
  next()
};

const contactSchema = new Schema({
        name: {
          type: String,
          required: [true, 'Set name for contact'],
        },
        email: {
          type: String,
        },
        phone: {
          type: String,
        },
        favorite: {
          type: Boolean,
          default: false, 
        },
      })

contactSchema.post("save" , handleMongooseError);




const Contact = model("contact", contactSchema);

module.exports = Contact;