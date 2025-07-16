import { useEffect } from "react";
import "./App.css";
import load from "./scripts/followCursor.js";

function App() {
	useEffect(() => {
		load();
	}, []);

	async function redirect(site) {
		window.location.href = site;
	}

	return (
		<>
			<div className="introduction">
				<h2>Hey!</h2>
				<h2>
					I'm <span>Kartikeya Challu</span>
				</h2>
				<p className="descriptor">
					Half student, half developer,
					<br /> fully sleep-deprived.
				</p>
			</div>
			<div className={"about test"}>
				<p className="project-name">About</p>
				<p style={{ margin: "10px" }}>
					I am a 16 year old software developer born in India. I currently live
					in the United States and I love building innovative solutions using
					technology. I started coding at the age of 11 and have been learning
					ever since. I am currently a high school student interested in
					computer science. I have experience in Python, JavaScript, and Java. I
					love working on projects that involve machine learning, web
					development, and game development. I am always looking for new
					challenges and opportunities to learn and grow as a developer.
				</p>
			</div>
			<div className={"projects test"}>
				<p className="project-name">Projects</p>
				<div
					className="project"
					onClick={() =>
						redirect("https://github.com/mxst1/TumorClassification")
					}
				>
					<a href="https://github.com/mxst1/TumorClassification">
						TumorClassification
					</a>
					<p>
						A brain tumor classifier I made with 5k images of gliomas,
						meningiomas, and pituitary tumors.
					</p>
				</div>
				<div
					className="project"
					onClick={() => redirect("https://github.com/mxst1/PixelPlayer")}
				>
					<a href="https://github.com/mxst1/PixelPlayer">PixelPlayer</a>
					<p>
						A mini music player that plays local files! Written in Python using
						Pygame.
					</p>
				</div>
				<div
					className="project"
					onClick={() => redirect("https://github.com/mxst1/rKoshurKitchen")}
				>
					<a href="https://github.com/mxst1/rKoshurKitchen">rKoshurKitchen</a>
					<p style={{ margin: "10px 2px 0 2px" }}>
						A restaurant website for the local business rKoshurKitchen LLC.
					</p>
				</div>
				<div
					className="project"
					onClick={() =>
						redirect("https://github.com/mxst1/GestureMediaControls")
					}
				>
					<a href="https://github.com/mxst1/GestureMediaControls">
						GestureMediaControls
					</a>
					<p>
						A Python program made to adjust the volume and play/pause media on
						my Mac.
					</p>
				</div>
			</div>
			<div className={"achievements test"}>
				<p className="project-name">Achievements</p>
				
			</div>
			<div className={"stack test"}>
				<p className="project-name">Stack</p>
			</div>
			{/* <Button
        text={"Test Button"}
        click={() => console.log("Button clicked!")}
        style={{ cursor: "url('/gauntlet-test.png'), auto" }}
      ></Button> */}
			<div id={"cursor"}></div>
		</>
	);
}

export default App;
