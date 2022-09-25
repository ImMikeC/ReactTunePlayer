import React from "react";
import PropTypes from "prop-types";

const Musicplayer = props => {
	return (		
		<div>
			<li onClick={() => props.select(props.song)}>{props.song.name}</li>
		</div>
	);
};

Musicplayer.propTypes = {
	song: PropTypes.object,
	select: PropTypes.func
};

export default Musicplayer;

