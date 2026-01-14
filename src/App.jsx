import React, { useEffect, useState } from "react";
import "./App.css";
import SpotlightCard from "./components/SpotlightCard";
import Waves from "./components/Waves";
import StackMarquee from "./components/StackMarquee";
import Modal from "./components/Modal";
import TextType from "./components/TextType";
import NeuralNetwork from "./components/NeuralNetwork";

function App() {
	async function redirect(site) {
		window.location.href = site;
	}

	const [isModalOpen, setModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState({
		title: "",
		description: "",
		icon: null,
	});

	const toggleModal = () => {
		setModalOpen(!isModalOpen);
	};

	const handleIconClick = (src) => {
		const item = src && src.src ? src : { src };
		const file = (item.src || "").split("/").pop() || item.src || "";
		const inferred = file.split(".")[0] || "";
		const name = item.title || inferred;
		const description = item.description || `Details about ${name}`;
		setModalContent({
			title:
				typeof name === "string" && name
					? name.charAt(0).toUpperCase() + name.slice(1)
					: "",
			description,
			icon: <img src={item.src} alt={name} style={{ width: 64, height: 64 }} />,
		});
		setModalOpen(true);
	};

	return (
		<>
			<Waves
				lineColor="#fff"
				backgroundColor="rgba(255, 255, 255, 0)"
				waveSpeedX={0.02}
				waveSpeedY={0.01}
				waveAmpX={40}
				waveAmpY={20}
				friction={0.5}
				tension={0.01}
				maxCursorMove={120}
				xGap={12}
				yGap={36}
				style={{
					zIndex: -1000,
					opacity: 0.2,
				}}
				className="bg-waves"
			/>
			<div className="introduction">
				<TextType
					variableSpeedEnabled
					text={["Hey!", "Namaskar!", "Hallo!", "你好"]}
					className="greeting"
				/>
				<h2>
					I'm <span>Kartikeya Challu</span>
				</h2>
				<p className="descriptor">
					Half student, half developer,
					<br /> fully sleep-deprived.
				</p>
			</div>
			<div className="cards">
				<SpotlightCard className={"about"} spotlightColor={"#aa7dce"}>
					<p className="card-name">About</p>
					<p className="about-me">
						I am a 17 year old software developer born in India. I currently
						live in the United States and I love building innovative solutions
						using technology. I started coding at the age of 11 and have been
						learning ever since. I am currently a high school student interested
						in computer science. I have experience in Python, JavaScript, and
						Java. I love working on projects that involve machine learning, web
						development, and game development. I am always looking for new
						challenges and opportunities to learn and grow as a developer.
					</p>
				</SpotlightCard>
				<SpotlightCard className={"projects"} spotlightColor={"#aa7dce"}>
					<p className="card-name">Projects</p>
					<div className="all-projects">
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
								A mini music player that plays local files! Written in Python
								using Pygame.
							</p>
						</div>
						<div
							className="project"
							onClick={() =>
								redirect("https://github.com/mxst1/rKoshurKitchen")
							}
						>
							<a href="https://github.com/mxst1/rKoshurKitchen">
								rKoshurKitchen
							</a>
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
								A Python program made to adjust the volume and play/pause media
								on my Mac.
							</p>
						</div>
					</div>
				</SpotlightCard>
				<SpotlightCard className={"game"} spotlightColor={"#aa7dce"}>
					<div style={{ width: "500px", height: "450px" }}>
						<NeuralNetwork />
					</div>
				</SpotlightCard>
				<SpotlightCard className={"stack"} spotlightColor={"#aa7dce"}>
					<p className="card-name">Stack</p>
					<StackMarquee
						onIconClick={handleIconClick}
						items={[
							{
								src: "/icons/html.svg",
								title: "HTML",
								description:
									"When I first started web development, I learned HTML as the foundation. I found it relatively simple to understand and use. I know this language will have a special place in my toolkit, alongside other languages.",
							},
							{
								src: "/icons/css.svg",
								title: "CSS",
								description:
									"I've used CSS in the past, and I still use it to this day, the only difference is that I now understand it better and am able to style much more proficiently than before. Just like HTML, this language is extremely useful and I can't make a website without it.",
							},
							{
								src: "/icons/js.svg",
								title: "JavaScript",
								description:
									"Javascript is one of my MOST adored language. It was my first language that I had learned and, at first, I didn't learn vanilla Javascript. I learned Node.js and that's what sparked my curiosity and love of programming.",
							},
							{
								src: "/icons/python.svg",
								title: "Python",
								description:
									"Python's simplicity and uses everywhere definetly make it one of my top languages. I am continuing to learn Python and make projects with it. I love how easy Python makes AI/ML projects and the fact that I can whip up almost anything I can think of in way less lines than a C program!",
							},
							{
								src: "/icons/react.svg",
								title: "React",
								description:
									"A year or two ago, I evolved from using vanilla HTML, CSS, and Javascript, and started to learn React. I haven't gone back since because once you get a grasp of it, it's so much better and more versatile than its vanilla counterpart.",
							},
							{
								src: "/icons/node.svg",
								title: "Node",
								description:
									'When I was just starting out programming, dipping my feet in the water at the age of 11, I decided to make a bot on the platform Discord. I went onto YouTube and searched "How to make a discord bot" the person in the video I watched was using Node.js and just from watching a few videos, plus trial and error here and there, I fell in love with programming.',
							},
						]}
					/>
				</SpotlightCard>
			</div>
			<Modal
				isOpen={isModalOpen}
				onClose={() => setModalOpen(false)}
				title={modalContent.title || ""}
				description={modalContent.description || ""}
				icon={modalContent.icon}
			/>
			<footer className="cta">
				<p>Looking to collaborate or just want to say hi?</p>
				<div className="footer-icons">
					<button
						className="footer-button linkedin-button"
						onClick={() =>
							redirect("https://www.linkedin.com/in/kartikeya-challu/")
						}
						title="LinkedIn"
					>
						<img src="/icons/linkedin.svg" alt="LinkedIn" />
					</button>
					<button
						className="footer-button github-button"
						onClick={() => redirect("https://github.com/mxst1")}
						title="GitHub"
					>
						<img src="/icons/github.svg" alt="GitHub" />
					</button>
					<button
						className="footer-button email-button"
						onClick={() => redirect("mailto:kartikeyachallu@gmail.com")}
						title="Email"
					>
						<img src="/icons/mail.svg" alt="Email" />
					</button>
				</div>
			</footer>
		</>
	);
}

export default App;
