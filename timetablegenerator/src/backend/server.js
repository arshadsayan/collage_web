const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const nodemailer = require('nodemailer');

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
  password: 'admin',
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
  service: 'Gmail',
  auth: {
    user: 'asiesgst@gmail.com',
    pass: 'ilnb jboi ekcf lyfp'
  },
});

app.post('/api/generate-key-and-send-otp', (req, res) => {
  const { email, password } = req.body;

  // Generate unique key
  const uniqueKey = 'unique-key-' + Date.now();

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Store user details temporarily with the OTP
  otps[email] = { password, otp, uniqueKey };

  // Send OTP via email
  const mailOptions = {
    from: 'asiesgst@gmail.com',
    to: 'parthdalvi164@gmail.com',
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending OTP' });
    }

    res.status(200).json({ message: 'OTP sent successfully', key: uniqueKey });
  });
});

app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  // Verify OTP
  if (otps[email] && otps[email].otp == otp) {
    // OTP is correct, store user in database
    const { password, uniqueKey } = otps[email];
    const query = 'INSERT INTO user_registeration (email, password, unique_key) VALUES (?, ?, ?)';
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
      res.status(200).json({ success: true, userData: { email, uniqueKey: results[0].unique_key } });
    } else {
      res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
  });
});

app.post('/api/submit', (req, res) => {
  const { personalDetails, academicDetails, cetDetails } = req.body;

  const data = {
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
    jee_percentile: cetDetails.jeePer
  };

  const query = 'INSERT INTO user_details SET ?';

  db.query(query, data, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Error inserting data' });
    }

    res.status(200).json({ message: 'Data inserted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
