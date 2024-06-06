import React, { useState } from 'react';

function Contact() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleContact = async (e) => {
    e.preventDefault();
    // Send contact data to backend
    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, feedback })
      });

      if (response.ok) {
        // Submission successful
        console.log('Submission successful');
        // Clear the form values
        setEmail("");
        setFeedback("");
      } else {
        // Submission failed
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="contactform">
        <img
          src="https://cdn-icons-png.flaticon.com/128/8367/8367861.png"
          height={60}
          width={60}
          className='contactimage'
          alt=""
        />
        <form onSubmit={handleContact}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea" className="form-label">Feedback</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea"
              rows="3"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary colorbtn">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Contact;
