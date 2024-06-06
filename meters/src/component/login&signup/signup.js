import React, { useState ,useContext}  from 'react';
import AuthContext from '../authContext';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signup, setIsSignup] = useState(false);

    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send signup data to backend
        try {
            const response = await fetch('http://localhost:5000/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            if (response.ok) {
                // Signup successful
                console.log('Signup successful');
                setIsLoggedIn(true);
                setIsSignup(true);

            } else {
                // Signup failed
                console.error('Signup failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const reset=()=>{
        setIsLoggedIn(false);
        setIsSignup(false);
    }
    return (
        <>
        {/* signup */}
        <div className="modal fade" id="signupModal" tabIndex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="signupModalLabel">Signup</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {isLoggedIn ? (
                            <div>
                                <p>Welcome, {name.toUpperCase()}</p>
                                <button className="btn btn-danger mx-2" onClick={reset} data-bs-toggle="modal" data-bs-target="#signupModal">Logout</button>

                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="Input2" className="form-label">Name</label>
                                    <input type="text" id="Input2" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail2" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword2" className="form-label">Password</label>
                                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword2"/>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div> 
        {!isLoggedIn && <button className="btn btn-danger mx-1 colorbtn" data-bs-toggle="modal" data-bs-target="#signupModal">Signup</button>}
      {signup && isLoggedIn && <button className="btn btn-danger mx-1 colorbtn" data-bs-toggle="modal" data-bs-target="#signupModal"> {name.charAt(0).toUpperCase()}</button>}
    </>
);
}

export default Signup;
