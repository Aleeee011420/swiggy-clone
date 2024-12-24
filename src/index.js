import React, {lazy, Suspense,useContext } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
//import Footer from "./Components/Footer";
import {Contact} from "./components/Contact";
import {userContext} from "./constants/userContext";
import {Cart} from "./components/Cart";

import {Provider} from "react-redux";
import {store}  from "./constants/store";


import {RestaurantMenu} from "./components/RestaurantMenu";
import {Login} from "./components/Login"
const About = lazy(() =>
  import("./components/About").then((module) => ({ default: module.About }))
);


import {createBrowserRouter, RouterProvider,Outlet} from "react-router-dom";


const AppLayout = () => {
  const user=useContext(userContext);
  return (
    <React.Fragment>
      
      
        <Provider store={store}>
      <Header />
      <Outlet/>
           </Provider>
    

    </React.Fragment>
  );
};

const appRouter= createBrowserRouter([
  {
    path:"/",
    element:<AppLayout/>,
    children:
[
  {
    path:"/",
    element:<Body/>,
  },
  {
    path:"/about",
    element:(<Suspense> <About/></Suspense>
   ),
  },
  
  {
    path:"/cart",
    element:<Cart/>
  },
  {
    path:"/contact",
    element:<Contact/>
  },
  {
    path:"/restaurant/:resId",
    element:<RestaurantMenu/>,
  },
] ,
 },
 {
  path:"login",
  element:<Login/>
 },

],
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);