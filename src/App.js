import React, { useState } from 'react';
import { Rnd } from 'react-rnd'; // Import Rnd for resizing and dragging
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './App.css';

const App = () => {
  // State variables for dynamic fields
  const [name, setName] = useState('John Doe');
  const [dateHired, setDateHired] = useState('Jun 12 2024');
  const [position, setPosition] = useState('Web Developer');
  const [email, setEmail] = useState('test@test.com');
  const [address, setAddress] = useState('123 elmo street, Test City, Test State, More Address, More Filler');
  const [phone, setPhone] = useState('+639123123123');
  const [pictureUrl, setPictureUrl] = useState('');
  const [signUrl, setSignUrl] = useState('');

  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPictureUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSignChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSignUrl(reader.result);
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
        <div id='id-card-template-front' className='id-card-template-front'>
          
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
                bounds="window"
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
            <span className='name block'>{name}</span>
            <span className='position block'>{position}</span>
            <div className='contact'>
              <table>
                <tbody>
                  <tr>
                    <td className='label'><strong>DATE HIRED :</strong></td>
                    <td className='contact-value'>{dateHired}</td>
                  </tr>
                  <tr>
                    <td className='label'><strong>EMAIL :</strong></td>
                    <td className='contact-value'>{email}</td>
                  </tr>
                  <tr>
                    <td className='label'><strong>ADDRESS :</strong></td>
                    <td className='contact-value'>{address}</td>
                  </tr>
                  <tr>
                    <td className='label'><strong>PHONE :</strong></td>
                    <td className='contact-value'>{phone}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div id='id-card-template-back' className='id-card-template-back'>
          <div className='details-back'>
            <div className='contact'>
              <span><strong>In Case of Emergency, Please Contact:</strong></span>
              <div>
                <span>{ emergencyContactName }</span>
              </div>
              <div>
                <span>{ emergencyContactPhone }</span>
              </div>
            </div>
          </div>

          <div className='signatories'>
            <div className='employer'>
              <span>Ellaine Guevarra</span>
            </div>

            <div className='employee'>
              <span>{ name }</span>
            </div>
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
        
        <div>
          <label>Emergency Contact Name:</label>
          <input type='tel' placeholder='Emergency Contact Name' value={emergencyContactName} onChange={(e) => setEmergencyContactName(e.target.value)} />
        </div>

        <div>
          <label>Phone</label>
          <input type='tel' placeholder='Phone' value={emergencyContactPhone} onChange={(e) => setEmergencyContactPhone(e.target.value)} />
        </div>
      </div>

      <button className='print-button' onClick={generatePDF}>Print ID Card</button>
    </div>
  );
}

export default App;