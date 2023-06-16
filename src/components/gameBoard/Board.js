import Field from './Field';
import { Stage, Layer, Rect } from 'react-konva';

export default function Board({ canvasSize, boardSize, updateBoard, boardState, blacksTurn }) {
	return (
		<Stage width={canvasSize} height={canvasSize}>
			<Layer>
				<Rect width={canvasSize} height={canvasSize} fill='#ffc059' shadowBlur={10} />
				{boardState.map((color, i) => {
					return (
						<Field
							key={i}
							x={Math.floor(i % boardSize)}
							y={Math.floor(i / boardSize)}
							fieldSize={canvasSize / boardSize}
							boardSize={boardSize}
							color={color}
							updateBoard={() => updateBoard(Math.floor(i % boardSize), Math.floor(i / boardSize), blacksTurn)}
						></Field>
					);
				})}
			</Layer>
		</Stage>
	);
}
