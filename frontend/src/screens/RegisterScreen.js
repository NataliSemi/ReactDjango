import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
 
function RegisterScreen(location, history) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, ConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password != confirmPassword){
            setMessage('Password do not match')   
        }else{
            dispatch(login(name, email, password))
        }

    }


    return (
        <FormContainer>
            <h1>Sign In</h1>
            {}
            <h1>Register</h1>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader></Loader>}

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'> 
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                            
                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId='email'> 
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                            
                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId='password'> 
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control
                            required
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                            
                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId='passwordConfirm'> 
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            required
                            type='password'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                            
                        </Form.Control>
                    </Form.Group>

                     <Button type='submit' variant='primary'>
                         Register
                     </Button>
                </Form>

                <Row className='py-3'>
                <Col>
                    NewCustomer <Link 
                    to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Sign In
                    </Link>
                </Col>
            </Row>


        </FormContainer>
    )
}

export default RegisterScreen
