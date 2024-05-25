import { signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import React from 'react'
import env from 'react-dotenv'


import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const cloudinary = () => {
  const cld = new Cloudinary({cloud: {cloudName: env.IMG_CLOUD_NAME}});
  
  // Use this sample image or upload your own via the Media Explorer
  const img = cld.image('cld-sample-5')
        .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

  return (<AdvancedImage cldImg={img}/>);
};





export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);




    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/main")

    };
    
    const logout = () => {

        signOut(auth).then(() => {
            setUser(null);
            localStorage.removeItem("user");
            
            navigate("/")
        }).catch((error) => {
            alert(error.message);
        })
        
    };

    return (
        <UserContext.Provider value={{ user, setUser, auth, login, logout, cloudinary }}>
            {children}
        </UserContext.Provider>
    )
};


export default UserContextProvider