import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactAPI from './utils/ContactsAPI';

class App extends Component  {

    state = {
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
    render () {
        return (
            <div>
                <ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts}/>
            </div>
        );
    }
}

export default App