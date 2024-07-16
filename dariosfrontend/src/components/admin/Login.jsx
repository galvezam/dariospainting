import React, {useState, useEffect} from 'react';
// import './App.css';
//import AppNavbar from '../AppNavbar';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { useCookies } from 'react-cookie';

const Login = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(undefined);
    const [cookies] = useCookies(['XSRF-TOKEN']);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const location = useLocation();

    const estimateDetails = location.state?.estimateDetails || {};
    console.log(estimateDetails);


    useEffect(() => {
        setLoading(true);
        fetch("users/api/user", { credentials: "include"})
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(body => {
                try {
                    const user = JSON.parse(body);
                    setUser(user);
                    setAuthenticated(true);
                    navigate('/user/add-booking', { state: { estimateDetails } }); // Use navigate instead of history.push
                } catch (error) {
                    setAuthenticated(false);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                setAuthenticated(false);
                setLoading(false);
            });
    }, [setAuthenticated, setLoading, setUser, navigate]);

    const login = () => {
        let port = (window.location.port ? ':' + window.location.port : '');
        if (port === ':3001') {
            port = ':8080';
        }
        // const redirectUri = `${window.location.origin}${port}/login/oauth2/code/okta`; // Ensure this matches the provider's settings
        // window.location.href = `//${window.location.hostname}${port}/api/private?redirect_uri=${encodeURIComponent(redirectUri)}`;
        window.location.href = `//${window.location.hostname}${port}/api/private`;
    }

    const logout = () => {
        fetch("users/api/logout", {
            method: "POST", credentials: "include",
            headers: { 'X-XSRF-TOKEN': cookies['XSRF-TOKEN']}
        })
            .then(res => res.json())
            .then(response => {
                window.location.href = `${response.logoutUrl}?id_token_hint=${response.idToken}`
                    + `&post_logout_redirect_uri=${window.location.origin}`;
            });
    };

    const continueAsGuest = () => {
        setAuthenticated(true);
        navigate('/user/add-booking', { state: { estimateDetails } });
    };

    const message = user ?
        <h2>Welcome, {user.name}!</h2> :
        <p>Please log in to book an estimate.</p>;

    const button = authenticated ?
        <div>
            <Button color="link"><Link to="/groups">Manage Events</Link></Button>
            <br/>
            <Button color="link" onClick={logout}>Logout</Button>
            
        </div> :
        <div>
            <Button color="primary" onClick={login}>Login</Button>;
            <Button color="primary" onClick={continueAsGuest}>Continue as Guest</Button>
        </div>

    if (loading) {
        return <p>Loading...</p>;
    };

    return (
        <div>
            {/* <AppNavbar/> */}
            <Container fluid>
                {message}
                {button}
               {/* <Button color="link">
                    <Link to="/groups">Manage Tasks</Link>
                </Button>*/}
            </Container>
        </div>
    );
};

export default Login;