import React from 'react';

class Component extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			guid: ''
		};
	}
	getGuid() {
		var self = this;
		$.get("/getGuid", function(response) {
			self.setState({
				guid: response.payload
			});
		});
	}
	render() {
		return <div>
				<div className="page-header">
					<h1 className="text-red"><small>Yummy Turtile riding on</small> Koa and React</h1>
				</div>
				<div className="row">
					<div className="input-field col s4 offset-s2">
						<input readOnly placeholder="Placeholder" id="first_name" type="text" className="validate" value={this.state.guid} />
						<a className="red btn" onClick={this.getGuid.bind(this)}>Get GUID</a>
						<label for="first_name">GUID</label>
					</div>
				</div>
			</div>;
	}
}

Component.defaultProps = { guid: '' };
export default Component;
