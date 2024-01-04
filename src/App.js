import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';

import './App.css';

function App() {

	const [inputText, setInputText] = useState("");
	const [error, setError] = useState(null);
	const [apiResponse, setApiResponse] = useState("");

	const handleTextChange = (event) => {
		setInputText(event.target.value);
	  };


	const handleSendClick = async () => {
		setError(null);
		setApiResponse("");
		try{
		const apiKey = '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';
		const prompt = inputText;
		const response = await axios.post(
			'https://api.openai.com/v1/engines/davinci/completions',
			{
				prompt: prompt,
				max_tokens: 100
			},
			{
				headers: {
					'Authorization': `Bearer ${apiKey}`
				}
			}
		);
		setApiResponse(response.data.choices[0].text); 
	} catch (error) {
		if (error.response) {
		  console.error("Error response:", error.response.data);
		  setError(`An error occurred: ${error.response.status} ${error.response.data.error}`);
		} else if (error.request) {
		  console.error("Error request:", error.request);
		  setError("No response received from the server.");
		} else {
		  console.error("Error message:", error.message);
		  setError("An error occurred: " + error.message);
		}
	  }
	};

  return (
    <div className="App">
      
		
			<section id="setup-container">
				<div className="setup-inner">
					<img src="./movieboss.png"/>
					<div className="speech-bubble-ai" id="speech-bubble-ai">
						<p id="movie-boss-text">
							Give me a one-sentence concept and I'll give you an eye-catching title, a synopsis the studios will love, a movie poster...
							AND choose the cast!
						</p>
					</div>
				</div>
				<div className="setup-inner setup-input-container" id="setup-input-container">
					<textarea id="setup-textarea" placeholder="An evil genius wants to take over the world using AI." value={inputText} onChange={handleTextChange}></textarea>
					<button className="send-btn" id="send-btn" aria-label="send" onClick={handleSendClick}>
							<img src="./send-btn-icon.png" alt="send"/>
					</button>
					{error && <p className="error-message">{error}</p>}
					{apiResponse && <div className="output-container">
        			<p>{apiResponse}</p>
      				</div>}
				</div>
				
			</section>	
			<section className="output-container" id="output-container">
				<div id="output-img-container" className="output-img-container"></div>
				<h1 id="output-title"></h1>
				<h2 id="output-stars"></h2>
				<p id="output-text"></p>
			</section>	

    </div>
  );
}

export default App;
