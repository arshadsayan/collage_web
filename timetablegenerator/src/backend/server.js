const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MySQL123',
  database: 'reg_portal'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Temporary storage for OTPs (consider using a more robust solution in production)
const otps = {};

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'asiesgst@gmail.com',
    pass: 'ilnb jboi ekcf lyfp'
  }
});

app.post('/api/generate-key-and-send-otp', (req, res) => {
  const { email, password } = req.body;

  // Generate unique key
  const uniqueKey =  Date.now();

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store user details temporarily with the OTP
  otps[email] = { password, otp, uniqueKey };

  // Send OTP via email
  const mailOptions = {
    from: 'asiesgst@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending OTP' + info });
    }

    res.status(200).json({ message: 'OTP sent successfully', key: uniqueKey });
  });
});

app.post('/api/check', (req, res) => {
  const { email, formType } = req.body;

  const query = 'SELECT * FROM user_details WHERE email = ? AND formType = ?';
  db.query(query, [email, formType], (err, results) => {
    if (err) {
      console.error('Error querying data:', err);
      return res.status(500).json({ message: 'Error querying data' });
    }

    if (results.length > 0) {
      res.status(200).json({ success: true, key: 0 });
    } else {
      res.status(200).json({ success: true, key: 1 });
    }
  });
});

app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  // Verify OTP
  if (otps[email] && otps[email].otp == otp) {
    // OTP is correct, store user in database
    const { password, uniqueKey } = otps[email];
    const query = 'INSERT INTO user_registration (email, password, id) VALUES (?, ?, ?)';
    db.query(query, [email, password, uniqueKey], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ message: 'Error inserting data' });
      }
      // OTP is correct, remove it from the temporary store
      delete otps[email];
      res.status(200).json({ success: true });
    });
  } else {
    res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
});

app.post('/api/signin', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists and the password matches
  const query = 'SELECT id FROM user_registration WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error querying data:', err);
      return res.status(500).json({ message: 'Error querying data' });
    }

    if (results.length > 0) {
      const userId = results[0].id;
      res.status(200).json({ success: true, userData: { email, uniqueKey: results[0].unique_key, userId  }});
    } else {
      res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
  });
});

// let data = {};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const personalDetails = JSON.parse(req.body.personalDetails);
    const dirname = personalDetails.email.toString();
    console.log(dirname);
    console.log(typeof(dirname))
    
    const uploadPath =  `public/${dirname}`;
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // const fileString = this.filename;
    // console.log(file.fieldname.toString());
    // console.log(fileString); 
    const fileType = file.mimetype;
    if(fileType === 'application/pdf'){
      cb(null, `${file.fieldname.toString()}.pdf`);
    }
    else if(fileType === 'image/jpeg'){
      cb(null, `${file.fieldname.toString()}.jpeg`);
    }
    else if(fileType === 'image/png'){
      cb(null, `${file.fieldname.toString()}.png`);
    }

    
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
  { name: 'domicilecert', maxCount: 1 },
  { name: 'castecertificate', maxCount: 1 },
  { name: 'castevalidity', maxCount: 1 },
  { name: 'noncreamylayer', maxCount: 1 },
  { name: 'income', maxCount: 1 },
  { name: 'transactionproof', maxCount: 1 },
  { name: 'other', maxCount: 1 },
  { name: 'signature', maxCount: 1 }
]), (req, res) => {
  const personalDetails = JSON.parse(req.body.personalDetails);
  const academicDetails = JSON.parse(req.body.academicDetails);
  const cetDetails = JSON.parse(req.body.cetDetails);
  const preferences = JSON.parse(req.body.preferences); // Parse preferences
  const formData1 = JSON.parse(req.body.formData1);
  const formType = req.body.formType;
  // const transactionDetails = JSON.parse(req.body.transactionDetails);
  
  // Retrieve the user's id from the user_registration table using the email
  const getUserQuery = 'SELECT id FROM user_registration WHERE email = ?';
  db.query(getUserQuery, [personalDetails.email], (err, results) => {
    if (err) {
      console.error('Error querying data:', err);
      return res.status(500).json({ message: 'Error querying data' });
    }

    if (results.length > 0) {
      const userId = results[0].id;
      

      const data = {
        id: userId, // Add the id field
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
        annual_income: personalDetails.annualIncome.replace(/₹/g, ''),
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
        hsc_vocational_subject_percentage: academicDetails.hscvovationalsubjectPer,
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
        cet_percentile: cetDetails.cetPer,
        cet_maths_percentile: cetDetails.cetmathsPer,
        cet_physics_percentile: cetDetails.cetphysicsPer,
        cet_chemistry_percentile: cetDetails.cetchemistryPer,
        jee_application_number: cetDetails.jeeappNum,
        jee_percentile: cetDetails.jeePer,
        photo: req.files['photo'] ? req.files['photo'][0].path : null,
        marksheet10: req.files['marksheet10'] ? req.files['marksheet10'][0].path : null,
        leavingCertificate12: req.files['leavingCertificate12'] ? req.files['leavingCertificate12'][0].path : null,
        marksheet12: req.files['marksheet12'] ? req.files['marksheet12'][0].path : null,
        cetMarksheet: req.files['cetMarksheet'] ? req.files['cetMarksheet'][0].path : null,
        jeeMarksheet: req.files['jeeMarksheet'] ? req.files['jeeMarksheet'][0].path : null,
        domicilecert: req.files['domicilecert'] ? req.files['domicilecert'][0].path : null,
        castecertificate: req.files['castecertificate'] ? req.files['castecertificate'][0].path : null,
        castevalidity: req.files['castevalidity'] ? req.files['castevalidity'][0].path : null,
        noncreamylayer: req.files['noncreamylayer'] ? req.files['noncreamylayer'][0].path : null,
        income: req.files['income'] ? req.files['income'][0].path : null,
        transaction_proof: req.files['transactionproof'] ? req.files['transactionproof'][0].path : null,
        other: req.files['other'] ? req.files['other'][0].path : null,
        signature: req.files['signature'] ? req.files['signature'][0].path : null,
        preferences: JSON.stringify(preferences).replace(/'/g, '"'),
        transaction_date: formData1.date,
        transaction_amount: formData1.amount,
        transaction_id: formData1.transactionId,
        transaction_against: formData1.paymentAgainst,
        formType:formType
      };

      const query = 'INSERT INTO user_details SET ?';
      db.query(query, data, (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          return res.status(500).json({ message: 'Error inserting data' });
        }

        res.status(200).json({ message: 'Data inserted successfully'});
      });
    } else {
      res.status(400).json({ message: 'User not found' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
