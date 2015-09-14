import React from 'react';

class Component extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			encodedMessage: ''
		};
	}
	getData() {
		$.get('/getData', (response) => {
			this.setState({
				data: response.payload
			});
		});
	}

	getEncodedMessage() {
		$.get('/getEncodedMessage', {
			words: this.state.data.words,
			fibo: this.state.data.fibo
		}).done((data) => {
			this.setState({
				encodedMessage: data.payload.encodedMessage
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
						<input readOnly placeholder="Placeholder" type="text" className="validate" value={this.state.data.guid} />
						<label>GUID</label>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s8 offset-s2">
						<input readOnly placeholder="Placeholder" type="text" className="validate" value={this.state.data.words}/>
						<label>Words</label>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s12">
						<textarea readOnly placeholder="Placeholder" className="materialize-textarea"  value={this.state.encodedMessage}></textarea>
						<label>Encoded Message</label>
					</div>
				</div>
				<div className="row center-align">
					<a className="red btn" onClick={this.getData.bind(this)}>Get Guid and Words</a>
					<a className="blue btn" onClick={this.getEncodedMessage.bind(this)}>Get Encoded Message</a>
				</div>
			</div>;
	}
}

export default Component;

