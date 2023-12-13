
import React, {useState} from "react";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Routes } from "../../routes";
import SkyDiv from "../../components/SkyDiv";
import cogoToast from 'cogo-toast';

const Signup = () => {
  const types = [
    { value: '', label: 'Select Type' },
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' }
  ]
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();
  const [selectedType, setType] = useState(types[0].value);
  

  // for Signup
  const signUp = async ()=>{
    try {
      if (username === "") {
        console.log("Please enter your username");
      }
      if (email === "") {
        console.log("Please enter your username");
      }
      if (selectedType === "") {
        console.log("Please Select Type");
      }
      if (password === "" && confirmPassword === "" && password !== confirmPassword) {
        console.log("Please enter Password and confirm Password, also confirm password does not match");
      }
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // let data = {username, email, password, confirmPassword};
      var raw = JSON.stringify({
        "name": username,
        "email": email,
        "password": password,
        "confirmPassword": confirmPassword,
        "role": selectedType
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      console.log(requestOptions)
      fetch("http://localhost:5000/api/user/register", requestOptions)
      .then(response => response.text())
      .then(async result => {
        let data = JSON.parse(result);
        console.log(data);
        if(data.success) {
            cogoToast.success(data.message,{
              position: 'top-right',
              hideAfter: 3,
            });
            history.push("/")
          }
          else{
            cogoToast.error(data.message,{
              position: 'top-right',
              hideAfter: 3,
            });
          }
        })
      } catch (error) {
        console.log(error)
        cogoToast.error(error.message,{
          position: 'top-right',
          hideAfter: 3,
        });
      }
  }
  return (
    <main>
      <section className="section-header overflow-hidden bg-image text-white">
        <Container>
          <Row className="justify-content-center form-bg-image" >
            <Col xs={12} className="d-flex align-items-center flex-column flex-lg-row flex-xl-row flex-xxl-row justify-content-center">
              {/* image area with welcome text */}
              <SkyDiv />
              {/* sign-up form  */}
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded-right border-light p-4 p-lg-5 h-70 w-100 fmxw-500">
                      {/* <Form className="mt-4"> */}
                        <Form.Group id="username" className="mb-4">
                          <Form.Label className="upcoming-project-title">User Name</Form.Label>
                          <InputGroup>
                            <Form.Control autoFocus required type="username"value={username} onChange={(e)=>setName(e.target.value)}  placeholder="User Name" className="input-field"/>
                          </InputGroup>
                        </Form.Group>
                        <Form.Group id="email" className="mb-4">
                          <Form.Label className="upcoming-project-title">Email address</Form.Label>
                          <InputGroup>
                            <Form.Control autoFocus required type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="Email address" className="input-field"/>
                          </InputGroup>
                        </Form.Group>
                        <Form.Group id="password" className="mb-4">
                          <Form.Label className="upcoming-project-title">Your Password</Form.Label>
                          <InputGroup>
                            <Form.Control required type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Password" className="input-field"/>
                          </InputGroup>
                        </Form.Group>
                        <Form.Group id="confirmPassword" className="mb-4">
                          <Form.Label className="upcoming-project-title">Confirm Password</Form.Label>
                          <InputGroup>
                            <Form.Control required type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  placeholder="Password" className="input-field"/>
                          </InputGroup>
                        </Form.Group>
                        <Form.Group id="type"  className="mb-4">
                          <Form.Label className="upcoming-project-title">Sign Up As</Form.Label>
                            <Form.Select className="proposal-inputs" value={selectedType} onChange={(e)=>setType(e.target.value)}>
                                {types.map((item, i) => (
                                    <option value={item.value} key={i}>
                                        {item.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button onClick={signUp} variant="info" className="w-100 create-account">
                          Create an Account
                        </Button>
                      {/* </Form> */}

                      <p className="mb-4 mt-4 already-text">
                          Have an account? &nbsp;
                          <Card.Link as={Link} to={Routes.Signin.path} className="sign-link">
                              Sign in
                          </Card.Link>
                        </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Signup;