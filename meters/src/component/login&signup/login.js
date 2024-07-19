
import React, { useState ,useContext,useEffect}  from 'react';
import AuthContext from '../authContext';


function LoginForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setIsLogin] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
 

    const loginVerification = async ()=>{
        const token = localStorage.getItem("token");
        if(token){
            const res = await fetch("http://localhost:5000/user/verify", {
                method: 'POST',
                headers: {
                    Authorization : `Bearer ${token}`,
                },
                body: JSON.stringify({ token })
            })
            const result = await res.json();
            if(result.success){
                console.log("user is logged in");
                setName(result.message[0].name);
                setEmail(result.message[0].email);
                localStorage.setItem("isLoggedIn", true);
                const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                setIsLoggedIn(userLoggedIn);
                setIsLogin(true);
            }else{
                console.log(result.message);
            }
        }else{
            console.log("token missing");
        }
        
    }


    useEffect(() => {
        // const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        // setIsLoggedIn(userLoggedIn);
        loginVerification();
    },);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send login data to backend
        try {
           
    
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const result = await response.json();
            if (result.success) {
                // login successful
                console.log('login successful');
                setIsLoggedIn(true);
                setIsLogin(true);   
                localStorage.setItem("token", result.message);
            } else {
                // login failed
                console.error('login failed');
                document.getElementById('error').innerHTML="Please enter correct credentials";
                setName("");
                setEmail("");
                setPassword("");
         
              
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const reset=()=>{
        console.log("reached");
        localStorage.removeItem("token");

        setIsLoggedIn(false);
        setIsLogin(false);
        localStorage.setItem("isLoggedIn", "false");
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
                                    <p >Welcome, {name.toUpperCase()}</p>
                                    <button className="btn btn-danger mx-2 colorbtn" onClick={reset} data-bs-toggle="modal" data-bs-target="#loginModal">Logout</button>

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
                                    <div id="error" style={{color:'red'}}></div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div> 
            {!isLoggedIn && <button className="btn btn-danger mx-1 colorbtn" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>}
          {login && isLoggedIn && <button className="btn btn-danger mx-1 colorbtn" data-bs-toggle="modal" data-bs-target="#loginModal"> {name.charAt(0).toUpperCase()}</button>}
        </>
    );
}

export default LoginForm;
