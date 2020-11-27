const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "../uploads");

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

router.get("/", (req, res) => {
    fs.readdir(filePath, "utf-8", (err, files) => {
        res.json({ msg: "success", files });
    });
});

router.get("/download", (req, res, next) => {
    let fileName = req.query.file;
    const file = path.join(filePath, fileName);
    res.download(file);
});

router.get("/download/:file", (req, res, next) => {
    let fileName = req.params.file;
    const file = path.join(filePath, fileName);
    res.download(file);
});

module.exports = router;
