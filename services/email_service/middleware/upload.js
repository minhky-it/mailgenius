const path = require('path');
const multer = require('multer');
const fs = require('fs');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.body.user_id;
        const campaignId = req.body.campaign_id;
        const uploadPath = path.join('uploads', userId, campaignId);

        // Check if the directory exists, if not, create it
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /csv/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only CSV files are allowed!'));
        }
    }
});

module.exports = upload;