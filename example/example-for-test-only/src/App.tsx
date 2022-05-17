import React, { useEffect } from 'react';
import { BrowserRouter as Router, Link, Outlet, useResolvedPath } from 'react-router-dom';
import './App.css';
import { MockGuard } from './guards/MockGuard';
import { useRoutesWithHelper, Status, useLoadingNotification } from './reactRouterHelpers';

function Home() {
  console.log('render 11');
  // useLoadingNotification(Home, (status: Status) => {
  //   console.log(status);
  // });


  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/home22">Home 22</Link>
      </nav>
      <Outlet/>
    </div>
  );
}

function Home2() {
  console.log('render 22');

  // useLoadingNotification(Home, (status: Status) => {
  //   console.log(status);
  // });
  useEffect(() => {
    console.log('rendered');
  }, []);


  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/home22">Home 22</Link>
      </nav>
    </div>
  );
}

// Home.testFunction = () => {
//   console.log('hello from testFunction');
// };

const RoutesWrapper = () => {
  return useRoutesWithHelper([
    {
      path: "/home",
      element: <Home />,
      children: [
        {
          path: "home22",
          element: <Home2 />,
          guards: [new MockGuard()]
          // children: [
          //   {
          //     path: "nested2",
          //     element: <Home />
          //   }
          // ]
        }
      ]
    },
  ]);
};

function App() {


  return (
    <Router>
      <RoutesWrapper />
      {/*<Routes>*/}
      {/*  <Route path="/" element={*/}
      {/*    new RouteHelper(<Home/>)*/}
      {/*      .withGuards([new MockGuard()])*/}
      {/*      .create()*/}
      {/*  }/>*/}
      {/*  <Route path="/home2" element={<RouteHelper2 element={<Home />} guards={[new MockGuard()]} />}/>*/}
      {/*  /!*<Route path="/" element={<RouteHelper element={<Home />} guards={[new MockGuard()]} />} />*!/*/}
      {/*</Routes>*/}
    </Router>
  );
}

export default App;