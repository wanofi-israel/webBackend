const mongoose = require("mongoose");
const QRCode = require("qrcode");

const businessCardSchema = new mongoose.Schema({
  name: { type: String, required: [true, "cannot be empty"] },
  phone: { type: String, required: [true, "cannot be empty"] },
  email: { type: String, required: [true, "cannot be empty"] },
  company: { type: String, required: [true, "cannot be empty"] },
  jobTitle: { type: String, required: [true, "cannot be empty"] },
  website: { type: String, required: [true, "cannot be empty"] },
  address: { type: String, required: [true, "cannot be empty"] },
  banner: { type: String, required: [true, "cannot be empty"] },
  photo: { type: String, required: [true, "cannot be empty"] },

  // ⭐ base64 QR image
  qr: String
});


// ⭐ Generate URL QR → store as Base64
businessCardSchema.pre("save", async function () {
  try {
    // only generate once
    if (!this.isNew || this.qr) return;

    const BASE_URL = process.env.APP_URL || "http://localhost:5173";
    const dataToEncode = `${BASE_URL}/business_card/${this._id}`;

    const qrBase64 = await QRCode.toDataURL(dataToEncode, {
      errorCorrectionLevel: "H",
      margin: 1,
      width: 500
    });

    this.qr = qrBase64;

    // console.log("✅ QR stored in DB");
  } catch (err) {
    // console.error("QR error:", err);
    throw err; // important for mongoose error handling
  }
});


module.exports = mongoose.model("businesscard", businessCardSchema);
