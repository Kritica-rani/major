// we need to import quotation model
const Quotation = require("../model/quotation");
const User = require("../model/user");
const { create } = require("../model/user");

// create a controller to create quotation
module.exports.createQuotation = async (req, res) => {
  try {
    //1. access content from req.body
    const { content, userId } = req.body;
    const quotations = await Quotation.create({
      content: content,
      user: userId,
    });
    if (!quotations) {
      return res.status(400).json({
        message: "Something went wrong while creating quotation",
        data: {},
      });
    }
    // to push the quotationId
    const user = await User.findById(userId);
    console.log("user", user);
    user.quotation.push(quotations._id);
    user.save();

    return res.status(201).json({
      message: "Quotation created succesfully",
      data: { quotations },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong while creating quotation",
      data: err,
    });
  }
};

//delete quotation

module.exports.deleteQuotation = async (req, res) => {
  try {
    //quotation id --> req.params
    const { quotationId } = req.params;
    //delete the quotation
    const deletedQuotation = await Quotation.findByIdAndDelete(quotationId);
    if (!deletedQuotation) {
      return res.status(400).json({
        message: "Not Found",
        data: {},
      });
    }
    return res.status(200).json({
      message: "Sucess",
      data: deletedQuotation,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong while deleting quotation",
      data: err,
    });
  }
};

module.exports.EditQuotation = async (req, res) => {
  try {
    const { quotationId } = req.params;
    const { content } = req.body;
    const updatedQuotation = await Quotation.findByIdAndUpdate(
      quotationId,
      {
        content,
      },
      { new: true }
    );
    if (!updatedQuotation) {
      return res.status(400).json({
        message: "Not found",
        data: {},
      });
    }
    return res.status(200).json({
      message: "Content updated sucessfully",
      data: { updatedQuotation },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong while updating quotation",
      data: err,
    });
  }
};

// to get all quotations
module.exports.getAll = async (req, res) => {
  try {
    //1.fetch all quotation
    const quotations = await Quotation.find({});
    return res.status(200).json({
      message: "Succesfully fetched all the quotations",
      data: { quotations },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong while getting quotation",
      data: err,
    });
  }
};
