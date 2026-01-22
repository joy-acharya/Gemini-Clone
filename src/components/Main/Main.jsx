import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
  const {
    onSent,
    recentPrompts,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  // Functional logic for the cards
  const handleCardClick = (text) => {
    setInput(text);
    onSent(text);
  };

  return (
    <div className="main">
      <div className="nav">
        <p className="logo-text">
          Joy<span>AI</span>
        </p>
        <img src={assets.user_icon} alt="User Profile" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Design. Create. Automate.</span>
              </p>
              <p>How can I assist your workflow today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    'Suggest beautiful places to see on an upcoming road trip'
                  )
                }
              >
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <div className="icon-wrapper">
                  <img src={assets.compass_icon} alt="" />
                </div>
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    'Briefly summarize this concept: urban planning'
                  )
                }
              >
                <p>Briefly summarize this concept: urban planning</p>
                <div className="icon-wrapper">
                  <img src={assets.bulb_icon} alt="" />
                </div>
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    'Brainstorm team bonding activities for our work retreat'
                  )
                }
              >
                <p>Brainstorm team bonding activities for our work retreat</p>
                <div className="icon-wrapper">
                  <img src={assets.message_icon} alt="" />
                </div>
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    'Improve the readability of the following code'
                  )
                }
              >
                <p>Improve the readability of the following code</p>
                <div className="icon-wrapper">
                  <img src={assets.code_icon} alt="" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompts}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="AI Icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && onSent()}
              value={input}
              type="text"
              placeholder="Ask JoyAI something..."
            />
            <div className="input-actions">
              <img src={assets.gallery_icon} alt="Gallery" />
              <img src={assets.mic_icon} alt="Mic" />
              {input && (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  alt="Send"
                />
              )}
            </div>
          </div>
          <p className="bottom-info">
            JoyAI uses the Gemini API. Verify important info before use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
