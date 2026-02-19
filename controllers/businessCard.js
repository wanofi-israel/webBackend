const businessCardModel = require("../models/businesscard");
const createBusinessCard = async (req, res) => {
    console.log(req,"hello");
    
  const {
    name,
    phone,
    email,
    company,
    jobTitle,
    website,
    address,
    banner,
    photo,
  } = req.body;
  if (
    !name ||
    !phone ||
    !email ||
    !company ||
    !jobTitle ||
    !website ||
    !address ||
    !banner ||
    !photo
  ) {
    res.status(200).json({ msg: "Please complete the form" });
  }
  // Convert banner and photo to base64 if they are not already
  const toBase64 = (data) => {
    if (typeof data === "string" && data.startsWith("data:")) {
      return data; // already base64
    }
    if (Buffer.isBuffer(data)) {
      return `data:image/png;base64,${data.toString("base64")}`;
    }
    return data; // fallback, assume already base64 or invalid
  };

  const cardData = {
    ...req.body,
    banner: toBase64(req.body.banner),
    photo: toBase64(req.body.photo),
  };

  const businesscard = await businessCardModel.create(cardData);

  if (!businesscard) {
    return res.status(200).json({ msg: "something went wrong" });
  }
  res
    .status(200)
    .json({ msg: "BusinessCard created Sucessfully", card: businesscard });
};

const getAllBusinessCards = async (req, res) => {
  const businesscard = await businessCardModel.find({});

  res.status(200).json({ businesscard });
};

const getSingleBusinessCard = async (req, res) => {
  const { id: businessCardId } = req.params;
  const businesscard = await businessCardModel.findOne({ _id: businessCardId });

  if (!businesscard) {
    return res
      .status(404)
      .json({ msg: `Businesscard with id ${businessCardId} not found` });
  }

  res.status(200).json(businesscard);
};

const updateBusinessCard = async (req, res) => {
  const { id: businessCardId } = req.params;

  const businesscard = await businessCardModel.findOneAndUpdate(
    { _id: businessCardId },
    req.body,
  );

  if (!businesscard) {
    return res
      .status(200)
      .json({ msg: `Businesscard with id ${businessCardId} not found` });
  }

  res.status(200).json({ businesscard });
};
const deleteBusinessCard = async (req, res) => {
  const { id: businessCardId } = req.params;

  const businesscard = await businessCardModel.findOneAndDelete({
    _id: businessCardId,
  });

  if (!businesscard) {
    return res
      .status(200)
      .json({ msg: `Businesscard with id ${businessCardId} not found` });
  }

  res.status(200).json({ msg: "Business card deleted sucessfully !!" });
};

module.exports = {
  createBusinessCard,
  getAllBusinessCards,
  getSingleBusinessCard,
  updateBusinessCard,
  deleteBusinessCard,
};
