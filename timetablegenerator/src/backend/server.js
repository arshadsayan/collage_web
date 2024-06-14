const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3001; // or any other port you prefer

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// MySQL connection setup
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'admin',
//   database: 'reg_portal' // Your database name
// });

// db.connect(err => {
//   if (err) {
//     console.error('Error connecting to MySQL database:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });
let data = {};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const personalDetails = JSON.parse(req.body.personalDetails);
    const dirname = personalDetails.email;
    
    const uploadPath = path.join(__dirname, dirname);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

  const upload = multer({ storage: storage });

app.post('/api/submit', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'marksheet10', maxCount: 1 },
  { name: 'leavingCertificate12', maxCount: 1 },
  { name: 'marksheet12', maxCount: 1 },
  { name: 'cetMarksheet', maxCount: 1 },
  { name: 'jeeMarksheet', maxCount: 1 },
  { name: 'signature', maxCount: 1 }
]), (req, res) => {
  const personalDetails = JSON.parse(req.body.personalDetails);
  const academicDetails = JSON.parse(req.body.academicDetails);
  const cetDetails = JSON.parse(req.body.cetDetails);
  data = {
    id:1,
    fullname: personalDetails.fullName,
    email: personalDetails.email,
    mobile_number: personalDetails.mobileNumber,
    date_of_birth: personalDetails.dateofBirth,
    father_name: personalDetails.fathersName,
    father_occupation: personalDetails.fathersOccupation,
    father_mobile_number: personalDetails.fathersmobileNumber,
    mother_name: personalDetails.mothersName,
    mother_occupation: personalDetails.mothersOccupation,
    mother_mobile_number: personalDetails.mothersmobileNumber,
    sex: personalDetails.sex,
    annual_income: personalDetails.annualIncome,
    corres_address: personalDetails.corrAddr,
    permanent_address: personalDetails.perAddr,
    area: personalDetails.area,
    category: personalDetails.category,
    nationality: personalDetails.nationality,
    religion: personalDetails.religion,
    domicile: personalDetails.domicile,
    mother_tongue: personalDetails.mothersTongue,
    hsc_maths: academicDetails.hscmathsMarks,
    hsc_physics: academicDetails.hscphysicsMarks,
    hsc_chemistry: academicDetails.hscchemistryMarks,
    hsc_pcm_percentage: academicDetails.hscpcmPercentage,
    hsc_vocational_subject_name: academicDetails.hscvocationalSub,
    hsc_vocational_subject_percentage: academicDetails.hscvocationalsubjectPer,
    '10th_board_name': academicDetails.sscBoard,
    '10th_year_of_passing': academicDetails.sscyearofPass,
    '10th_total_marks': academicDetails.ssctotalMarks,
    '10th_marks_obtained': academicDetails.sscmarksObtained,
    '10th_percentage': academicDetails.sscPercentage,
    '12th_board_name': academicDetails.hscBoard,
    '12th_year_of_passing': academicDetails.hscyearofPass,
    '12th_total_marks': academicDetails.hsctotalMarks,
    '12th_marks_obtained': academicDetails.hscmarksObtained,
    '12th_percentage': academicDetails.hscPercentage,
    cet_application_id: cetDetails.cetappId,
    cet_roll_number: cetDetails.cetrollNo,
    cet_maths_percentile: cetDetails.cetmathsPer,
    cet_physics_percentile: cetDetails.cetphysicsPer,
    cet_chemistry_percentile: cetDetails.cetchemistryPer,
    jee_application_number: cetDetails.jeeappNum,
    jee_percentile: cetDetails.jeePer,
    marksheet10: req.files['marksheet10'] ? req.files['marksheet10'][0].path : null,
    leavingCertificate12: req.files['leavingCertificate12'] ? req.files['leavingCertificate12'][0].path : null,
    marksheet12: req.files['marksheet12'] ? req.files['marksheet12'][0].path : null,
    cetMarksheet: req.files['cetMarksheet'] ? req.files['cetMarksheet'][0].path : null,
    jeeMarksheet: req.files['jeeMarksheet'] ? req.files['jeeMarksheet'][0].path : null,
    signature: req.files['signature'] ? req.files['signature'][0].path : null
  };

  const query = 'INSERT INTO user_details SET ?';
  console.log(data)
  return res.render(data);

  // db.query(query, data, (err, result) => {
  //   if (err) {
  //     console.error('Error inserting data:', err);
  //     return res.status(500).json({ message: 'Error inserting data' }); // Send JSON response on error
  //   }

  //   res.status(200).json({ message: 'Data inserted successfully' }); // Send JSON response on success
  // });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
