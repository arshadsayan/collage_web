const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const mysql2 = require('mysql2/promise');
const { useState } = require('react');
const util = require('util');
const { error } = require('console');

const app = express();
const port = 3001; // or any other port you prefer


//Delete file function 
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
;  const transporter = nodemailer.createTransport({
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

//setting up file server
app.use('/files', express.static(path.join(__dirname, 'public')));

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reg_portal' // Your database name
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});
let data = {};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const personalDetails = JSON.parse(req.body.personalDetails);
    const dirname = personalDetails.email.toString();
    console.log(dirname);
    console.log(typeof(dirname))
    
    const uploadPath = `public/${dirname}`;
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // const fileString = this.filename;
    // console.log(reuploadName);
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

  // const query = 'INSERT INTO user_details SET ?';
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


//Admin portal data fetching
// Create an endpoint to fetch data
app.get('/data', (req, res) => {
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

async function fetchStudents() {
  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'reg_portal' // Your database name
  });

  const [rows] = await connection.execute('SELECT s_id, s_cet_per, s_cetmaths, s_cetphy, s_cetchem, s_hscpcm, preferences, Alloted_branch FROM test_merit_algorithm_database');
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
  const s_id = req.body.s_id;
  const Alloted_branch = req.body.Alloted_branch;
  const values = [Alloted_branch, s_id]
  console.log(values);
  const query = `UPDATE test_merit_algorithm_database SET Alloted_branch = ? WHERE s_id = ?`;
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
