
import React, { useState ,useContext,useEffect}  from 'react';
import AuthContext from '../authContext';


function LoginForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setIsLogin] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    useEffect(() => {
        const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(userLoggedIn);
    }, [setIsLoggedIn]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send login data to backend
        try {
            const url = new URL('http://localhost:5000/login');
            url.searchParams.append('name', name);
            url.searchParams.append('email', email);
            url.searchParams.append('password', password);
            console.log(url);
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
      console.log(response);
            if (response.ok) {
                // login successful
                console.log('login successful');
                setIsLoggedIn(true);
                setIsLogin(true);
            } else {
                // login failed
                console.error('login failed');
                document.getElementById('error').innerHTML="please enter correct credentials";
         
              
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const reset=()=>{
        setIsLoggedIn(false);
        setIsLogin(false);
    }

    return (
        <>
            {/* login */}
            <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="loginModalLabel">Login</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {isLoggedIn ? (
                                <div>
                                    <p>Welcome, {name.toUpperCase()}</p>
                                    <button className="btn btn-danger mx-2" onClick={reset} data-bs-toggle="modal" data-bs-target="#loginModal">Logout</button>

                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="Input1" className="form-label">Name</label>
                                        <input type="text" id="Input1" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1"/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    <div id="error"></div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div> 
            {!isLoggedIn && <button className="btn btn-danger mx-2" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>}
          {login && isLoggedIn && <button className="btn btn-danger mx-2" data-bs-toggle="modal" data-bs-target="#loginModal"> {name.charAt(0).toUpperCase()}</button>}
        </>
    );
}

export default LoginForm;
