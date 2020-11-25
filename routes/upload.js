const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// 1. 파일 위치 지정을 dest 옵션으로 할 경우
const upload = multer({ dest: "uploads/" });

// 2. 파일 저장 위치를 diskStorage()함수로 지정할 경우
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads/");
    },
    filename: (req, file, callback) => {
        console.log(file);

        let mimeType;

        switch (file.mimetype) {
            case "image/jpeg":
                mimeType = "jpg";
                break;
            case "image/png":
                mimeType = "png";
                break;
            case "image/gif":
                mimeType = "gif";
                break;
            case "image/bmp":
                mimeType = "bmp";
                break;
            default:
                mimeType = "jpg";
                break;
        }

        //console.log(mimeType);

        callback(null, Date.now() + "-" + file.originalname);
    },
});
const uploads = multer({ storage: storage });

router.post("/", upload.single("singleFile"), (req, res, next) => {
    res.redirect("/");
});

router.post("/single", uploads.single("singleFile"), (req, res, next) => {
    res.redirect("/");
});

router.post("/multi", uploads.array("multiFile"), (req, res, next) => {
    res.redirect("/");
});

module.exports = router;
