import React, { useState, useEffect } from "react";
import Musicplayer from "./musicplayer.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import 'bootstrap/dist/css/bootstrap.min.css'; // CSS
//import 'bootstrap/dist/js/bootstrap.bundle'; // JS
import "./styles/index.scss";

const URL = "https://assets.breatheco.de/apis/sound/songs";

const Home = () => {
	const AUDIO = document.querySelector("audio");
	const [sounds, setSounds] = useState([]);
	const [soundsComponents, setSoundsComponents] = useState([]);
	const [currentSong, setCurrentSong] = useState({ name: "", url: "" });
	const [playing, setPlaying] = useState(false);
	const [active, setActive] = useState(false);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Fail");
			})
			.then(responseAsJSON => {
				setSounds(responseAsJSON);
			});
		/* 			.catch(error => {
				console.log(error);
			}); */
	}, []);

	useEffect(() => {
		if (sounds) {
			setSoundsComponents(
				sounds.map((sound, index) => {
					return (
						<Musicplayer
							song={sound}
							key={index.toString()}
							select={setSong}
							id={index}
						/>
					);
				})
			);
			/* console.log(soundsComponents); */
		}
	}, [sounds]);

	const setSong = song => {
		setCurrentSong(song);
	};

	const previousSong = () => {
		let currentIndex = sounds.indexOf(currentSong);
		if (currentIndex === 0) {
			setCurrentSong(sounds[sounds.length - 1]);
		} else {
			setCurrentSong(sounds[currentIndex - 1]);
		}
	};

	const nextSong = () => {
		let currentIndex = sounds.indexOf(currentSong);
		if (currentIndex === sounds.length - 1) {
			setCurrentSong(sounds[0]);
		} else {
			setCurrentSong(sounds[currentIndex + 1]);
		}
	};

	const randomSong = () => {
		var random = position => {
			return Math.floor(Math.random() * position.length);
		};
		let randomPosition = random(soundsComponents);
		setCurrentSong(sounds[randomPosition]);
	};

	const playPause = () => {
		setPlaying(playing ? AUDIO.pause() : AUDIO.play());
	};

	const handleChangeActive = () => {
		setActive(icon => {
			return !icon;
		});
	};

	return (
		<div>
			<div className="spotiyContainer">
				<Container>
					<Row>
						<Col className="myList">
							<ol>{soundsComponents}</ol>
						</Col>
					</Row>
				</Container>
			</div>

			<div className="navbar">
				<audio
					controls
					autoPlay
					src={"https://assets.breatheco.de/apis/sound/".concat(
						currentSong.url
					)}
				/>
				<button
					onClick={() => {
						previousSong();
					}}>
					<i className="fas fa-step-backward previous"></i>
				</button>
				<button
					onClick={() => {
						playPause();
					}}>
					{active ? (
						<i
							className="fas fa-play-circle play active"
							onClick={() => handleChangeActive()}></i>
					) : (
						<i
							className="fas fa-pause-circle pause inactive"
							onClick={() => handleChangeActive()}></i>
					)}
				</button>
				{/* <button
					onClick={() => {
						AUDIO.play();
					}}>
					<i className="fas fa-play-circle play"></i>
				</button>
				<button
					onClick={() => {
						AUDIO.pause();
					}}>
					<i className="fas fa-pause-circle pause"></i>
				</button> */}
				<button
					onClick={() => {
						nextSong();
					}}>
					<i className="fas fa-step-forward next"></i>
				</button>
			</div>
		</div>
	);
};

export default Home;

