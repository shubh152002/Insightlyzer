import express from 'express';
import multer from 'multer';
import path from 'path';
import xlsx from 'xlsx';

const router = express.Router();

// 1. Multer memory storage
const storage = multer.memoryStorage();

// 2. Accept only Excel/CSV files
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.csv' && ext !== '.xlsx' && ext !== '.xls') {
      return cb(new Error('Only Excel or CSV files are allowed'));
    }
    cb(null, true);
  }
});

// 3. Route to handle upload
router.post('/', upload.single('file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    // 4. Read Excel buffer using xlsx
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });

    const sheetName = workbook.SheetNames[0]; // First sheet
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert to JSON

    console.log('📄 Sheet Data:', sheetData);

    // 5. Return data to frontend
    res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      data: sheetData,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
