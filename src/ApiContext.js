import React, { createContext, Component } from "react";

export const ApiContext = createContext();


//allows access to api-url deep in component tree 
//without passing the url as a prop
class ApiContextProvider extends Component {
  state = {
    baseURL: "https://peaceful-dawn-33157.herokuapp.com/api/"
  };

  render(){
      return(
          <ApiContext.Provider value={{...this.state}}>
              {this.props.children}
          </ApiContext.Provider>
      )
  }
}

export default ApiContextProvider
