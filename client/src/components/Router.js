import React, {Component} from 'react';
import Editor from './service/TemplateEditor';
import Templates from './service/Templates'
import Template from './service/SelectedTemplate'
import { Switch, Route } from 'react-router';

class Router extends Component {
  render(){
    return(
      <div >
        <Switch>
          <Route exact path="/create-template" render={(props) => <Editor {...props} />} />
          <Route exact path="/template" render={(props) => <Template {...props} />} />
          <Route exact path="/" render={(props) => <Templates {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default Router;
