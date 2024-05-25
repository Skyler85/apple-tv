import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { onAuthStateChanged } from "firebase/auth";
import { UserContext } from "../context/UserContext";

const Nav = () => {
    const { auth, user, logout } = useContext(UserContext);
    const [show, setShow] = useState("false");
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const { pathname } = useLocation();

    const listener = () => {
        if (window.scrollY > 50) {
            setShow("true");
        } else {
            setShow("false");
        }
    };
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user && (pathname === "/" || pathname === "/signup")) {
                navigate("/main");
            } else if (!user && pathname === "/signup") {
                navigate("/signup");
            } else if (!user && !(pathname === "/" || pathname === "/signup")) {
                navigate("/");
            }
        });
    }, [auth, navigate, pathname]);

    useEffect(() => {
        window.addEventListener("scroll", listener);

        return () => {
            window.removeEventListener("scroll", listener);
        };
    }, []);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    };

    return (
        <NavWrapper show={show}>
            <Logo>
                <img
                    src='/images/apple-logo.png'
                    alt='logo'
                    onClick={() => {
                        window.location.href = "/";
                    }}
                />
            </Logo>
            {pathname === "/" || pathname === "/signup" ? null : (
                <Input type='text' value={searchValue} onChange={handleChange} placeholder='영화를 검색하세요' className='nav__input' />
            )}

            {!user ? null : (
                <SignOut>
                    <span style={{ letterSpacing: "3px", color: "gray", fontSize: "16px" }}>{`${user.displayName} `}</span>님
                    <UserImg src={user.photoURL} alt='avatar' />
                    <DropDown>
                        <span onClick={logout}>Logout</span>
                    </DropDown>
                </SignOut>
            )}
        </NavWrapper>
    );
};

const UserImg = styled.img`
    border-radius: 50%;
    width: 48px;
    height: 48px;
`;
const DropDown = styled.div`
    position: absolute;
    top: 48px;
    right: 0;
    background: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100px;
    opacity: 0;
`;
const SignOut = styled.div`
    position: relative;
    height: 48px;
    min-width: 48px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: end;
    &:hover {
        ${DropDown} {
            opacity: 1;
            transition-duration: 1s;
        }
    }
`;
const Input = styled.input`
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    color: white;
    padding: 5px;
    border: 1px solid lightgray;
`;

// const Login = styled.a`
//     background-color: rgba(0, 0, 0, 0.6);
//     padding: 8px 16px;
//     text-transform: uppercase;
//     letter-spacing: 1.5px;
//     border: 1px solid #f9f9f9;
//     border-radius: 4px;
//     transition: all 0.2s ease;

//     &:hover {
//         background-color: #f9f9f9;
//         color: #000;
//         border-color: transparent;
//     }
// `;

const Logo = styled.a`
    padding: 0;
    width: 70px;
    font-size: 0;
    display: inline-block;
    margin-bottom: 10px;
    img {
        display: block;
        width: 100%;
    }
`;

const NavWrapper = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: ${(props) => (props.show === "true" ? "#000000" : "#000000")};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`;

export default Nav;
