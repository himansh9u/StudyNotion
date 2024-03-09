const mongoose = require("mongoose");
const { Schema } = mongoose;
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const mailSender = require("../utils/mailSender");

const OTPSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		expires: 60 * 5, 
	},
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}
// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
	await sendVerificationEmail(this.email, this.otp);
	next();
});
module.exports = mongoose.model("OTP", OTPSchema);