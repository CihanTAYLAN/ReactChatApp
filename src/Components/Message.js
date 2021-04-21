import React from "react";

class Message extends React.Component {
	render() {
		return (
			<li className={this.props.leftRight}>
				<div className="user-icon">
					<img src="/user.svg" alt="" />
				</div>
				<div className="message">
					<span>{this.props.message}</span>
				</div>
			</li>
		);
	}
}

export default Message;
