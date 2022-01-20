import React from 'react';

export default function MessageBox(props) {
	console.log('props from MessageBox', props);
	return (
		<div className={`alert alert-${props.variant || 'info'}`}>
			<p>{props.children}</p>
		</div>
	);
}
