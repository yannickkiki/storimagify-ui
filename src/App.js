import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, useLocation, Redirect} from "react-router-dom";

import {Urls} from "./data";

import {Login, Repository, Upload} from "./pages";
import {CustomReactRoute} from "./components";

function ScrollToTop() {
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    return (
        <Router>
            <ScrollToTop/>
            <Switch>
                <Redirect exact from="/" to={Urls.repository.base}/>
                <Route exact path={Urls.repository.base} component={Repository}/>
                <Route exact path={Urls.login.base} component={Login}/>
                <CustomReactRoute exact path={Urls.upload.base} component={Upload}/>

                {/*<Route exact path={Urls.old.home.base} component={Home}/>*/}
                {/*<CustomReactRoute path={Urls.upload_old.details} component={UploadDetails}/>*/}
                {/*<CustomReactRoute path={Urls.upload.base} component={Upload}/>*/}
                {/*<Route exact path={Urls.upload.base} component={Upload}/>*/}

                <Route path='*' exact={true} component={() => <div>Sorry, this page does not exist!</div>} />
            </Switch>
        </Router>
    );
}

export default App;
