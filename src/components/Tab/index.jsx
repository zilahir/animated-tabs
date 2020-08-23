import React from 'react'
import classnames from 'classnames'

import styles from './Tab.module.scss'

export const Tab = ({
	label,
	isActive,
	onClick
}) => {
	return (
		<button
			className={classnames(
				styles.oneTab,
				isActive ? styles.active : null,
			)}
			onClick={onClick}
		>
			{label}
		</button>
	)
}
