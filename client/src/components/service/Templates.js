import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { ListGroup, ListGroupItem } from 'reactstrap';
import '../../styles/templates.css';
import { Link } from 'react-router-dom';

class Templates extends Component {
    state = {
        initialItems: [],
        currentItems: []
    }

    componentDidMount() {
        this.getTemplates();
    }

    filterList(event) {
        var updatedList = this.state.initialItems;
        updatedList = updatedList.filter((item) => {
            return item.messageTemplate.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({ currentItems: updatedList });
    }

    getTemplates = async () => {
        const getTemplates = await fetch(`/api/templates`);
        const receivedTemplates = await getTemplates.json();
        console.log(receivedTemplates[2]);
        
        this.setState({
            initialItems: receivedTemplates,
            currentItems: receivedTemplates
        });
    }

    render() {
        return (
            <div>
                <h1 className="template-editor-title">Templates</h1>
                <div className="filter-lis list-templates">
                    <form>
                        <fieldset className="form-group">
                            <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filterList.bind(this)} />
                        </fieldset>
                    </form>
                    <ListGroup> <div className="template-item">
                        {
                            this.state.currentItems.map(function (item) {
                                return  <Link  to={{ pathname: '/template', state: item }} style={{ textDecoration: 'none' }}><ListGroupItem key={item.messageTemplate}>
                                   {
                                        item.messageTemplate.length < 20 ?
                                            <h2 className="itemTitle">{item.messageTemplate}</h2> :
                                            <h2 className="itemTitle">{item.messageTemplate.substring(0, 40)}...</h2>
                                    }</ListGroupItem></Link>
                            })
                        }
                    </div> </ListGroup>
                </div>
            </div>
        );
    }
}

export default Templates;