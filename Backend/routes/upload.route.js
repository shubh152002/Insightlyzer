import express from "express";
import multer from "multer";
import path from "path";
import xlsx from "xlsx";
import UploadData from "../models/UploadData.model.js";
import isAuthenticated from "../middleware/isAunthenticated.js";

const router = express.Router();

// 1. Multer memory storage
const storage = multer.memoryStorage();

// 2. Accept only Excel/CSV files
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".csv" && ext !== ".xlsx" && ext !== ".xls") {
      return cb(new Error("Only Excel or CSV files are allowed"));
    }
    cb(null, true);
  },
});

// 3. Route to handle upload
router.post("/",isAuthenticated, upload.single("file"), async (req, res) => {
  try {
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });

    // 👇 Duplicate file check
    const fileName = req.file.originalname;

    const already = await UploadData.findOne({ fileName,user:req.user.id });
    if (already) {
      return res.status(409).json({
        success: false,
        message: "File already exists",
      });
    }

    // 4. Read Excel buffer using xlsx
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });

    const sheetName = workbook.SheetNames[0]; // First sheet
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert to JSON

    await UploadData.create({ fileName, data: sheetData, user: req.user.id });

    // res.status(200).json({
    //   success: true,
    //   message: 'File uploaded and data saved to database',
    // });

    // 5. Return data to frontend
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: sheetData,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ Get all uploaded data (for user history)
router.get("/all",isAuthenticated, async (req, res) => {
  try {
    const uploads = await UploadData.find({user: req.user.id}).sort({ uploadedAt: -1 }); // latest first
    res.status(200).json({
      success: true,
      data: uploads,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ GET file by ID for analysis
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const file = await UploadData.findOne({
      _id: req.params.id,
      user: req.user.id, // ✅ ensures user can only fetch their file
    });

    if (!file) {
      return res.status(404).json({ success: false, message: "File not found" });
    }

    res.status(200).json({ success: true, data: file.data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


export default router;
