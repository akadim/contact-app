import React, { Component } from 'react';
import { Route } from 'react-router-dom'; 
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactAPI from './utils/ContactsAPI';

class App extends Component  {

    state = {
      screen: 'list',
      contacts : []
    }

    componentDidMount() {
       ContactAPI.getAll().then((contacts) => {
         this.setState({ contacts })
       });
    }

    removeContact = (contact) => {
      this.setState((state) => ({
           contacts: state.contacts.filter((c) => {
                 return c.id !== contact.id
           })
      }));

      ContactAPI.remove(contact)
    }

    navigateToCreate = () => {
      this.setState({ screen: 'create' });
   }

   createContact = (contact) => {
      ContactAPI.create(contact).then(contact => {
         this.setState( state => ({
            contacts: state.contacts.concat([ contact ])
         }) )
      })
   }

    render () {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                  <ListContacts 
                      onDeleteContact={this.removeContact}
                      onNavigate={this.navigateToCreate} 
                      contacts={this.state.contacts}
                  />
                )}/>

                <Route path="/create" render={ ({ history }) => ( <CreateContact onCreateContact={ (contact) => { 
                  this.createContact(contact)
                  history.push('/')
                 }} />) }/>
            </div>
        );
    }
}

export default App