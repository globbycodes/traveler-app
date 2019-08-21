import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import '../../styles/popUp.css'
import '../../styles/templates.css';

class PopUp extends Component {

    state = {
        selector: this.props.selector,
        initialItems: [],
        currentItems: [],
        selectorProps: {}
    }

    getData = async () => {
        const getTemplates = await fetch(`/api/${this.state.selector}`);
        const receivedTemplates = await getTemplates.json();
        this.setState({
            initialItems: receivedTemplates,
            currentItems: receivedTemplates
        });
    }

    filterList(event) {
        var updatedList = this.state.initialItems;
        updatedList = updatedList.filter((o) => {
            return Object.keys(o)
                .some(k => String(JSON.stringify(o[k]))
                    .toLowerCase()
                    .includes(event.target.value.toLowerCase()))
        });

        this.setState({ currentItems: updatedList });
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div className="popup">
                <div className="popup_window">
                    <button className="close-button" onClick={this.props.closePopUp}>x</button>
                    <div className="filter-lis list-items">
                        <form>
                            <fieldset className="form-group">
                                <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filterList.bind(this)} />
                            </fieldset>
                        </form>
                        <ListGroup> <div className="template-item">
                            {
                                this.state.currentItems.map(function (item) {
                                    return <ListGroupItem key={item.messageTemplate} onClick={() => {this.props.replaceVariables(item)}}>
                                        {this.state.selector === 'guests'?
                                        <div>
                                            <h2 className="itemBig">{item.firstName} {item.lastName}</h2>
                                            <h2 className="itemSmall">Room: {item.reservation.roomNumber}</h2>
                                        </div>
                                        :
                                        <div>
                                            <h2 className="itemBig">{item.company}</h2>
                                            <h2 className="itemSmall">City: {item.city}</h2>
                                        </div>
                                        }
                                    </ListGroupItem>
                                }.bind(this))
                            }
                        </div> </ListGroup>
                    </div>
                </div>
            </div>
        );
    }
}

export default PopUp;