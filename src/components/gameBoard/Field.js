import { Rect, Circle, Line, Group } from 'react-konva';

export default function Field({ x, y, fieldSize, boardSize, color, updateBoard }) {
	let xStart = (x + 0.5) * fieldSize;
	let yStart = (y + 0.5) * fieldSize;

	return (
		<Group>
			{y !== boardSize - 1 ? <Line x={xStart} y={yStart} points={[0, 0, 0, fieldSize / 2]} stroke='black' /> : null}
			{y !== 0 ? <Line x={xStart} y={yStart} points={[0, 0, 0, -fieldSize / 2]} stroke='black' /> : null}
			{x !== boardSize - 1 ? <Line x={xStart} y={yStart} points={[0, 0, fieldSize / 2, 0]} stroke='black' /> : null}
			{x !== 0 ? <Line x={xStart} y={yStart} points={[0, 0, -fieldSize / 2, 0]} stroke='black' /> : null}
			{color ? <Circle x={xStart} y={yStart} radius={fieldSize * 0.42} fill={color} /> : null}
			<Rect
				onClick={updateBoard}
				x={(x + 0.125) * fieldSize}
				y={(y + 0.125) * fieldSize}
				width={fieldSize * 0.85}
				height={fieldSize * 0.85}
			/>
		</Group>
	);
}
