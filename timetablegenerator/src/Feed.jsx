import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";

function Feed() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [generatedTexts, setGeneratedTexts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventSummary, setEventSummary] = useState("");
  const [events, setEvents] = useState([]);
  const [errorEvents, setErrorEvents] = useState([]);

  const handleChange = (event) => {
    setSelectedImages([event.target.files[0]]);
    handleGenerate(event.target.files[0]);
  }

  const handleGenerate = async (image) => {
    const genAI = new GoogleGenerativeAI('AIzaSyDYecx7ZQUfrUOksHRU1JHLFPxJuHyfy5Y'); // Replace with your actual API key
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  
    setLoading(true);
  
    try {
      const reader = new FileReader();
  
      reader.onloadend = async () => {
        try {
          const base64data = reader.result.split(",")[1];
  
          const result = await model.generateContent([
            "read the image and find name of event  ,time in am or pm ,date in this format dd/mm/yy if any thing is not mention say not mention,answer in points",
            {
              inlineData: {
                data: base64data,
                mimeType: image.type
              }
            }
          ]);
  
          const responseText = await result.response.text();
          const extractedData = extractEventData(responseText);
  
          setEventName(extractedData.eventName);
          setEventDate(extractedData.eventDate);
          setEventTime(extractedData.eventTime);
          setEventSummary(""); // Reset event summary
          setGeneratedTexts([{ image: image, text: responseText }]);
        } catch (error) {
          console.error('Error generating content:', error);
          // Handle error (e.g., show error message to user)
        } finally {
          setLoading(false);
        }
      };
  
      reader.readAsDataURL(image);
    } catch (error) {
      console.error('Error reading image:', error);
      setLoading(false);
    }
  };
  
  const extractEventData = (text) => {
    const lines = text.split('\n');
    let eventName = "";
    let eventDate = "";
    let eventTime = "";
  
    lines.forEach(line => {
      const [key, value] = line.split(':');
      const trimmedKey = key.trim();
  
      switch (trimmedKey.toLowerCase()) {
        case 'name of event':
        case 'event name':
          eventName = value.trim();
          break;
        case 'date':
          eventDate = value.trim();
          break;
        case 'time':
          eventTime = value.trim();
          break;
        default:
          break;
      }
    });
  
    return {
      eventName: eventName || "Event Name Not Found",
      eventDate: eventDate || "Date Not Found",
      eventTime: eventTime || "Time Not Found",
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedImages.length === 0 &&
      eventName.trim() === "" &&
      eventDate.trim() === "" &&
      eventTime.trim() === "" &&
      eventSummary.trim() === "") {
      alert('Upload a certificate or provide valid credentials before saving.');
      return; // Prevent further execution
    }

    const newEvent = {
      eventName: eventName,
      eventDate: eventDate,
      eventTime: eventTime,
      eventSummary: eventSummary,
      images: selectedImages
    };

    setEvents([...events, newEvent]);

    const formData = new FormData();
    
    formData.append('name', eventName);
    formData.append('date', eventDate);
    formData.append('time', eventTime);
    formData.append('summary', eventSummary);

    selectedImages.forEach((image, index) => {
      formData.append(`image${index + 1}`, image);
    });

    try {
      await axios.post('http://127.0.0.1:8000/api/events/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Event saved successfully!');
    } catch (error) {
      console.error('Error saving event detail:', error);
      setErrorEvents([...errorEvents, true]); // Error occurred for this event
      alert('Error saving event detail');
    }

    // Clear form fields after submission
    setEventName("");
    setEventDate("");
    setEventTime("");
    setEventSummary("");
    setSelectedImages([]);
    setGeneratedTexts([]);
  };

  return (
    <div >
      <h1 className="center page-heading">Event Participation Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <div className='ocr' style={{ marginBottom: "20px" }}>
            <label htmlFor="image" style={{ marginTop: "20px", marginBottom: "10px", display: 'block' }}>Upload Certificate</label>
            <input type="file" accept="image/*" onChange={handleChange} style={{ marginBottom: "20px" }} />
            {loading && <p>Loading...</p>}
          </div>
        </div>

        <div className="input-field">
          <label>Event Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            
          />
        </div>

        <div className="input-field">
          <label>Date of Event:</label>
          <input
            type="text"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            
          />
        </div>

        <div className="input-field">
          <label>Time of Event:</label>
          <input
            type="text"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            
          />
        </div>

        <div className="input-field">
          <label>Event Summary:</label>
          <textarea
            value={eventSummary}
            onChange={(e) => setEventSummary(e.target.value)}
            
          />
        </div>

        <div className='but'>
        <div className="buttons">
          <button type="submit" style={{ marginLeft: "30px", width: '100px' }}>Save</button>
          </div>
        </div>
      </form>
      <h3 className="center page-heading" style={{ fontSize: '20px'}}>Documents or Certificates Uploaded this session are shown here</h3>
      <h3 className="center" style={{ fontSize: '15px'}}>(Multiple certificates can be uploaded, just click save and then upload the next)</h3><br></br>
      {/* Table to display events */}
      
      <table style={{ borderCollapse: 'collapse', marginTop: '20px', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', border: '1px solid black', marginBottom:'75px'}}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Event Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Time</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Summary</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Image</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index} style={{ border: '1px solid black', backgroundColor: errorEvents[index] ? 'white' : 'white' }}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{event.eventName}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{event.eventDate}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{event.eventTime}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{event.eventSummary}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {event.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={URL.createObjectURL(image)}
                    alt={`Event ${index + 1} Image ${imgIndex + 1}`}
                    style={{ width: '50px', height: '50px' }}
                  />
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Feed;
