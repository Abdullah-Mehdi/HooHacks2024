//createContext is used to create a context object.
//useReducer is used to manage context
import { createContext, useReducer } from 'react'

//Keep track of the user's state
//When logged in, the user will have a property. When logged out, the user will be null.

//Create a context so that the state can be shared with other components.
export const AuthContext = createContext()

//Reducer function to manage the state of the user
//The reducer function takes in the current state and an action, and returns a new state based on the action type.
//The action will have a type and a payload.
//The type will determine what action to take, and the payload will be the data that is passed to the reducer.
//The reducer function will return a new state based on the action type.
//The reducer function will be used to update the state of the user.
//The reducer function will be passed to the AuthContextProvider to use the useReducer hook, which will return the current state and a dispatch function to update the state.



export const authReducer = (state, action) => {
        switch (action.type) {
          case 'LOGIN':
                //Payload is the user object
                //When the user logs in, the user object will be stored in the state.
                //The state will be updated with the user object.
                //The user object will be passed to the context so that other components can access it.
                return { user: action.payload }
          case 'LOGOUT':
                return { user: null }
          default:
                return state
        }
      }

//Create a provider component to wrap the app and provide the state to other components
//The provider component will use the useReducer hook to manage the state of the user.
//The provider component will pass the state and dispatch function to the context so that other components can access it.
export const AuthContextProvider = ({ children }) => {
      
  /**
   * useReducer takes two arguments:
   * authReducer: A reducer function that defines how the state should be updated based on different actions.
   * { user: null }: The initial state, where user is set to null, indicating that no user is logged in initially.
   * 
   * State and Dispatch
   * state: The current state of the authentication context. Initially, it is { user: null }.
   * dispatch: A function that is used to send actions to the authReducer to update the state.
   */
        const [state, dispatch] = useReducer(authReducer, { 
                //Initial state of the user is null
                user: null
        })
        console.log('AuthContext state:', state)
        
        return (
          //Provide the state and dispatch function to the context so that other components can access it.
          <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
          </AuthContext.Provider>
        )
      
}