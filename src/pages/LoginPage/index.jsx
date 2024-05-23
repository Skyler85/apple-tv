import React, { useState } from "react";
import styled from "styled-components";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase";
import { AiTwotoneMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const initialUserEmail = localStorage.getItem("emailForSignIn") ? JSON.parse(localStorage.getItem("emailForSignIn")) : "";
const LoginPage = () => {
    const [email, setEmail] = useState(initialUserEmail);
    const [password, setPassword] = useState('')
    const auth = getAuth(app);

    const handleAuthEmail = (e) => {
        e.preventDefault();
        
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    console.log(userCredential);
                    const user = userCredential.user;
                    localStorage.setItem('userData', JSON.stringify(user.accessToken));
                    // ...
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    alert(`이메일 또는 패스워드를 확인하세요`);
                });
    };

    const loginApiIcons = {
        display: "flex",
        justifyContent: "spaceBetween",
    };
    return (
        <Container>
            <Center>
                {/* <Logo src='images/apple-gray-logo.svg' alt='로고' />
                <HeadingText>Sign in with your Apple ID</HeadingText>
                <Description>You will be signed in to Apple TV and Apple Music</Description>
                <Button>
                    Apple ID <InputID id="mailId" onChange={handleChange} onKeyDown={handleAuthEmail}/>
                </Button>
                <LinkText>Create New Apple ID</LinkText>
                <LinkText>Forget Apple ID or Password?</LinkText> */}
                <Logo src='images/apple-gray-logo.svg' alt='로고' />
                <HeadingText>Sign in with your Email & Password</HeadingText>
                <Description>You will be signed in to Apple TV and Apple Music</Description>
                <Label>
                    E-mail
                    <InputText type='text' id='mailId' value={email} onChange={(e) => setEmail(e.target.value)} required="required"/>
                </Label>
                <Label>
                    Password
                    <InputText type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required="required" />
                </Label>

                <Button onClick={handleAuthEmail}>Log in</Button>
                <LinkText href='/signup'>Register for a Apple TV account → </LinkText>
                <LinkText>Forgot your Password?</LinkText>

                <Icons style={loginApiIcons}>
                    <AiTwotoneMail color='white' fontSize='2rem' />
                    <FcGoogle fontSize='2rem' />
                    <FaApple color='white' fontSize='2rem' />
                </Icons>
            </Center>
        </Container>
    );
};
const Icons = styled.div`
    display: flex;
    width: 310px;
    justify-content: space-between;
    margin-top: 50px;
`;
const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
const Center = styled.div`
    max-width: 650px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Logo = styled.img`
    margin-bottom: 1.3rem;
    width: 50px;
`;
const HeadingText = styled.h1`
    font-size: 1.9rem;
`;
const Description = styled.p`
    font-size: 1.3rem;
    margin: 0;
    margin-bottom: 80px;
`;
const LinkText = styled.a`
    font-size: 1.2rem;
    color: #2997ff;
    margin-bottom: 20px;
    display: inline-block;
    cursor: pointer;
`;
const Label = styled.label`
    width: 310px;
    margin-bottom: 20px;
    padding: 1rem;
    border: 1px solid transparent;
    border-radius: 12px;
    border-color: #424245;
    font-size: 18px;
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Button = styled.button`
    margin-bottom: 4rem;
    color: #fff;
    font-size: 18px;
    border: 1px solid transparent;
    border-radius: 12px;
    border-color: #424245;
    background-color: hsla(0, 0%, 100%, 0.04);
    font-weight: 400;
    cursor: pointer;
    width: 342px;
    padding: 1rem;
    &:hover {
        background-color: hsla(0, 0%, 100%, 0.08);
    }
    position: relative;
`;

const InputText = styled.input`
    margin: auto 0;
    font-size: 20px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid transparent;
    border-radius: 5px;
    display: block;
    color: #fff;
`;
export default LoginPage;
