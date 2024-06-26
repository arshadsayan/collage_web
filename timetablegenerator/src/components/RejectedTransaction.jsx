import "./RejectedTransaction.css";
import { useState } from "react";
function RejectedTransaction() {

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    console.log(isChecked);
  };

  const setCheckboxState = (checked) => {
    setIsChecked(checked);
  };

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
              <th scope="col">Transaction ID-2</th>
              <th scope="col">Upload Transaction-2 Receipt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>
                <div className="row verify-row">
                  <div className="col">KJSKAJ121</div>
                </div>
              </td>
              <td>
                <div className="row verify-row">
                  <div className="col">121A3008</div>
                </div>
              </td>
              <td>
                <div className="row verify-row">
                  <div className="col">2021</div>
                </div>
              </td>
              <td>
                <div className="row verify-row">
                  <div className="col">150000</div>
                </div>
              </td>
              <td>
                <div className="row verify-row">
                  <div className="col">BE</div>
                </div>
              </td>
              <td>
                <div className="row verify-row">
                  <div className="col">12AKJHK76</div>
                </div>
              </td>

              <td>
                <td>
                  <div className="row verify-row">
                    <div className="col">
                      <button
                        type="button"
                        onClick={() => {
                          console.log("Preview clicked");
                        }}
                        className="btn verify-btn"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                </td>
              </td>
              <td>
                <div className="row verify-col">
                  <div className="col">
                    <button
                      type="button"
                      onClick={() => {
                        console.log("Green tick clicked");
                      }}
                      className="btn  green-tick-btn"
                    >
                      ✔
                    </button>
                  </div>
                  <div className="col">
                    <button
                      type="button"
                      onClick={() => {
                        console.log("Red cross clicked");
                      }}
                      className="btn  red-cross-btn"
                    >
                      ✘
                    </button>
                  </div>
                </div>
              </td>

              <td className="centered-checkbox">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </td>
              {isChecked &&
              <>
                <td>
                <div className="row verify-row">
                  <div className="col">75000</div>
                </div>
                </td>
                <td>
                <div className="row verify-row">
                  <div className="col">75000</div>
                </div>
                </td>
                <td>
                <div className="row verify-row">
                  <div className="col">2021</div>
                </div>
                </td>
                <td>
                <div className="row verify-row">
                    <div className="col">
                      <button
                        type="button"
                        onClick={() => {
                          console.log("Preview clicked");
                        }}
                        className="btn reupload-btn"
                      >
                        Reupload
                      </button>
                    </div>
                  </div>
                </td>
                
              </>
              }
              {
                !isChecked &&
                <>
                  <td>
                <div className="row verify-row">
                  <div className="col">-</div>
                </div>
                </td>
                <td>
                <div className="row verify-row">
                  <div className="col">-</div>
                </div>
                </td>
                <td>
                <div className="row verify-row">
                  <div className="col">-</div>
                </div>
                </td>
                <td>
                <div className="row verify-row">
                  <div className="col">-</div>
                </div>
                </td>
                </>
              }
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RejectedTransaction;
