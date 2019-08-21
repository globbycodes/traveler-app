import React, { Component } from 'react';
import PopUp from './PopUpSelector';
import '../../styles/selectedTemplate.css'

class Template extends Component {
    state = {
        originalMsgTemplate: "",
        template: {},
        showPopUp: false,
        selector: "",
        guest: {},
        company: {},
        emailAddress: "",
        emailSubject: "",
        responseStatus: false
    }

    closePopUp(s) {
        this.setState({
            showPopUp: !this.state.showPopUp
        });
    }

    toggleGuestSelector() {
        this.setState({
            showPopUp: !this.state.showPopUp,
            selector: "guests"
        });
    }

    toggleCompanySelector() {
        this.setState({
            showPopUp: !this.state.showPopUp,
            selector: "companies"
        });
    }

    replaceVariables(selection) {
        var item = {};
        if (this.state.selector === "guests") {
            this.setState({ guest: selection });
            item = { ...this.state.company, ...selection }
        } else if (this.state.selector === "companies") {
            this.setState({ company: selection });
            item = { ...this.state.guest, ...selection }
        }
        var variables = Array.from(this.state.template.variableNames);
        var text = this.state.originalMsgTemplate;
        for (var i = 0; i < variables.length; i++) {

            if (variables[i] === "#Greeting") {

                var currentHour = (new Date()).getHours();
                var time;
                if (currentHour >= 0 && currentHour <= 12) {
                    time = "Good morning";
                } else if (currentHour >= 12 && currentHour <= 18) {
                    time = "Good afternoon";
                } else if (currentHour >= 18 && currentHour <= 24) {
                    time = "Good evening";
                }
                text = text.replace(variables[i], time)
                continue;
            }

            if (variables[i] === "#roomNumber" && (item.reservation !== undefined)) {
                text = text.replace(variables[i], item.reservation.roomNumber)
                continue;
            }

            if (item[variables[i].substring(1)] !== undefined) {
                text = text.replace(variables[i], item[variables[i].substring(1)])
            }
        }

        var newTemplate = {
            messageTemplate: text,
            variableNames: variables
        }

        this.setState({
            template: newTemplate,
            showPopUp: false,
            responseStatus: false
        });
    }

    onSubjectChange(event) {
        this.setState({
            emailSubject: event.target.value
        });
    }

    onAdressChange(event) {
        this.setState({
            emailAddress: event.target.value
        });
    }

    onSubmitEmail() {
        var emailText = this.state.template.messageTemplate;
        var emailSubject = this.state.emailSubject;
        var emailAddress = this.state.emailAddress;

        fetch("/api/emailer/", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                address: emailAddress,
                subject: emailSubject,
                text: emailText
            })
        })
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        responseStatus: true
                    });
                } else {
                    alert("Email was not sent! \n You might be not logged in \n Check credentials.js in router/config");
                }
            });
    }

    componentDidMount() {
        if (this.props.location.state) {
            this.setState({
                template: this.props.location.state,
                originalMsgTemplate: this.props.location.state.messageTemplate
            });
            localStorage.setItem('template', JSON.stringify(this.props.location.state));
            localStorage.setItem('originalTemplate', JSON.stringify(this.props.location.state.messageTemplate));
        } else {
            this.setState({
                template: JSON.parse(localStorage.getItem('template')),
                originalMsgTemplate: JSON.parse(localStorage.getItem('originalTemplate'))
            });
        }
    }

    render() {
        return (
            <div>
                <h1 className="template-editor-title">Preview</h1>
                <div className="preview-box">
                    <div className="message-template">
                        {this.state.template.messageTemplate}
                    </div>
                </div>
                <div className="buttons">
                    <button className="select-button" onClick={this.toggleGuestSelector.bind(this)}>Choose Guest</button>
                    <button className="select-button" onClick={this.toggleCompanySelector.bind(this)}>Choose Company</button>
                </div>
                <br />
                {
                    !this.state.responseStatus ? <div className="email-form">
                        <h2 className="email-form-title">Ready to send the message?</h2>

                        <input onChange={this.onAdressChange.bind(this)} className="address-input" placeholder="Email Address" />

                        <input onChange={this.onSubjectChange.bind(this)} className="subject-input" placeholder="Email Subject" />

                        <button onClick={this.onSubmitEmail.bind(this)} className="email-button">Send the email</button>
                    </div>
                        :
                        <h2 className="template-editor-title">Email was sent!</h2>
                }
                {this.state.showPopUp ? <PopUp
                    closePopUp={this.closePopUp.bind(this)} l
                    selector={this.state.selector}
                    replaceVariables={this.replaceVariables.bind(this)}
                /> : null}
            </div>
        )
    }
}

export default Template;