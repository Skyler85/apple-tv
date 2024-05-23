import styled from "styled-components";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [avatar, setAvatar] = useState(null);

    const handleSignUp = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return console.log("Passwords do not match.");
        }

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
                // Signed in
                const user = userCredential.user;
                
                // Additional user setup can be done here
            })
            .catch((error) => {
                return console.log(error);
            });
    };

    return (
        <Container>
            <Logo src='images/apple-gray-logo.svg' alt='로고' />
            <HeadingText>Welcome to world.</HeadingText>
            <form action=''>
                <Label>
                    E-mail
                    <InputText type='text' id='userEmail' required='required' value={email} onChange={(e) => setEmail(e.target.value)} />
                </Label>
                <Label>
                    Password
                    <InputText
                        type='password'
                        id='password1'
                        required='required'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Label>
                <Label>
                    Password
                    <InputText
                        type='password'
                        id='password2'
                        required='required'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Label>
                <Label>
                    Nickname
                    <InputText
                        type='text'
                        id='nickname'
                        required='required'
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </Label>
                <Label>
                    Avatar
                    <input
                        style={{ display: "block", width: "210px" }}
                        type='file'
                        id='avatar'
                        accept='image/*'
                        onChange={(e) => setAvatar(e.target.files[0])}
                    />
                </Label>

                <Button onClick={handleSignUp}>Sign Up</Button>
            </form>
        </Container>
    );
};
const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
const Logo = styled.img`
    margin-bottom: 1.3rem;
    width: 50px;
`;
const HeadingText = styled.h1`
    font-size: 1.9rem;
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
    position: relative;
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
export default SignUpPage;
