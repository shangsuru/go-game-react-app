import { renderFlag } from '@/utils/countries';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import Clock from '@/components/gameBoard/Clock';

export default function PlayerInfo({ color, name, country, rating, time, increment, onTimeout }) {
	const INFOBOX_SYMBOL_RATIO = 6;

	return (
		<div className='infobox'>
			<Row type='flex' className='infoboxrow'>
				<Col span={INFOBOX_SYMBOL_RATIO}>
					<div className='infoboxiconcontainer'>
						<div
							style={{
								borderRadius: '50%',
								border: '0',
								backgroundColor: color,
								width: '20px',
								height: '20px',
							}}
						/>
					</div>
				</Col>
				<Col>{name}</Col>
			</Row>
			<Row type='flex' className='infoboxrow'>
				<Col span={INFOBOX_SYMBOL_RATIO}>
					<div className='infoboxiconcontainer'>
						<div style={{ height: 'min-content', width: 'min-content' }}>
							<img width='5%' alt={country} src={renderFlag(country)} className='flag' />
						</div>
					</div>
				</Col>
				<Col>{country}</Col>
			</Row>
			<Row type='flex' className='infoboxrow'>
				<Col span={INFOBOX_SYMBOL_RATIO} className='infoboxiconcontainer'>
					<div className='infoboxicon'>
						<img src={'/rank_sym.png'} alt='rank_sym' className='sicon' />
					</div>
				</Col>
				<Col>{rating}</Col>
			</Row>
			<Row type='flex' className='infoboxrow'>
				<Col span={INFOBOX_SYMBOL_RATIO} className='infoboxiconcontainer'>
					<div className='infoboxicon'>
						<img src={'/time_icon.png'} alt='time_icon' className='sicon' />
					</div>
				</Col>
				<Col>
					<Clock
						isActive={true} // TODO
						startTime={time}
						increment={increment}
						onTimeout={onTimeout}
					/>
				</Col>
			</Row>
		</div>
	);
}
