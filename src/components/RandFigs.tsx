const randInt = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min) + min)
}

const RandFig = () => {
	const x = randInt(16, window.innerWidth)
	const y = randInt(4 * 16, window.innerHeight - 4 * 16) // 4em
	const height = randInt(24, 60)
	return <img src="/images/fi.png" alt="" className="absolute z-0" style={{ top: y, left: x, height }} />
}

const RandFigs = () => {
	return (
		<>
			{[0, 1, 2, 3, 4].map(i => (
				<RandFig key={i.toString()} />
			))}
		</>
	)
}

export default RandFigs
