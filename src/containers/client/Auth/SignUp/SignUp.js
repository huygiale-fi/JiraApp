import { Button } from '@mui/material'
import React,{Fragment,useState,useEffect} from 'react'
import { AuthContainer,AuthContainerSize,AuthDisplay,AuthTitle,AuthContent,AuthInput } from './SignUp.style'
import {Link,useHistory} from 'react-router-dom'

export default function SignUp() {
    const [email, setemail] = useState(null)
    const history = useHistory()
    useEffect(() => {
        if(localStorage.getItem('email')){
            history.push("/onboarding")
        }
    }, [history])
    const handleSubmit = e => {
        e.preventDefault();
        localStorage.getItem('email')
        localStorage.setItem('email', email)
        history.push("/onboarding")
    }
    return (
        <Fragment>
            <AuthContainer>
                <AuthContainerSize>
                    <AuthDisplay>
                        <AuthTitle>Sign Up</AuthTitle>
                        <AuthContent>
                            <form onSubmit={handleSubmit}>
                            <AuthInput error={false} style={{  }} id="outlined-search-small" color="primary" label="Email" onChange={e => setemail(e.target.value)} name="email" type="search" required size="small" />
                            <Button type="submit" style={{ width: "100%", marginBottom:"16px" }} color="error" className="signup__email" variant="outlined">Continue with email</Button>
                            <Link to="/login" style={{textDecoration:'none'}}> <Button  style={{ width: "100%" }} color="primary" className="signup__email" variant="outlined">Sign In</Button></Link>
                            </form>
                        </AuthContent>
                    </AuthDisplay>
                </AuthContainerSize>
            </AuthContainer>
        </Fragment>
    )
}
