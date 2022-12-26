// import React, { useContext, createContext, useState } from "react";
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     Redirect,
//     useHistory,
//     useLocation
// } from "react-router-dom";

// function ProtectedRoutes() {

//     const authContext = createContext();

//     function ProvideAuth({ children }) {
//         const auth = useProvideAuth();
//         return (
//             <authContext.Provider value={auth}>
//                 {children}
//             </authContext.Provider>
//         );
//     }

//     function useAuth() {
//         return useContext(authContext);
//     }

//     function PrivateRoute({ children, ...rest }) {
//         let auth = useAuth();
//         return (
//             <Route
//                 {...rest}
//                 render={({ location }) =>
//                     auth.user ? (
//                         children
//                     ) : (
//                         <Redirect
//                             to={{
//                                 pathname: "/login",
//                                 state: { from: location }
//                             }}
//                         />
//                     )
//                 }
//             />
//         );
//     }
//     return (
//         <div>

//         </div>
//     )
// }

// export default ProtectedRoutes