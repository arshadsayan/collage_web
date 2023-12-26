import React from "react";
import './RoomDetail.css'
// import './SubjectChoice.css'

const RoomDetail = () => {
  return (
    <div className="container">
      <h1 className="pageHeading">Room Details</h1>
      <form>
        <div>
          <label htmlFor="roomNumber">Room Number: </label>
          <input
            type="text"
            name="roomNumber"
            placeholder="Enter the Room Number"
            value={""}
            onChange={(e) => ""}
          />
        </div>
        <div>
          <label htmlFor="floor">Floor: </label>
          <input
            type="text"
            name="floor"
            placeholder="Enter the floor"
            value={""}
            onChange={(e) => ""}
          />
        </div>
        <div>
          <label htmlFor="departmentName">Department Name: </label>
          <input
            type="text"
            name="departmentName"
            placeholder="Enter the Department Name"
            value={""}
            onChange={(e) => ""}
          />
        </div>
        <div>
          <label htmlFor="capacity">Capacity: </label>
          <input
            type="text"
            name="capacity"
            placeholder="Enter the Room Capacity"
            value={""}
            onChange={(e) => ""}
          />
        </div>
        <div>
          <button type="submit" onClick={() => {}}>+ ADD ROOM</button>
        </div>
      </form>
    </div>
  );
};

export default RoomDetail;
