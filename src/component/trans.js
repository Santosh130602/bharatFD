
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';



const Trans = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [inputLang, setInputLang] = useState('en');
    const [outputLang, setOutputLang] = useState('en');
    const [translatedAnswer, setTranslatedAnswer] = useState('');
    const [loading, setLoading] = useState(false);




    const navigate = useNavigate()


    const handleAdmin = () => {
        navigate('/admin')
    }





    const handleTranslate = async () => {
        setLoading(true);

        try {
            // Make an API call to the backend to translate
            const response = await axios.post('http://localhost:4000/api/faqs', {
                question,
                answer,
                language: inputLang,
            });

            const { question_en, answer_en, question_hi, answer_hi, question_bn, answer_bn } = response.data;

            // Set the translated answer based on the selected output language
            switch (outputLang) {
                case 'en':
                    setTranslatedAnswer(answer_en);
                    break;
                case 'hi':
                    setTranslatedAnswer(answer_hi);
                    break;
                case 'bn':
                    setTranslatedAnswer(answer_bn);
                    break;
                default:
                    setTranslatedAnswer(answer);
            }
        } catch (error) {
            console.error('Translation failed', error);
        }

        setLoading(false);
    };

    const handleTranslateAgain = async () => {
        setLoading(true);
        try {
            // Make an API call to re-translate based on the new output language
            const response = await axios.post('http://localhost:4000/api/faqs', {
                question,
                answer,
                language: inputLang,
            });

            const { question_en, answer_en, question_hi, answer_hi, question_bn, answer_bn } = response.data;

            // Set the translated answer based on the newly selected output language
            switch (outputLang) {
                case 'en':
                    setTranslatedAnswer(answer_en);
                    break;
                case 'hi':
                    setTranslatedAnswer(answer_hi);
                    break;
                case 'bn':
                    setTranslatedAnswer(answer_bn);
                    break;
                default:
                    setTranslatedAnswer(answer);
            }
        } catch (error) {
            console.error('Translation failed', error);
        }
        setLoading(false);
    };

    return (
        <>

            <div className="container">

                <div className="mainTitle">

                    <h2 className="title">FAQ Translation</h2>

                    <h1 className="title1" onClick={handleAdmin}>Admin</h1>
                </div>

                <div className="form-group">
                    <label htmlFor="question" className="label">Question</label>
                    <textarea
                        id="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="input-textarea"
                        placeholder="Enter your question"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="answer" className="label">Answer</label>
                    <textarea
                        id="answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="input-textarea"
                        placeholder="Enter your answer"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="inputLang" className="label">Select Input Language</label>
                    <select
                        id="inputLang"
                        value={inputLang}
                        onChange={(e) => setInputLang(e.target.value)}
                        className="input-select"
                    >
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="bn">Bengali</option>
                    </select>
                </div>

                <button
                    onClick={handleTranslate}
                    disabled={loading}
                    className="btn"
                >
                    {loading ? 'Translating...' : 'Translate'}
                </button>

                {translatedAnswer && (
                    <div className="result">
                        <div className="form-group">
                            <label htmlFor="outputLang" className="label">Select Output Language</label>
                            <select
                                id="outputLang"
                                value={outputLang}
                                onChange={(e) => setOutputLang(e.target.value)}
                                className="input-select"
                            >
                                <option value="en">English</option>
                                <option value="hi">Hindi</option>
                                <option value="bn">Bengali</option>
                            </select>
                        </div>

                        <div className="result-box">
                            <h3 className="result-title">Translated Answer</h3>
                            <p className="result-text">{translatedAnswer}</p>
                        </div>

                        <button
                            onClick={handleTranslateAgain}
                            disabled={loading}
                            className="btn"
                        >
                            {loading ? 'Translating Again...' : 'Translate Again'}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Trans;
