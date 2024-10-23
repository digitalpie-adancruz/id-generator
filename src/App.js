import React, { useState } from 'react';
import { Rnd } from 'react-rnd'; // Import Rnd for resizing and dragging
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './App.css';

const App = () => {
  // State variables for dynamic fields
  const [name, setName] = useState('John Doe');
  const [position, setPosition] = useState('Web Developer');
  const [email, setEmail] = useState('test@test.com');
  const [address, setAddress] = useState('123 elmo street, Test City, Test State, More Address, More Filler');
  const [phone, setPhone] = useState('+639123123123');
  const [pictureUrl, setPictureUrl] = useState('');

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPictureUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const generatePDF = () => {
    const input = document.getElementById('id-card-template');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('id-card.pdf');
    });
  };

  return (
    <div className='App'>
      <div id='id-card-template' className='id-card-template'>
        
        <div className='picture'>
          {pictureUrl && (
            <Rnd
              default={{
                x: 0,
                y: 0,
                width: 170,
                height: 170,
              }}
              minWidth={50}
              minHeight={50}
              bounds="window" // Set bounds to the window
              style={{ border: '1px solid #ccc', borderRadius: '50%', overflow: 'hidden' }}
            >
              <img
                src={pictureUrl}
                alt='Picture'
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Rnd>
          )}
        </div>

        <div className='details'>
          <span className='name'>{name}</span>
          <span className='position'>{position}</span>
          <div className='contact'>
            <span className='email'><strong>EMAIL :</strong> {email}</span>
            <span className='address'><strong>ADDRESS :</strong> {address}</span>
            <span className='phone'><strong>PHONE :</strong> {phone}</span>
          </div>
        </div>
      </div>

      <div className='input-fields'>
        <div>
          <label>Picture</label>
          <input type='file' onChange={handlePictureChange} />
        </div>
        <div>
          <label>Name</label>
          <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Position</label>
          <input type='text' placeholder='Position' value={position} onChange={(e) => setPosition(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Address</label>
          <textarea placeholder='Address' onChange={(e) => setAddress(e.target.value)}>{address}</textarea>
        </div>
        <div>
          <label>Phone</label>
          <input type='tel' placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>

      <button className='print-button' onClick={generatePDF}>Print ID Card</button>
    </div>
  );
}

export default App;