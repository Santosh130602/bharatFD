import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';
import { useNavigate } from 'react-router-dom';

const AdminComponent = () => {
  const [lang, setLang] = useState('');  
  const [faqData, setFaqData] = useState([]);  
  const [loading, setLoading] = useState(false);  



  const navigate = useNavigate()


    const handleAdmin = () => {
        navigate('/')
    }


  const fetchFaqData = async (language) => {
    if (!language) return;  

    setLoading(true);  

    try {
      const response = await axios.get(`http://localhost:4000/api/faqs/?lang=${language}`);
      setFaqData(response.data);  
    } catch (error) {
      console.error('Error fetching FAQ data:', error);
    }

    setLoading(false);  
  };

  useEffect(() => {
    if (lang) {
      fetchFaqData(lang); 
    }
  }, [lang]);

  const handleFetchData = () => {
    if (lang) {
      fetchFaqData(lang); 
    } else {
      alert("Please select a language first!");
    }
  };

  return (
    <div className="admin-container">
      <div className="mainTitle">

      <h2 className="title">Admin Dashboard</h2>
        <h1 className="title1" onClick={handleAdmin}>User</h1>
      </div>

      {/* Language selection dropdown */}
      <div className="form-group">
        <label htmlFor="language" className="label">Select Language</label>
        <select
          id="language"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="input-select"
        >
          <option value="">Select Language</option>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
        </select>
      </div>

      {/* Fetch Data Button */}
      <button onClick={handleFetchData} className="fetch-button" disabled={!lang}>
        Fetch FAQ Data
      </button>

      {/* Loading state */}
      {loading ? (
        <p>Loading FAQ data...</p>
      ) : (
        <div className="faq-list">
          {/* Display FAQ data */}
          {faqData.length === 0 ? (
            <p>{lang ? "No FAQs available for this language." : "Please select a language to fetch data."}</p>
          ) : (
            faqData.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminComponent;
