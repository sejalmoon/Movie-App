import logo from './logo.svg';

import './App.css';

function App() {
  return (
    <div className="App">
      
		
			<section id="setup-container">
				<div class="setup-inner">
					<img src="./movieboss.png"/>
					<div class="speech-bubble-ai" id="speech-bubble-ai">
						<p id="movie-boss-text">
							Give me a one-sentence concept and I'll give you an eye-catching title, a synopsis the studios will love, a movie poster...
							AND choose the cast!
						</p>
					</div>
				</div>
				<div class="setup-inner setup-input-container" id="setup-input-container">
					<textarea id="setup-textarea" placeholder="An evil genius wants to take over the world using AI."></textarea>
					<button class="send-btn" id="send-btn" aria-label="send">
							<img src="./send-btn-icon.png" alt="send"/>
					</button>
				</div>
			</section>	
			<section class="output-container" id="output-container">
				<div id="output-img-container" class="output-img-container"></div>
				<h1 id="output-title"></h1>
				<h2 id="output-stars"></h2>
				<p id="output-text"></p>
			</section>	

    </div>
  );
}

export default App;
