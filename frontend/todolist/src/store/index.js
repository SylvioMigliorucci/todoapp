import React from 'react';
export const Context = React.createContext();
export class Provider extends React.Component {
state = {
    name: 'My Name'
}
render() {
    return (
        <Context.Provider value={this.state}>
            {this.props.children}
        </Context.Provider>
    )
 }
}