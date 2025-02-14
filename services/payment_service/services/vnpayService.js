const Support = require("../supports/index.js");
const moment = require("moment");
const Transaction = require("../models/Transaction.js");
const UserPayment = require("../models/UserPayment.js");
const redis = require("../redis/index.js");
// Code from VNPAY SANDBOX API Reference
const createPaymentURL = async (config, user) => {
	try {
		const user_id = user.id;
		process.env.TZ = "Asia/Ho_Chi_Minh";

		let date = new Date();
		let createDate = moment(date).format("YYYYMMDDHHmmss");
		let ipAddr = config.ipAddr;

		let tmnCode = process.env.VNP_TmnCode;
		let secretKey = process.env.VNP_HASHSECRET;
		let vnpUrl = process.env.VNPAY_URL;
		let returnUrl = process.env.VNP_RETURN_URL;
		let orderId = moment(date).format("DDHHmmss");
		let amount = config.amount;
		let bankCode = config.bankCode;

		let locale = "vn";
		let currCode = "VND";
		let vnp_Params = {};
		vnp_Params["vnp_Version"] = "2.1.0";
		vnp_Params["vnp_Command"] = "pay";
		vnp_Params["vnp_TmnCode"] = tmnCode;
		vnp_Params["vnp_Locale"] = locale;
		vnp_Params["vnp_CurrCode"] = currCode;
		vnp_Params["vnp_TxnRef"] = orderId;
		vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
		vnp_Params["vnp_OrderType"] = "other";
		vnp_Params["vnp_Amount"] = amount * 100;
		vnp_Params["vnp_ReturnUrl"] = returnUrl;
		vnp_Params["vnp_IpAddr"] = ipAddr;
		vnp_Params["vnp_CreateDate"] = createDate;
		if (bankCode !== null && bankCode !== "") {
			vnp_Params["vnp_BankCode"] = bankCode;
		}

		vnp_Params = sortObject(vnp_Params);

		let querystring = require("qs");
		let signData = querystring.stringify(vnp_Params, { encode: false });
		let crypto = require("crypto");
		let hmac = crypto.createHmac("sha512", secretKey);
		let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
		vnp_Params["vnp_SecureHash"] = signed;

		// Store in db
		const transaction = new Transaction({
			user_id: user_id,
			platform: "VNPAY",
			platform_id: orderId,
			request_id: Support.generateRequestId(),
			transaction_type: bankCode,
			amount,
			status: "pending",
		});
		await transaction.save();
		vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

		return vnpUrl;
	} catch (error) {
		throw new Error(`Error creating payment URL | ${error.message}`);
	}
};

const getIPN = async (query) => {
	try {
		// Code from VNPAY.SANDBOX API
		var vnp_Params = query;
		var secureHash = vnp_Params["vnp_SecureHash"];

		delete vnp_Params["vnp_SecureHash"];
		delete vnp_Params["vnp_SecureHashType"];

		vnp_Params = sortObject(vnp_Params);
		var secretKey = process.env.VNP_HASHSECRET;
		var querystring = require("qs");
		var signData = querystring.stringify(vnp_Params, { encode: false });
		var crypto = require("crypto");
		var hmac = crypto.createHmac("sha512", secretKey);
		var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

		if (secureHash === signed) {
			var orderId = vnp_Params["vnp_TxnRef"];
			var rspCode = vnp_Params["vnp_ResponseCode"];
			//Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
			res.status(200).json({ RspCode: "00", Message: "success" });
		} else {
			res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
		}
	} catch (error) {
		throw new Error(`Error getting IPN | ${error.message}`);
	}
};

const returnURL = async (query) => {
	try {
		var vnp_Params = query;

		var secureHash = vnp_Params["vnp_SecureHash"];

		delete vnp_Params["vnp_SecureHash"];
		delete vnp_Params["vnp_SecureHashType"];

		vnp_Params = sortObject(vnp_Params);

		var tmnCode = process.env.VNP_TmnCode;
		var secretKey = process.env.VNP_HASHSECRET;

		var querystring = require("qs");
		var signData = querystring.stringify(vnp_Params, { encode: false });
		var crypto = require("crypto");
		var hmac = crypto.createHmac("sha512", secretKey);
		var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
		
		if (secureHash === signed) {
			//Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
			const RspCode = vnp_Params["vnp_ResponseCode"];

			if(RspCode === "00"){
				// Success
				if(vnp_Params["vnp_TmnCode"] !== tmnCode){
					throw new Error("TmnCode not match");
				}
				const transaction = await Transaction.findOne({platform_id: vnp_Params["vnp_TxnRef"]});
				if(!transaction){
					throw new Error("Transaction not found");
				}

				if(!(transaction.amount === (vnp_Params["vnp_Amount"]/100))){
					throw new Error("Amount not match");
				}
				

				const User = await UserPayment.findOne({user_id: transaction.user_id});

				if(!User){
					throw new Error("User not found");
				}
				if(transaction.status !== "success"){
					User.coins += transaction.amount;
					transaction.status = "success";
					await transaction.save();
					await User.save();
					
				}
				const cacheKey = `payment:${transaction.user_id}`;
				await redis.del(cacheKey);
				vnp_Params["vnp_Amount"] = vnp_Params["vnp_Amount"]/100;
				return  {...vnp_Params};
				
			}
			else if(RspCode === "01"){
				if(vnp_Params["vnp_TmnCode"] !== tmnCode){
					throw new Error("TmnCode not match");
				}
				const transaction = await Transaction.findOne({platform_id: vnp_Params["vnp_TxnRef"]});
				if(!transaction){
					throw new Error("Transaction not found");
				}

				const User = await UserPayment.findOne({user_id: transaction.user_id});

				if(!User){
					throw new Error("User not found");
				}
				if(transaction.status !== "pending"){
					transaction.status = "pending";
					await transaction.save();
					await User.save();
					
				}
				vnp_Params["vnp_Amount"] = vnp_Params["vnp_Amount"]/100;
				return  {...vnp_Params};
			}else if(RspCode === "24"){
				if(vnp_Params["vnp_TmnCode"] !== tmnCode){
					throw new Error("TmnCode not match");
				}
				const transaction = await Transaction.findOne({platform_id: vnp_Params["vnp_TxnRef"]});
				if(!transaction){
					throw new Error("Transaction not found");
				}

				const User = await UserPayment.findOne({user_id: transaction.user_id});

				if(!User){
					throw new Error("User not found");
				}
				if(transaction.status !== "failed"){
					transaction.status = "failed";
					await transaction.save();
					await User.save();
					
				}
				vnp_Params["vnp_Amount"] = vnp_Params["vnp_Amount"]/100;
				return  {...vnp_Params};
			}
			return { code: vnp_Params["vnp_ResponseCode"], data: vnp_Params };
		} else {
			return { code: "97" };
		}
	} catch (error) {
		throw new Error(`Error in return URL | ${error.message}`);
	}
};

function sortObject(obj) {
	var sorted = {};
	var str = [];
	var key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) {
			str.push(encodeURIComponent(key));
		}
	}
	str.sort();
	for (key = 0; key < str.length; key++) {
		sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
	}
	return sorted;
}
module.exports = vnpayService = {
	createPaymentURL,
	getIPN,
	returnURL,
};
