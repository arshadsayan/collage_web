function RejectedTransaction() {
  return (
    <>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">UID</th>
              <th scope="col">PRN</th>
              <th scope="col">Year of Admission</th>
              <th scope="col">Total Fees </th>
              <th scope="col">Current Year</th>
              <th scope="col">Transaction ID </th>
              <th scope="col">Preview</th>
              <th scope="col">Verify</th>
              <th scope="col">Installment Allowed</th>
              <th scope="col">Installment 1</th>
              <th scope="col">Installment 2</th>
              <th scope="col">Upload Transaction-2 Receipt</th>
              <th scope="col">Transaction ID-2</th>

            </tr>
          </thead>
          <tbody>
          <tr >
                        <th scope="row">1</th>
                        <td>KJSKAJ121</td>
                        <td>123A3008</td>
                        <td>2024-25</td>
                        <td>150000</td>
                        <td>FE</td>
                        <td>172JSDKA12</td>
                        
                        <td>
                          
                          <button
                            type="button"
                            onClick={()=>{console.log('Preview clicked')}}
                            className="btn verify-btn"
                          >
                            Preview
                          </button>
                        </td>
                        <td >
                          <div className="row verify-col">
                            <div className="col">
                            <button
                            type="button"
                            onClick={()=>{console.log('Preview clicked')}}
                            className="btn verify-btn"
                          >
                            Preview
                          </button>
                            </div>
                            <div className="col">
                            <button
                            type="button"
                            onClick={()=>{console.log('Preview clicked')}}
                            className="btn verify-btn"
                          >
                            Preview
                          </button>
                            </div>
                          </div>
                        
                          
                        </td>
                      </tr>
          </tbody>
       
            
        </table>
      </div>
    </>
  );
}

export default RejectedTransaction;