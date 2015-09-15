import React from 'react';

class Component extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {}
		};
	}
	startEncoding() {
		$.get('/encodeData', (response) => {
			this.setState({
				data: response.payload
			});
		});
	}

	render() {
		return <div>
				<div className="page-header">
					<h1 className="text-red"><small>Yummy Turtile riding on</small> Koa and React</h1>
				</div>
				<div className="row">
					<div className="input-field col s12">
						<textarea readOnly placeholder="Placeholder" className="materialize-textarea"></textarea>
						<label>Encoded Message</label>
					</div>
				</div>
				<div className="row center-align">
					<a className="red btn" onClick={this.startEncoding.bind(this)}>Start</a>
				</div>
			</div>;
	}
}

export default Component;

