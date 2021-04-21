import React from "react";
import MessageArea from "./Components/MessageArea";
import firebase from "./firebase";
import publicIp from "public-ip";

class App extends React.Component {
	db = firebase.firestore();
	constructor(props) {
		super(props);
		this.db.settings({
			timestampsInSnapshots: true,
		});
		this.state = {
			owner: "",
			message: "",
			messages: [],
		};
		this.fetchMessages();
		this.fetchIp();
		const messagesSnap = this.db.collection("messages");
		messagesSnap.onSnapshot(
			(response) => {
				this.fetchMessages();
			},
			(err) => {
				console.log(`Encountered error: ${err}`);
			}
		);
		this.handleMessageChange = this.handleMessageChange.bind(this);
		this.handleSend = this.handleSend.bind(this);
		this.handleEnter = this.handleEnter.bind(this);
	}
	async fetchIp() {
		var ip = await publicIp.v4();
		this.setState({ owner: ip });
	}
	async fetchMessages() {
		const messagesData = (
			await this.db
				.collection("messages")
				.orderBy("timestamp", "asc")
				.get()
		).docs;
		var messages = [];
		messagesData.forEach((d) => {
			messages.push(d.data());
		});

		this.setState({ messages: messages });
		var scrollArea = document.getElementById("scrollArea");
		scrollArea.scrollTop = scrollArea.scrollHeight;
	}
	handleMessageChange(event) {
		this.setState({ message: event.target.value });
	}
	handleSend(event) {
		// Send Firebase
		var date = new Date();
		this.db.collection("messages").add({
			owner: this.state.owner,
			message: this.state.message,
			timestamp: date.getTime(),
		});
		this.fetchMessages();
		// Send Firebase
		this.setState({ message: "" });
	}
	handleEnter(event) {
		if (event.keyCode === 13) {
			this.handleSend();
		}
	}
	render() {
		return (
			<div className="container-fluid">
				<div className="row my-3">
					<div className="col-md-8 offset-md-2 px-4">
						<h2 className="text-center">React Chat App</h2>
						<p className="text-center mt-1 mb-0">
							Welcome {this.state.owner} Start Chat
						</p>
					</div>
				</div>
				<MessageArea
					owner={this.state.owner}
					messages={this.state.messages}
					message={this.state.message}
					handleEnter={this.handleEnter}
					handleMessageChange={this.handleMessageChange}
					handleSend={this.handleSend}
				/>
			</div>
		);
	}
}

export default App;
