import React, { Component } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import '../../styles/editorStyle.css'
import variables from '../data';
import 'draft-js-mention-plugin/lib/plugin.css';

export default class CustomMentionEditor extends Component {

    state = {
        editorState: EditorState.createEmpty(),
        suggestions: variables,
        variables: new Set(),
        responseStatus: false,
        onSuggestion: false
    };

    mentionPlugin = createMentionPlugin({
        variables,
        mentionTrigger: '#',
        mentionPrefix: '#',
        mentionComponent: (mentionProps) => {
            var variablesUpdated = this.state.variables;
            variablesUpdated.add(mentionProps.decoratedText)
            this.setState({ 
                variables: variablesUpdated,
                onSuggestion: false
             })
            
            return (
                <span
                    className={mentionProps.className}
                >
                    {mentionProps.children}
                </span>
            )
        },
    });

    onChange = (editorState) => {    
        console.log("sssss");
        
        this.setState({
            editorState,
        });
    };

    onSearchChange = ({ value }) => {
        this.setState({
            suggestions: defaultSuggestionsFilter(value, variables),
            onSuggestion: true
        });
    };

    focus = () => {
        this.editor.focus();
    };


    saveNewTemplate() {

        const variables = Array.from(this.state.variables);
        const messageTemplate = this.state.editorState.getCurrentContent().getPlainText('\u0001')
        

        fetch("/api/templates/save", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                messageTemplate: messageTemplate,
                variableNames: variables
            })
        })
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        responseStatus: true
                    });
                } else {
                    alert("Template was not saved!");
                }
            });

    }

    handleReturn(e) {
        const { editorState } = this.state;
        if (e && !this.state.onSuggestion) {
          this.setState({ editorState: RichUtils.insertSoftNewline(editorState) });
          return 'handled';
        }
        return 'not-handled';
      }

    render() {
        const { MentionSuggestions } = this.mentionPlugin;
        const plugins = [this.mentionPlugin];

        return (
            <div className="editor">
                <h1 className="template-editor-title">Template Editor</h1>
                <div>{!this.state.responseStatus ?
                    <div>
                        <div className="root">
                            <div className="editor">
                                <Editor
                                    editorState={this.state.editorState}
                                    onChange={this.onChange}
                                    plugins={plugins}
                                    handleReturn={this.handleReturn.bind(this)}
                                    ref={(element) => { this.editor = element; }}
                                />
                            </div>
                        </div>
                        <div className="button-box">
                            <button className="save-template" onClick={this.saveNewTemplate.bind(this)}>Save your template</button>
                        </div>
                        <div className="template-editor-description">
                            Use this editor to create your own template!
                            <br />
                            Type '#' symbol and select the type of placeholder (i.e "firstName")
                            <br />
                            The #Greeting will be replaced accordingly to your current time (i.e "Good afternoon" if time is 13:00)
                        </div>
                    </div> : <h1 className="success-message">Your template was saved!</h1>
                }
                </div>

                <MentionSuggestions
                    onSearchChange={this.onSearchChange}
                    suggestions={this.state.suggestions}
                />
            </div>
        );
    }
}