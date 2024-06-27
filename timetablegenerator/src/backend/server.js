const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mysql2 = require('mysql2/promise');

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
    subject: 'Your OTP Code for SIESGST Admission Portal',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending OTP' + info });
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


app.post('/api/request-reset-password', (req, res) => {
  const { email } = req.body;

  const query = 'SELECT id FROM user_registration WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error querying data:', err);
      return res.status(500).json({ message: 'Error querying data' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Not a registered user' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otps[email] = { otp };

    const mailOptions = {
      from: 'asiesgst@gmail.com',
      to: email,
      subject: 'Your Password Reset OTP',
      text: `Your OTP code is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending OTP' });
      }

      res.status(200).json({ message: 'OTP sent successfully' });
    });
  });
});


////////////////////////////////prathamesh trial 3

app.post('/api/reset-password', (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (otps[email] && otps[email].otp == otp) {
    const query = 'UPDATE user_registration SET password = ? WHERE email = ?';
    db.query(query, [newPassword, email], (err, result) => {
      if (err) {
        console.error('Error updating password:', err);
        return res.status(500).json({ message: 'Error updating password' });
      }

      delete otps[email];
      res.status(200).json({ message: 'Password reset successfully' });
    });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});
//user_details_admission_SETEBE
app.post('/api/check', (req, res) => {
  const { email, formType } = req.body;
  let query;
  if (formType === 'Form A') {
    query = 'SELECT * FROM user_details WHERE email = ? AND formType = ?';
  } else if (formType === 'Form B') {
    query = 'SELECT * FROM user_details_admission1 WHERE email = ? AND formType = ?';
  } else if (formType === 'Form C') {
    query = 'SELECT * FROM user_details_admission_setebe WHERE email = ? AND formType = ?';
  } 
  else {
    return res.status(400).json({ message: 'Invalid form type' });
  }
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
  { name: 'cbse12admitcard', maxCount: 1 },
  { name: 'cetMarksheet', maxCount: 1 },
  { name: 'jeeMarksheet', maxCount: 1 },
  { name: 'domicilecert', maxCount: 1 },
  { name: 'castecertificate', maxCount: 1 },
  { name: 'castevalidity', maxCount: 1 },
  { name: 'noncreamylayer', maxCount: 1 },
  { name: 'income', maxCount: 1 },
  { name: 'transactionproof', maxCount: 1 },
  { name: 'fcregistrationcopy', maxCount: 1 },
  { name: 'other', maxCount: 1 },
  { name: 'signature', maxCount: 1 }
]), (req, res) => {
  const personalDetails = JSON.parse(req.body.personalDetails);
  const academicDetails = JSON.parse(req.body.academicDetails);
  const cetDetails = JSON.parse(req.body.cetDetails);
  const preferences = req.body.preferences ? JSON.parse(req.body.preferences) : []; // Parse preferences
  const formData1 = JSON.parse(req.body.formData1);
  const formType = req.body.formType;
  const preference = req.body.preference;
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
        birth_place: personalDetails.birthPlace,
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
        cbse_admit_card_id: academicDetails.admitCardId,
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
        cbse_admit_card_id: req.files['cbse12admitcard'] ? req.files['cbse12admitcard'][0].path : null,
        cetMarksheet: req.files['cetMarksheet'] ? req.files['cetMarksheet'][0].path : null,
        jeeMarksheet: req.files['jeeMarksheet'] ? req.files['jeeMarksheet'][0].path : null,
        domicilecert: req.files['domicilecert'] ? req.files['domicilecert'][0].path : null,
        castecertificate: req.files['castecertificate'] ? req.files['castecertificate'][0].path : null,
        castevalidity: req.files['castevalidity'] ? req.files['castevalidity'][0].path : null,
        noncreamylayer: req.files['noncreamylayer'] ? req.files['noncreamylayer'][0].path : null,
        income: req.files['income'] ? req.files['income'][0].path : null,
        transactionproof: req.files['transactionproof'] ? req.files['transactionproof'][0].path : null,
        fcregistrationcpy: req.files['fcregistrationcopy'] ? req.files['fcregistrationcopy'][0].path : null,
        other: req.files['other'] ? req.files['other'][0].path : null,
        signature: req.files['signature'] ? req.files['signature'][0].path : null,
        preferences: JSON.stringify(preferences).replace(/'/g, '"'),
        // preference: preference,
        transaction_date: formData1.date,
        transaction_amount: formData1.amount,
        transaction_id: formData1.transactionId,
        transaction_against: formData1.paymentAgainst,
        formType:formType,
        class:personalDetails.class,
        juniorCollege:personalDetails.juniorCollege
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

app.post('/api/submit2', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'marksheet10', maxCount: 1 },
  { name: 'leavingCertificate12', maxCount: 1 },
  { name: 'marksheet12', maxCount: 1 },
  { name: 'cbse12admitcard', maxCount: 1 },
  { name: 'cetMarksheet', maxCount: 1 },
  { name: 'jeeMarksheet', maxCount: 1 },
  { name: 'domicilecert', maxCount: 1 },
  { name: 'castecertificate', maxCount: 1 },
  { name: 'castevalidity', maxCount: 1 },
  { name: 'noncreamylayer', maxCount: 1 },
  { name: 'income', maxCount: 1 },
  { name: 'transactionproof', maxCount: 1 },
  { name: 'fcregistrationcopy', maxCount: 1 },
  { name: 'other', maxCount: 1 },
  { name: 'signature', maxCount: 1 }
]), (req, res) => {
  const personalDetails = JSON.parse(req.body.personalDetails);
  const academicDetails = JSON.parse(req.body.academicDetails);
  const cetDetails = JSON.parse(req.body.cetDetails);
  const preferences = req.body.preferences ? JSON.parse(req.body.preferences) : []; // Parse preferences
  const formData1 = JSON.parse(req.body.formData1);
  const formType = req.body.formType;
  const preference = req.body.preference;
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
        birth_place: personalDetails.birthPlace,
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
        cbse_admit_card_id: academicDetails.admitCardId,
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
        cbse_admit_card_id: req.files['cbse12admitcard'] ? req.files['cbse12admitcard'][0].path : null,
        cetMarksheet: req.files['cetMarksheet'] ? req.files['cetMarksheet'][0].path : null,
        jeeMarksheet: req.files['jeeMarksheet'] ? req.files['jeeMarksheet'][0].path : null,
        domicilecert: req.files['domicilecert'] ? req.files['domicilecert'][0].path : null,
        castecertificate: req.files['castecertificate'] ? req.files['castecertificate'][0].path : null,
        castevalidity: req.files['castevalidity'] ? req.files['castevalidity'][0].path : null,
        noncreamylayer: req.files['noncreamylayer'] ? req.files['noncreamylayer'][0].path : null,
        income: req.files['income'] ? req.files['income'][0].path : null,
        transactionproof: req.files['transactionproof'] ? req.files['transactionproof'][0].path : null,
        fcregistrationcpy: req.files['fcregistrationcopy'] ? req.files['fcregistrationcopy'][0].path : null,
        other: req.files['other'] ? req.files['other'][0].path : null,
        signature: req.files['signature'] ? req.files['signature'][0].path : null,
        // preferences: JSON.stringify(preferences).replace(/'/g, '"'),
        preference: preference,
        transaction_date: formData1.date,
        transaction_amount: formData1.amount,
        transaction_id: formData1.transactionId,
        transaction_against: formData1.paymentAgainst,
        formType:formType,
        class:personalDetails.class,
        juniorCollege:personalDetails.juniorCollege
      };

      const query = 'INSERT INTO user_details_admission1 SET ?';
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

app.post('/api/submit3', upload.fields([
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
  const preferences = req.body.preferences ? JSON.parse(req.body.preferences) : []; // Parse preferences
  const formData1 = JSON.parse(req.body.formData1);
  const formType = req.body.formType;
  const preference = req.body.preference;
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
        // preferences: JSON.stringify(preferences).replace(/'/g, '"'),
        preference: preference,
        transaction_date: formData1.date,
        transaction_amount: formData1.amount,
        transaction_id: formData1.transactionId,
        transaction_against: formData1.paymentAgainst,
        formType:formType,
        class:personalDetails.class,
        juniordseCollege:personalDetails.juniordseCollege
      };

      const query = 'INSERT INTO user_details_admission_setebe SET ?';
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

///Admin Portal changes

function mailsend(docName, email){
  const documentReject = docName;
  const emailtoSend = email;
  console.log(emailtoSend);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'asiesgst@gmail.com',
      pass: 'ilnb jboi ekcf lyfp'
    }
  });
  
  const mailOptions = {
    from: 'asiesgst@gmail.com',
    to: emailtoSend,
    subject: 'Rejected Documents',
    text: `${documentReject} Documnet Rejected \n Please visit admin office with correct softcopy of Corresponding document \n[File size < 250kb, File type allowed(pdf/jpeg/png) `,
    // attachments: [
    //   {
    //       path: 'E:/Desktop/attachment.txt'
    //   }
  // ]
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); 
}


///Setting up file server to show preview of Documents
app.use('/files', express.static(path.join(__dirname, 'public'))); //Working

//Admin portal data fetching
// Create an endpoint to fetch data
app.get('/data', (req, res) => {
  const query = 'SELECT id, fullname, cet_application_id, documentsApproved, transactionproofStatus FROM user_details';
  
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
      console.log(results);
    }
  });
});


//Docverification page get and fetching
app.get('/docverification/:uid', (req, res) => {
  const userId = req.params.uid;
  console.log(userId);
  const query = `SELECT id, fullname, email, mobile_number, annual_income, category, cet_application_id, jee_application_number, photo, marksheet10, leavingCertificate12, marksheet12, cetMarksheet, jeeMarksheet, signature, domicilecert, castecertificate, castevalidity, noncreamylayer, income, other, photoStatus, leavingCertificate12Status, marksheet10Status, marksheet12Status, cetMarksheetStatus, jeeMarksheetStatus, signatureStatus, domicilecertStatus, castecertificateStatus, castevalidityStatus, noncreamylayerStatus, incomeStatus, otherStatus, transactionproofStatus, documentsApproved FROM user_details WHERE id = '${userId}';`;
  
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
      console.log(results);
    }
  });
});

//Fetching documents URL and send the URL back to React (Preview button)
app.get('/docverification/:uid/:docname', (req, res) => {
  const userId = req.params.uid;
  const docname = req.params.docname;
  console.log(userId);
  console.log(docname)
  const query = `SELECT ${docname} FROM user_details WHERE id = '${userId}';`;
  
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
      console.log(results);
    }
  });
});

//Document verification page making updation request to make document status to approve
app.put('/approveDoc/:uid/:docName', (req, res) => {
  const  uid  = req.params.uid;
  const  docName  = req.params.docName;

  const sql = `UPDATE user_details SET ${docName}Status = 'Approved' WHERE id = ?`;
  const sqlQuery = `UPDATE user_details SET ${docName}Status = 'Approved' WHERE id = ${uid}`;
  console.log(sqlQuery);
 
  const values = [uid];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating entry: ' + err.stack);
      res.status(500).send('Error updating entry');
      return;
    }
    console.log('Updated entry with ID ' + uid);
    res.send('Entry updated successfully');
  });
});


//Document verification page making updation request to make document status to Reject
app.put('/rejectDoc/:uid/:email/:docName', (req, res) => {
  const  uid  = req.params.uid;
  const  docName  = req.params.docName;
  const  email = req.params.email;

  console.log(email)
  mailsend(docName, email);
  const sql = `UPDATE user_details SET ${docName}Status = 'Rejected' WHERE id = ?`;
  const sqlQuery = `UPDATE user_details SET ${docName}Status = 'Rejected' WHERE id = ${uid}`;
  console.log(sqlQuery);
  const values = [uid];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating entry: ' + err.stack);
      res.status(500).send('Error updating entry');
      return;
    }
    console.log('Updated entry with ID ' + uid);
    res.send('Entry updated successfully');
  });
});

//Update all Document status to Approved
app.put('/DocumentsApproved/:uid', (req, res) => {
  const  uid  = req.params.uid;
  
  const sql = `UPDATE user_details SET documentsApproved = 'Approved' WHERE id = ?`;
  const sqlQuery = `UPDATE user_details SET documentsApproved = 'Approved' WHERE id = ${uid}`;
  console.log(sqlQuery);
 
  const values = [uid];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating entry: ' + err.stack);
      res.status(500).send('Error updating entry');
      return;
    }
    console.log("All documents Approved sucessfully");
    res.send('Entry updated successfully');
  });
});

async function fetchStudents() {
  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'reg_portal' // Your database name
  });

  const [rows] = await connection.execute('SELECT s_id, s_cet_per, s_cetmaths, s_cetphy, s_cetchem, s_hscpcm FROM test_merit_algorithm_database');
  await connection.end();
  return rows;
}

// Compare students based on various attributes
function compareStudents(studentA, studentB) {
  const attributes = ["s_cet_per", "s_cetmaths", "s_cetphy", "s_cetchem", "s_hscpcm"];
  for (let attr of attributes) {
    if (studentA[attr] > studentB[attr]) {
      return -1; 
    } else if (studentA[attr] < studentB[attr]) {
      return 1; 
    }
  }
  return 0; 
}

// Generate merit list
function generateMeritList(students) {
  const sortedStudents = students.slice().sort(compareStudents);

  sortedStudents.forEach((student, index) => {
    student.meritNumber = index + 1;
  });

  return sortedStudents;
}

// API endpoint to get merit list
app.get('/meritList', async (req, res) => {
  try {
    const students = await fetchStudents();
    const meritList = generateMeritList(students);
    res.json(meritList);
  } catch (error) {
    console.error('Error fetching or processing students:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Fee structure upload endpoint
app.post('/fee-structure-upload', (req, res) => {
  const query = `INSERT INTO fee_structure (admission_year, tuition_fee, development_fee, exam_fee, misc_fee) VALUES (?, ?, ?, ?, ?)`;
  const { admissionYear, tuitionFee, developmentFee, examFee, miscellaneousFee } = req.body;
  console.log(req.body);
  const values = [admissionYear, tuitionFee, developmentFee, examFee, miscellaneousFee];

  db.query(query, values, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        console.error('Duplicate entry error: ' + err.stack);
        res.status(409).send('Duplicate entry: Admission year already exists');
      } else {
        console.error('Error updating entry: ' + err.stack);
        res.status(500).send('Error updating entry');
      }
    } else {
      console.log('Entry updated successfully');
      console.log(result);
      res.send('Entry updated successfully');
    }
  });
});

app.put('/fee-structure-update', (req, res) => {
  const query = `UPDATE fee_structure SET development_fee = ?,exam_fee = ?, misc_fee = ? WHERE admission_year = ?`;
  const { admissionYear, tuitionFee, developmentFee, examFee, miscellaneousFee } = req.body;
  console.log(req.body);
  const values = [developmentFee, examFee, miscellaneousFee, admissionYear];

  db.query(query, values, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        console.error('Duplicate entry error: ' + err.stack);
        res.status(409).send('Duplicate entry: Admission year already exists');
      } else {
        console.error('Error updating entry: ' + err.stack);
        res.status(500).send('Error updating entry');
      }
    } else {
      console.log('Entry updated successfully');
      console.log(result);
      res.send('Entry updated successfully');
    }
  });
});

app.get('/feeStructure',(req,res)=>{
  const query = `SELECT * FROM fee_structure ;`;
  
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
      console.log(results);
    }
  });
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
