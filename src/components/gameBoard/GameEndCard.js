function gameEnded() {
	if (this.state.showEndWindow)
		return (
			<div
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'rgba(0, 0, 0, 0.6)',
				}}
			>
				<div className='endgame__popup'>
					<p style={{ textAlign: 'center', marginTop: 0 }}>
						{this.ownPlayer === null ? (
							'Game ended'
						) : this.ownPlayer === this.state.winner ? (
							<span style={{ color: '#629923' }}>You won.</span>
						) : (
							<span style={{ color: '#CC3233' }}>You lost.</span>
						)}
					</p>
					{this.ownPlayer === this.p1 ? (
						<p className='endgame__info'>
							<div>New rating: {this.newRatingPlayer1} </div>
							<div>
								Time left: {pad(this.p1ClockRef.current.state.minutes) + ':' + pad(this.p1ClockRef.current.state.seconds)}{' '}
							</div>
							<div>Game score: {this.state.history[this.state.round].gameState.points[this.p1.props.name]}</div>
						</p>
					) : (
						<p className='endgame__info'>
							<div>New rating: {this.newRatingPlayer2} </div>
							<div>
								Time left: {pad(this.p2ClockRef.current.state.minutes) + ':' + pad(this.p2ClockRef.current.state.seconds)}
							</div>
							<div>Game score: {this.state.history[this.state.round].gameState.points[this.p2.props.name]}</div>
						</p>
					)}
					<div className='button'>
						<Button
							type='primary'
							style={{
								marginTop: '15px',
							}}
							onClick={() => {
								history.push('/');
								window.location.reload();
							}}
						>
							Back to Waiting Room
						</Button>
					</div>
				</div>
			</div>
		);
}
