const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_APP_SECRET,
});

const upload = async function (id, fileBuffer) {
	try {
		// Upload the image as a buffer stream
		const uploadResult = await new Promise((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream(
				{
					folder: "user_uploads",
					public_id: id,
				},
				(error, result) => {
					if (error) return reject(error);
					resolve(result);
				},
			);

			stream.end(fileBuffer);
		});

		// Generate the optimized URL for the image
		const optimizeUrl = cloudinary.url(`${uploadResult.public_id}`, {
			fetch_format: "auto",
			quality: "auto",
		});

		console.log("Optimized URL:", optimizeUrl);

		// Create the auto-cropped URL (optional)
		const autoCropUrl = cloudinary.url(`${uploadResult.public_id}`, {
			crop: "auto",
			gravity: "auto",
			width: 320,
			height: 320,
		});


		// Return the auto-cropped URL
		return {
			optimizedUrl: optimizeUrl,
			autoCropUrl: autoCropUrl,
			publicId: uploadResult.public_id,
			secureUrl: uploadResult.secure_url,
		};
	} catch (error) {
		console.error("Upload Failed:", error);
		throw new Error(`Image upload failed: ${error.message}`);
	}
};

const remove = async (public_id) => {
	try {
		const result = await cloudinary.api.delete_resources([public_id], {
			type: "upload",
			resource_type: "image",
		});
		return result;
	} catch (error) {
		console.error("Failed to remove image:", error);
		throw new Error(`Failed to remove image | ${error.message}`);
	}
};

module.exports = Cloudiary = {
	upload,
    remove
};
