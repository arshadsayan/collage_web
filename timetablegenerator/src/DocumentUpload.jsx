import React, { useState } from 'react';

export default function DocumentUpload({ formData, setFormData, filePreviews, setFilePreviews }) {
  const [errors, setErrors] = useState({});
  const [validations, setValidations] = useState({});

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      const maxSize = 250 * 1024; // 250 KB

      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          [field]: 'Invalid file type. Only PDF, JPEG, and PNG are allowed.'
        });
        setValidations({
          ...validations,
          [field]: null
        });
        return;
      }

      if (file.size > maxSize) {
        setErrors({
          ...errors,
          [field]: 'File size exceeds 250 KB.'
        });
        setValidations({
          ...validations,
          [field]: null
        });
        return;
      }

      setErrors({
        ...errors,
        [field]: null
      });
      
      setValidations({
        ...validations,
        [field]: 'Valid'
      });

      setFilePreviews({
        ...filePreviews,
        [field]: URL.createObjectURL(file)
      });

      setFormData({
        ...formData,
        documentUpload: {
          ...formData.documentUpload,
          [field]: file
        }
      });
    }
  };

  return (
    <div>
      <h1 className="center page-heading">Document Uploading</h1>
      <table className="course-table">
        <thead>
          <tr>
            <th>Document Name</th>
            <th>Upload</th>
            <th>Preview</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { label: "Passport size photo", field: "photo" },
            { label: "10th Marksheet", field: "marksheet10" },
            { label: "12th Leaving Certificate", field: "leavingCertificate12" },
            { label: "12th Marksheet", field: "marksheet12" },
            { label: "CET Marksheet", field: "cetMarksheet" },
            { label: "JEE Marksheet", field: "jeeMarksheet" },
            { label: "Domicile Certificate", field: "domicilecert" },
            { label: "Caste Certificate", field: "castecertificate" },
            { label: "Caste Validity", field: "castevalidity" },
            { label: "Non creamy layer", field: "noncreamylayer" },
            { label: "Income Certificate", field: "income" },
            { label: "Transaction Proof", field: "transactionproof" },
            { label: "FC Registration Copy", field: "fcregistrationcopy" },
            { label: "Other Documents", field: "other" },
            { label: "Signature", field: "signature" },
            
          ].map((doc, index) => (
            <tr key={index}>
              <th>{doc.label}</th>
              <td><input type="file" name="files" onChange={(e) => handleFileChange(e, doc.field)} /></td>
              <td>
                {filePreviews[doc.field] && (
                  <div>
                    {doc.field === "photo" || doc.field === "signature" ? (
                      <img src={filePreviews[doc.field]} alt={`${doc.label} preview`} width="100" />
                    ) : (
                      <a href={filePreviews[doc.field]} target="_blank" rel="noopener noreferrer">View {doc.label}</a>
                    )}
                  </div>
                )}
              </td>
              <td>
                {errors[doc.field] && (
                  <div className="error">{errors[doc.field]}</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
    </div>
  );
}
