// import React, { Component, createContext } from 'react';
// import Toggle from '../components/Toggle';

// const MenuContext = createContext();

// const Provider = MenuContext.Provider;

// const MenuConsumer = MenuContext.Consumer;

// export const withMenu = (Comp) => {
//   return class WithMenu extends Component {
    
//     render() {
//       return (
//         <MenuConsumer>
//           { 
//             ({isLoading,
//               isLoggedin,
//               user,
//               handleLogin,
//               handleLogout
//             }) => <Comp {...this.props} isLoading={isLoading} isLoggedin={isLoggedin} user={user} handleLogin={handleLogin} handleLogout={handleLogout}  />
//           }
//         </MenuConsumer>
//       )
        
//     }
//   }
// }

// export default class MenuProvider extends Component {
//   state = {
//     opened: false,    
//   }

//   componentDidMount() {
//     authService.me()
//     .then((user) => {
//         this.setState({
//           isLoggedin: true,
//           user,
//           isLoading: false,
//         })
        
//         console.log('me', user);
//       })
//       .catch(() => {
//         this.setState({
//           isLoading: false
//         })
//       })
//   }

//   handleLogin = (user) => {
//     authService.login(user)
//       .then((loggedUser) => {
//         this.setState({
//           isLoggedin: true,
//           user: loggedUser,
//           isLoading: false
//         })
//       })
//       .catch(() => {
//         this.setState({
//           isLoading: false
//         })
//       })
//   }

//   handleLogout = () => {
//     this.setState({
//       isLoading: true,
//     })
//     authService.logout()
//       .then(() => {
//         this.setState({
//           isLoggedin: false,
//           user: undefined,
//           isLoading: false,
//         })
//       })
//       .catch(() => {
//         this.setState({
//           isLoading: false,
//           isLoggedin: false,
//           user: undefined,
//         })
//       })
//   }

//   render() {
//     const { isLoading, isLoggedin, user } = this.state
//     const { children } = this.props;
//     if (isLoading) {
//       return <div>Loading...</div>
//     } else {
//       return (
//         <Provider value={{
//           isLoading,
//           isLoggedin,
//           user,
//           handleLogin: this.handleLogin,
//           handleLogout: this.handleLogout,
//         }}>
//           {children}
//         </Provider>
//       )
//     }
//   }
// }