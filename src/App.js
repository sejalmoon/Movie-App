import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';

import './App.css';

function App() {

	const [inputText, setInputText] = useState("");
	const [movieBossText, setMovieBossText] = useState("Give me a one-sentence concept and I'll give you an eye-catching title, a synopsis the studios will love, a movie poster... AND choose the cast!");
	const [error, setError] = useState(null);
	const [apiResponse, setApiResponse] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [synopsis, setSynopsis] = useState("");
	const [title, setTitle] = useState("");
	const [stars, setStars] = useState("");

	const handleTextChange = (event) => {
		setInputText(event.target.value);
	  };
		

	const handleSendClick = async () => {
		if(inputText){
			setIsLoading(true);
			setMovieBossText("Ok, just wait a second while my digital brain digests that...");

		setError(null);
		setApiResponse("");
		try{
		const apiKey = '';
		
		
		const botReply = await fetchBotReply(inputText);
		const botSynopsis = await fetchBotSynopsis(inputText);
		setMovieBossText(botReply); 
		setIsLoading(false);
		setSynopsis(botSynopsis);

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
		setIsLoading(false);
	  }
	}
	};

	const fetchBotReply = async (outline) => {
		try {
		  const apiKey = '';	
		  const response = await axios.post(
			'https://api.openai.com/v1/engines/davinci/completions',
			{
			  prompt: `Generate a short message under 30 words to enthusiastically say the outline passed sounds interesting and that you need some minutes to think about it.
			  
			  outline: Two dogs fall in love and move to Hawaii to learn to surf.
			  message: I'll need to think about that. But your idea is amazing! I love the bit about Hawaii!
			  
			  outline:A plane crashes in the jungle and the passengers have to walk 1000km to safety.
			  message: I'll spend a few moments considering that. But I love your idea!! A disaster movie in the jungle!
			  
			  outline: A group of corrupt lawyers try to send an innocent woman to jail.
			  message: Wow that is awesome! Corrupt lawyers, huh? Give me a few moments to think!
			  
			  outline: ${outline}
			  message: 
			  `,
			  max_tokens: 40,
			},
			{
			  headers: {
				'Authorization': `Bearer ${apiKey}`
			  }
			}
		  );
		  return response.data.choices[0].text;
		} catch (error) {
		  console.error("Error in fetchBotReply:", error);
		  return "An error occurred while fetching the bot reply.";
		}
	};

	const fetchBotSynopsis = async (outline) => {
		try {
			const apiKey = '';	
			const response = await axios.post(
			  'https://api.openai.com/v1/engines/davinci/completions',
			  {
				prompt: `Generate an engaging, professional and marketable movie synopsis based on the outline under 200 to 250 words. The synopsis should include actors names that can play the role in brackets after each character. Choose actors that would be ideal for this role. 
				
				outline: A big-headed daredevil fighter pilot goes back to school only to be sent on a deadly mission.
				synopsis: The Top Gun Naval Fighter Weapons School is where the best of the best train to refine their elite flying skills. When hotshot fighter pilot Maverick (Tom Cruise) is sent to the school, his reckless attitude and cocky demeanor put him at odds with the other pilots, especially the cool and collected Iceman (Val Kilmer). But Maverick isn't only competing to be the top fighter pilot, he's also fighting for the attention of his beautiful flight instructor, Charlotte Blackwood (Kelly McGillis). Maverick gradually earns the respect of his instructors and peers - and also the love of Charlotte, but struggles to balance his personal and professional life. As the pilots prepare for a mission against a foreign enemy, Maverick must confront his own demons and overcome the tragedies rooted deep in his past to become the best fighter pilot and return from the mission triumphant.  
				
				outline: ${outline}
				synopsis: 
				`,

				max_tokens: 300,
			  },
			  {
				headers: {
				  'Authorization': `Bearer ${apiKey}`
				}
			  }
			);
			

			const synopsis=response.data.choices[0].text;
			const botTitle = await fetchTitle(synopsis);
			setTitle(botTitle); 
			const botStars = await fetchStars(synopsis);
			setStars(botStars);
			return response.data.choices[0].text;


		} catch (error) {
		  console.error("Error in fetchBotSynopsis:", error);
		  return "An error occurred while fetching the bot synopsis.";
		}
		
	};

	const fetchTitle = async (synopsis) => {
		try {
		  const apiKey = '';	
		  const response = await axios.post(
			'https://api.openai.com/v1/engines/davinci/completions',
			{
			  prompt: `Generate a catchy movie title for this synopsis under 10 words: ${synopsis}`,
			  max_tokens: 25,
			},
			{
			  headers: {
				'Authorization': `Bearer ${apiKey}`
			  }
			}
		  );
		  return response.data.choices[0].text;
		} catch (error) {
		  console.error("Error in fetchTitle", error);
		  return "An error occurred while fetching the Title.";
		}
	};

	const fetchStars = async (synopsis) => {
		try {
		  const apiKey = '';	
		  const response = await axios.post(
			'https://api.openai.com/v1/engines/davinci/completions',
			{
			  prompt: `Extract the names of actors in brackets from the synopsis.
			  ###
			  synopsis: The Top Gun Naval Fighter Weapons School is where the best of the best train to refine their elite flying skills. When hotshot fighter pilot Maverick (Tom Cruise) is sent to the school, his reckless attitude and cocky demeanor put him at odds with the other pilots, especially the cool and collected Iceman (Val Kilmer). But Maverick isn't only competing to be the top fighter pilot, he's also fighting for the attention of his beautiful flight instructor, Charlotte Blackwood (Kelly McGillis). Maverick gradually earns the respect of his instructors and peers - and also the love of Charlotte, but struggles to balance his personal and professional life. As the pilots prepare for a mission against a foreign enemy, Maverick must confront his own demons and overcome the tragedies rooted deep in his past to become the best fighter pilot and return from the mission triumphant.
			  names: Tom Cruise, Val Kilmer, Kelly McGillis
			  ###
			  synopsis: ${synopsis}
			  names:   
			  `,		  
			  max_tokens: 30,
			},
			{
			  headers: {
				'Authorization': `Bearer ${apiKey}`
			  }
			}
		  );
		  return response.data.choices[0].text;
		} catch (error) {
		  console.error("Error in fetchTitle", error);
		  return "An error occurred while fetching the Stars.";
		}
	};
	

	
	

  return (
    <div className="App">
      
		
			<section id="setup-container">
				<div className="setup-inner">
					<img src="./movieboss.png"/>
					<div className="speech-bubble-ai" id="speech-bubble-ai">
						<p id="movie-boss-text">
							{movieBossText}
						</p>
					</div>
				</div>
				<div className="setup-inner setup-input-container" id="setup-input-container">
					<textarea id="setup-textarea" placeholder="An evil genius wants to take over the world using AI." value={inputText} onChange={handleTextChange}></textarea>
					<button className="send-btn" id="send-btn" aria-label="send" onClick={handleSendClick}>
							<img src="./send-btn-icon.png" alt="send"/>
					</button>
					{isLoading && <img src="./loading.svg" alt="Loading" />}
					{error && <p className="error-message">{error}</p>}
					{apiResponse && <div className="output-container">
      				</div>}
				</div>
				
			</section>	
			<section className="output-container" id="output-container">
				<div id="output-img-container" className="output-img-container"></div>
				<h1 id="output-title">
					{title}
				</h1>
				<h2 id="output-stars">
					{stars}
				</h2>
				<p id="output-text">
					{synopsis}
				</p>
			</section>	

    </div>
  );
}

export default App;
