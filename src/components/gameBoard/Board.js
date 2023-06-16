import Field from './Field';
import { Stage, Layer, Rect } from 'react-konva';

export default function Board({ boardHW, boardSize, onClick, boardState, currentPlayer }) {
	return (
		<Stage width={boardHW} height={boardHW}>
			<Layer>
				<Rect width={boardHW} height={boardHW} fill='#ffc059' shadowBlur={10} />
				{boardState.map((color, i) => {
					return (
						<Field
							key={i}
							x={Math.floor(i % boardSize)}
							y={Math.floor(i / boardSize)}
							fieldSize={boardHW / boardSize}
							boardSize={boardSize}
							color={color}
							updateBoard={() => onClick(Math.floor(i % boardSize), Math.floor(i / boardSize, false), false, currentPlayer)}
						></Field>
					);
				})}
			</Layer>
		</Stage>
	);
}
