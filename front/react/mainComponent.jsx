var React = require('react');

var Component = React.createClass({
	getInitialState: function() {
		return {
			guid: ''
		};
	},
	getGuid: function(){
		$.get("/getGuid", function(response) {
			this.setState({
				guid: response.payload
			});
		}.bind(this));
	},
	render: function() {
		return <div>
					<div className="page-header">
						<h1 className="text-red"><small>Yummy Turtile riding on</small> Koa and React</h1>
					</div>
					<div className="row">
						<div className="input-field col s4 offset-s2">
							<input readOnly placeholder="Placeholder" id="first_name" type="text" className="validate" value={this.state.guid} />
							<a className="red btn" onClick={this.getGuid}>Get GUID</a>
							<label for="first_name">GUID</label>
						</div>
					</div>
				</div>;
	}
});


module.exports = Component;
