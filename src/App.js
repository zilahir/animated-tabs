import React, { useState } from 'react'
import styles from './styles/App.module.scss'
import { Tab } from './components/Tab'
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion'
import styled from 'styled-components'
import * as shape from "d3-shape"

import { useWindowSize } from './hooks/useWindowSize'

function App() {
	const size = useWindowSize()
	const width = size.width
	const height = 60
	const tabs = [
		{ label: 'Home', },
		{ label: 'Build', },
		{ label: 'Follow up', }
	]

	const [currMenu, setCurrentMenu] = useState(0)

	const backgroundColor = "#464a54";
	const controls = useAnimation()
	const tabWidth = 160
	
	const AnimatedSvg = styled(motion.svg)``
	
	const Path = styled(motion.path)``
	
	const getPath = (): string => {
		const left = shape.line().x(d => d.x).y(d => d.y)([
			{ x: 0, y: 0 },
		]);
		const tab = shape.line().x(d => d.x).y(d => d.y).curve(shape.curveBasis)([
			{ x: width, y: 0 },
			{ x: width + 5, y: 0 },
			{ x: width + 10, y: 10 },
			{ x: width + 15, y: height },
			{ x: width + tabWidth - 15, y: height },
			{ x: width + tabWidth - 10, y: 10 },
			{ x: width + tabWidth - 5, y: 0 },
			{ x: width + tabWidth, y: 0 },
		]);
		const right = shape.line().x(d => d.x).y(d => d.y)([
			{ x: width + tabWidth, y: 0 },
			{ x: width * 2, y: 0 },
			{ x: width * 2, y: height },
			{ x: 0, y: height },
			{ x: 0, y: 0 },
		]);
		return `${left} ${tab} ${right}`;
	};
	const d = getPath();

	const x = useMotionValue(0)
	const translateX = useTransform(x, [0, width], [-width, 0])

	function handleClick(index) {
		controls.start({
			x: index * tabWidth
		})
	}

	return (
		<div className={styles.appContainer}>
			<AnimatedSvg
				width={width * 2} {...{ height }}
				style={{
					translateX
				}}
				animate={controls}
			>
				<Path fill={backgroundColor} {...{ d }} />
			</AnimatedSvg>
			<div className={styles.tabContainer}>
				{
					tabs.map((currTab, key) => (
						<Tab
							isActive={currMenu === key}
							onClick={() => handleClick(key)}
							label={currTab.label}
						/>
					))
				}
			</div>
		</div>
	);
}

export default App;
