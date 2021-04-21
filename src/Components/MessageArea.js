import React from "react";
import Message from "./Message";
import publicIp from "public-ip";

class MessageArea extends React.Component {
	constructor(props) {
		super(props);
		this.handleMessageChange = props.handleMessageChange.bind(this);
		this.handleEnter = props.handleEnter.bind(this);
		this.handleSend = props.handleSend.bind(this);
	}
	render() {
		return (
			<div className="row">
				<div className="col-md-8 offset-md-2 px-4 chat-container">
					<ul id="scrollArea">
						{this.props.messages.map((item, index) => {
							return (
								<Message
									leftRight={
										item.owner === this.props.owner
											? "right"
											: "left"
									}
									owner={item.owner}
									message={item.message}
									key={index}
								/>
							);
						})}
					</ul>
					<div className="form-group mt-3 d-flex input-text-row">
						<input
							value={this.props.message}
							onChange={this.handleMessageChange}
							onKeyUp={this.handleEnter}
							type="text"
							className="form-control"
							placeholder="Enter Your Message"
						/>
						<button
							className="btn btn-primary ms-2"
							onClick={this.handleSend}
						>
							Send
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default MessageArea;
