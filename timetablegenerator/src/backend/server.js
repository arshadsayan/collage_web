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
      subject: 'Your Password Reset OTP for SIES Admission Portal',
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




// FEE details display

app.get('/api/years', (req, res) => {
  db.query('SELECT admission_year FROM fee_structure', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).send('Database query error');
    } else {
      const years = results.map(row => row.admission_year);
      //console.log('Years from database:', years);
      res.json(years);
    }
  });
});

// Endpoint to get fee structure for a specific year
app.get('/api/fee-structure/:year', (req, res) => {
  const year = parseInt(req.params.year);
  db.query('SELECT * FROM fee_structure WHERE admission_year = ?', [year], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).send('Database query error');
    } else if (results.length > 0) {
      //console.log('Fee structure for year:', year, results[0]);
      res.json(results[0]);
    } else {
      console.log('Fee structure not found for year:', year);
      res.status(404).send('Fee structure not found');
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

//event
const storageEvents = multer.diskStorage({
  destination: function (req, file, cb) {
    const personalDetails = JSON.parse(req.body.personalDetails);
    const dirname = personalDetails.email.toString();
    const uploadPath = `public/${dirname}`;
    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const personalDetails = JSON.parse(req.body.personalDetails);
    const fileType = file.mimetype;
    let extension = '';

    if (fileType === 'application/pdf') {
      extension = '.pdf';
    } else if (fileType === 'image/jpeg') {
      extension = '.jpeg';
    } else if (fileType === 'image/png') {
      extension = '.png';
    }

    let index = 1;
    const uploadPath = `public/${personalDetails.email.toString()}`;

    // Check for existing files with different extensions
    const existingFiles = fs.readdirSync(uploadPath);
    const fileIndexes = existingFiles
      .filter(filename => filename.startsWith('image'))
      .map(filename => {
        const match = filename.match(/image(\d+)/);
        return match ? parseInt(match[1]) : 0;
      });

    // Increment index to the next available number
    while (fileIndexes.includes(index)) {
      index++;
    }

    // Generate filename based on the found index and extension
    const filename = `image${index}${extension}`;

    cb(null, filename);
  }
});

const uploadEvents = multer({ storage: storageEvents });

// Define the /api/events endpoint
app.post('/api/events/', uploadEvents.single('image'), (req, res) => {
  const { name, date, time, summary, uid } = req.body;
  const image = req.file ? req.file.filename : null;

  const query = 'INSERT INTO events (id, name, date, time, summary, image) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [uid, name, date, time, summary, image];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error saving event detail:', err);
      res.status(500).json({ error: 'Error saving event detail' });
      return;
    }
    res.status(200).json({ message: 'Event saved successfully!' });
  });
});



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
        admission_type: personalDetails.admissionType,
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
        admission_type: personalDetails.admissionType,
        prn: personalDetails.prn,
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

async function deleteFile(directoryPath) {
  const filePath = path.join(directoryPath);
  try {
    await fs.unlink(filePath);
    console.log('File deleted successfully');
  } catch (err) {
    console.error('Error deleting the file:', err);
  }
}


// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

///To bypass security for email
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

function mailsend(docName, email){
  const documentReject = docName;
  const emailtoSend = email;
  console.log(emailtoSend);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'otp.graphicalauthenticator@gmail.com',
      pass: 'awdw yvwr unzw hqgj'
    }
  });
  
  const mailOptions = {
    from: 'otp.graphicalauthenticator@gmail.com',
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

//sending fee receipt in mail
function mailsendFeeReceipt(email){
  const documentReject = 'FeeReceipt';
  const emailtoSend = email;
  console.log(emailtoSend);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'otp.graphicalauthenticator@gmail.com',
      pass: 'awdw yvwr unzw hqgj'
    }
  });
  
  const mailOptions = {
    from: 'otp.graphicalauthenticator@gmail.com',
    to: emailtoSend,
    subject: 'Brochure form fee receipt',
    text: `Successfull payment for Brochure form `,
    attachments: [
      {
          path: `./public/${email}/FeeReceipt.pdf`,
      }
  ]
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); 
}



//setting up file server
app.use('/files', express.static(path.join(__dirname, 'public')));

// MySQL connection setup


let data = {};




//Admin portal data fetching
// Create an endpoint to fetch data
app.get('/brochuredata', (req, res) => {
  const query = 'SELECT id, fullname, cet_application_id, documentsApproved, transactionproofStatus, admissionType FROM user_details';
  
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
      console.log(results);
    }
  });
});


//Admision FE get request
app.get('/FEadmissiondata', (req, res) => {
  const query = 'SELECT id, fullname, documentsApproved, admissiontransactionproofStatus, class FROM user_details_admission1';
  console.log('Admission brochure');
  // res.sendStatus(200).send('Admission data fetch');
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
      console.log(results);
    }
  });
});

//SE TE BE get request
app.get('/higheradmissiondata', (req, res) => {
  const query = 'SELECT id, fullname, documentsApproved, admissiontransactionproofStatus, class FROM user_details_admission_setebe';
  console.log(' SE TE BE Admission brochure');
  // res.sendStatus(200).send('Admission data fetch');
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

//DocverificationFEAdmission page get and fetching
//Docverification page get and fetching
app.get('/docverificationFEAdmission/:uid', (req, res) => {
  const userId = req.params.uid;
  console.log(userId);
  const query = `SELECT id, fullname, email, mobile_number, annual_income, category, cet_application_id, jee_application_number, photo, marksheet10, leavingCertificate12, marksheet12, cetMarksheet, jeeMarksheet, signature, domicilecert, castecertificate, castevalidity, noncreamylayer, income, other, photoStatus, leavingCertificate12Status, marksheet10Status, marksheet12Status, cetMarksheetStatus, jeeMarksheetStatus, signatureStatus, domicilecertStatus, castecertificateStatus, castevalidityStatus, noncreamylayerStatus, incomeStatus, otherStatus, admissiontransactionproofStatus, documentsApproved FROM user_details_admission1 WHERE id = '${userId}';`;
  
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
      console.log(results);
    }
  });
});



//Fetching documents URL and send the URL back to React
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


//Fetching documents URL and send the URL back to React
app.get('/docverificationFEAdmission/:uid/:docname', (req, res) => {
  const userId = req.params.uid;
  const docname = req.params.docname;
  console.log(userId);
  console.log(docname);
  console.log('FE ADMISSION PREVIEW');
  const query = `SELECT ${docname} FROM user_details_admission1 WHERE id = '${userId}';`;
  
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

//FE Admission Document verification page making updation request to make document status to approve
app.put('/approveDocFEAdmission/:uid/:docName', (req, res) => {
  const  uid  = req.params.uid;
  const  docName  = req.params.docName;

  const sql = `UPDATE user_details_admission1 SET ${docName}Status = 'Approved' WHERE id = ?`;
  const sqlQuery = `UPDATE user_details_admission1 SET ${docName}Status = 'Approved' WHERE id = ${uid}`;
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


//FE Admission Document verification page making updation request to make document status to Reject
app.put('/rejectDocFEAdmission/:uid/:email/:docName', (req, res) => {
  const  uid  = req.params.uid;
  const  docName  = req.params.docName;
  const  email = req.params.email;

  console.log(email)
  mailsend(docName, email);
  const sql = `UPDATE user_details_admission1 SET ${docName}Status = 'Rejected' WHERE id = ?`;
  const sqlQuery = `UPDATE user_details_admission1 SET ${docName}Status = 'Rejected' WHERE id = ${uid}`;
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
  
  const sql = `UPDATE user_details SET documentsApproved = 'Approved', addedToMerit = true WHERE id = ?`;
  const sqlQuery = `UPDATE user_details SET documentsApproved = 'Approved',  addedToMerit = 1 WHERE id = ${uid}`;
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

  ///Fetching data from user_details to add to merit list table
  const query = util.promisify(db.query).bind(db);
  var cet_percentile = '';

  
});



// const storage2 = multer.diskStorage({
//   destination: function (req, file, cb) {
//     //  const dirname =  'dirname'//req.body;///JSON.parse(req.body.email);
//     // console.log('Dirname : ',dirname);
//     const email = JSON.stringify(req.body.email);
//     const body = req.body;
//     // Use email to dynamically create upload path
//     const dirname = email || 'default'; 
//     console.log("Email : ",email);
//     console.log("dirnam : ",dirname);
//     console.log("Body : ", typeof(body));
//     // Use 'default' if email is undefined
//     // console.log('Dirname : ', dirname);

//     // console.log(JSON.parse(req.body));
    
//     const uploadPath = `public/${dirname}`;
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath);
//     }
//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {

//     // console.log(req.body.email);
//     const reuploadName = 'reuploads';
//     const fileString = file.fieldname.toString();
//     console.log(reuploadName);
//     console.log(fileString); 
//     const fileType = file.mimetype;
//     if(fileType === 'application/pdf'){
//       cb(null, `${reuploadName}.pdf`);
//     }
//     else if(fileType === 'image/jpeg'){
//       cb(null, `${reuploadName}.jpeg`);
//     }
//     else if(fileType === 'image/png'){
//       cb(null, `${reuploadName}.png`);
//     }
//   }
// });
// const upload2 = multer({ storage: storage2 });

// // Endpoint to handle file Reupload at Admin side
// app.post('/reupload', upload2.fields([
//   {name:'file', maxCount:1}
// ]), (req, res) => {
//   // Multer adds a 'file' object to the request object
//   const file = req.file;
//   const email = req.body;
//   const docName = req.body.docName;
  
//   // response.append(req.body);
//   console.log('Email : ',email);
//   console.log('Document Name : ',docName );
//   if (!file) {
//       return res.status(400).send('No file uploaded.');
//   }
//   // res.send('File uploaded successfully.');


//    response = { message: 'Response body received:', data: req.body };

//   // Sending the response with the appended req.body
//   res.send(response);


// });

///Merit list testing
// Fetch students from the database

// BACKUP CODE

// Configure multer storage for re-uploads
// const reuploadStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const email = req.body.email;
//     console.log(email);
//     console.log(file.mimetype);
//     console.log(file.fieldname);







//     const uploadPath = path.join(__dirname, 'public', email);
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }
//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     const docName = req.body.docName;
//     console.log(docName);
//     const fileExtension = path.extname(file.originalname);
//     cb(null, `${docName}${fileExtension}`);
//   }
// });

// // const reupload = multer({ storage: reuploadStorage });
// const reupload = multer({ storage: reuploadStorage }).fields([
//   { name: 'file', maxCount: 1 },
//   { name: 'email', maxCount: 1 },
//   { name: 'docName', maxCount: 1 }
// ]);

// // Endpoint to handle file re-upload
// app.post('/reupload', reupload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   const email = (req.body.email);
//   const docName = (req.body.docName);
//   const filePath = (req.file.path);
//   console.log(req.body);
//   console.log(email);
//   console.log(docName);
//   console.log(filePath);

//   // Here you can add any database update logic if needed
//   console.log(`File uploaded for ${email}: ${filePath}`);

//   res.send({ message: 'File uploaded successfully', filePath });
// });


const reuploadStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const email = req.body.email;
    // const parameters = req.params.email;
    // console.log(parameters);
    console.log('email :', email);
    console.log(file.originalname);
    
    // if (!email) {
    //   return cb(new Error('Email is required'));
    // }

    const uploadPath = path.join(__dirname, 'public', email);
    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) return cb(err);
      cb(null, uploadPath);
    });
  },
  filename: function (req, file, cb) {
    const docName = req.body.docName;
    console.log('Document name:', docName);
    const fileType = file.mimetype;
    if(fileType === 'application/pdf'){
      cb(null, `${docName}.pdf`);
    }
    else if(fileType === 'image/jpeg'){
      cb(null, `${docName}.jpeg`);
    }
    else if(fileType === 'image/png'){
      cb(null, `${docName}.png`);
    }
    
    // if (!docName) {
    //   return cb(new Error('Document name is required'));
    // }

    const fileExtension = path.extname(file.originalname);
    cb(null, `${docName}${fileExtension}`);
  }
});

const reupload = multer({ storage: reuploadStorage });
//Reupload from brochure form
app.post('/reupload', reupload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const email = req.body.email;
  const docName = req.body.docName;
  const filePath = req.file.fieldname;
  const filetype = req.file.mimetype;

  console.log(req.body);
  console.log(email);
  console.log(docName);
  console.log(filePath);
  console.log(filetype);

  // Retrieving the previous location of file to delete it
  const retrieveQuery = `SELECT ${docName} FROM user_details WHERE email = '${email}';`;
  console.log(retrieveQuery);
  const values = [docName, email];

  // Promisify the db.query function
  const query = util.promisify(db.query).bind(db);
  var fileExtension = '';
  var resultQuery = '';
  try {
    const result = await query(retrieveQuery, values);

    console.log('DOCUMENT REUPLOADED');
    console.log(result);

    resultQuery = Object.values(result[0])[0];
    console.log(resultQuery);
    const parts = resultQuery.split('\\');
    console.log(parts);
    const fileName = parts[parts.length - 1];
    console.log(fileName);

    // Split the file name by dot and get the last part (file extension)
    const fileNameParts = fileName.split('.');
    fileExtension = fileNameParts[fileNameParts.length - 1];
    console.log(fileExtension);

   
  } catch (err) {
    console.error('Error updating entry: ' + err.stack);
    res.status(500).send('Error updating entry');
  }

  const filetypemap = { 'png':'image/png', 'pdf':'application/pdf', 'jpeg':'image/jpeg' }
  const reverseFileType = {'image/png':'png', 'application/pdf': 'pdf', 'image/jpeg':'jpeg'}
  console.log(filetypemap[fileExtension]);
  console.log(filetype);

  if(filetype === filetypemap[fileExtension]){
    console.log("Not path updates in database");

  }
  else{
    const reuploadURL = `${email}\\${docName}.${reverseFileType[filetype]}`;
    console.log(reuploadURL);
    const query = `UPDATE user_details SET ${docName} = ? WHERE email = ?`;
    const values = [reuploadURL, email];
    console.log(query);
    db.query(query, values, (err, result) => {
      if (err) {
        console.log("Error found : ",error);
      } else {
        console.log(result);
        res.send('Reupload URL in database updated');
      }
    });
  }
});




//////////////////////////////////////////////////////////Reupload from FE Admission form //////////////////////////////////////////////////////////////
app.post('/reuploadFEAdmission', reupload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const email = req.body.email;
  const docName = req.body.docName;
  const filePath = req.file.fieldname;
  const filetype = req.file.mimetype;

  console.log(req.body);
  console.log(email);
  console.log(docName);
  console.log(filePath);
  console.log(filetype);

  // Retrieving the previous location of file to delete it
  const retrieveQuery = `SELECT ${docName} FROM user_details_admission1 WHERE email = '${email}';`;
  console.log(retrieveQuery);
  const values = [docName, email];

  // Promisify the db.query function
  const query = util.promisify(db.query).bind(db);
  var fileExtension = '';
  var resultQuery = '';
  try {
    const result = await query(retrieveQuery, values);

    console.log('DOCUMENT REUPLOADED from FE Admission');
    console.log(result);

    resultQuery = Object.values(result[0])[0];
    console.log(resultQuery);
    const parts = resultQuery.split('\\');
    console.log(parts);
    const fileName = parts[parts.length - 1];
    console.log(fileName);

    // Split the file name by dot and get the last part (file extension)
    const fileNameParts = fileName.split('.');
    fileExtension = fileNameParts[fileNameParts.length - 1];
    console.log(fileExtension);

   
  } catch (err) {
    console.error('Error updating entry: ' + err.stack);
    res.status(500).send('Error updating entry');
  }

  const filetypemap = { 'png':'image/png', 'pdf':'application/pdf', 'jpeg':'image/jpeg' }
  const reverseFileType = {'image/png':'png', 'application/pdf': 'pdf', 'image/jpeg':'jpeg'}
  console.log(filetypemap[fileExtension]);
  console.log(filetype);

  if(filetype === filetypemap[fileExtension]){
    console.log("Not path updates in database");

  }
  else{
    const reuploadURL = `${email}\\${docName}.${reverseFileType[filetype]}`;
    console.log(reuploadURL);
    const query = `UPDATE user_details_admission1 SET ${docName} = ? WHERE email = ?`;
    const values = [reuploadURL, email];
    console.log(query);
    db.query(query, values, (err, result) => {
      if (err) {
        console.log("Error found : ",error);
      } else {
        console.log(result);
        res.send('Reupload URL in database updated');
      }
    });
  }
});

async function fetchStudents() {
  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'reg_portal' // Your database name
  });

  const [rows] = await connection.execute('SELECT fullname, cet_percentile, cet_maths_percentile, cet_physics_percentile, cet_chemistry_percentile, 12th_marks_obtained, preferences, Alloted_branch, id FROM user_details WHERE addedToMerit = true');
  await connection.end();
  return rows;
}

// Compare students based on various attributes
function compareStudents(studentA, studentB) {
  const attributes = ["cet_percentile", "cet_maths_percentile", "cet_physics_percentile", "cet_chemistry_percentile", "12th_marks_obtained"];
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
    console.log(meritList);
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

///Branch alottment updates
app.put('/branchallotment',(req,res)=>{
  console.log(req.body);
  const id = req.body.id;
  const Alloted_branch = req.body.Alloted_branch;
  const values = [Alloted_branch, id]
  console.log(values);
  const query = `UPDATE user_details SET Alloted_branch = ? WHERE id = ?`;
  console.log(query);
  db.query(query, values, (err, result) => {
    if (err) {
     console.log("Error while alloting branch : ",err);
    } else {
      console.log('Branch Alloted successfully');
      console.log(result);
      res.send('Branch Alloted successfully');
    }
  });
})



///Multer config for saving fee receipt
const feeuploadStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const email = req.body.email;
    // const parameters = req.params.email;
    // console.log(parameters);
    console.log('email :', email);
    
    
    // if (!email) {
    //   return cb(new Error('Email is required'));
    // }

    const uploadPath = path.join(__dirname, 'public', email);
    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) return cb(err);
      cb(null, uploadPath);
    });
  },
  filename: function (req, file, cb) {
    const docName = 'FeeReceipt';
    console.log('Document name:', docName);
    const fileType = file.mimetype;
    if(fileType === 'application/pdf'){
      cb(null, `${docName}.pdf`);
    }
    else if(fileType === 'image/jpeg'){
      cb(null, `${docName}.jpeg`);
    }
    else if(fileType === 'image/png'){
      cb(null, `${docName}.png`);
    }
    
    // if (!docName) {
    //   return cb(new Error('Document name is required'));
    // }

    const fileExtension = path.extname(file.originalname);
    cb(null, `${docName}${fileExtension}`);
  }
});

const feeupload = multer({ storage: feeuploadStorage });

///Saving fee receipt and sending it to the person.
// app.post('/uploadfeereceipt',feeupload.single("file"))
app.post('/uploadfeereceipt', feeupload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  else{
    console.log(req.body);
    const email = req.body.email;
    mailsendFeeReceipt(email);
  }
   });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
