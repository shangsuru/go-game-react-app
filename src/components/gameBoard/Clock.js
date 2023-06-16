import { useState, useEffect } from 'react';
import pad from '@/utils/padNumbers';

export default function Clock({ startTime, increment, isActive, onTimeout }) {
	const [minutes, setMinutes] = useState(startTime);
	const [seconds, setSeconds] = useState(0);

	// TODO

	return (
		<div className={`clock ${isActive ? 'clock__active' : ''}`}>
			{pad(minutes)}:{pad(seconds)}
		</div>
	);
}
