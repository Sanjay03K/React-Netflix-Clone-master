import React, { useState } from "react";
import NavBar from "../components/Header/NavBar";
import Logo from "../components/Header/Logo";
import FooterCompound from "../compounds/FooterCompound";
import HeaderLink from "../components/Header/HeaderLink";
import HeaderWrapper from "../components/Header/HeaderWrapper";
import FacebookLogin from 'react-facebook-login';

import { 
    Text,
    Box,    
} from '@chakra-ui/react'

import { useHistory } from "react-router-dom";

function Profile() {
    const [Favourite, setFavourite] = useState([
        {name : 'Animation'},
        {name : 'Action'},
        {name : 'Comedy'}
    ]);

    const [category, setCategory] = useState("Profile");
    let history = useHistory();

    const [login, setlogin] = useState(localStorage.getItem('fb'));

    const responseFacebook = (response) => {
        console.log(response);
        if (response.accessToken) {
            localStorage.setItem("fb","Yes");
            setlogin(localStorage.getItem('fb'))
        }
    }

    return (
        <>
            <br/>
            <br/>
            <NavBar className="navbar-browse" style={{fontSize:"20px", marginBottom:"1%"}}>
              <Logo />
              <HeaderLink
                className={
                  category === "films" ? "header-link-bold" : "header-link"
                }
                onClick={() => history.push("/browse")}
              >
                Films
              </HeaderLink>
              <HeaderLink
                className={
                  category === "series" ? "header-link-bold" : "header-link"
                }
                onClick={() => setCategory("series")}
              >
                Series
              </HeaderLink>
              <HeaderLink
                className={
                  category === "recommendations" ? "header-link-bold" : "header-link"
                }
                onClick={() => history.push("/recommend")}
              >
                Recommendations
              </HeaderLink>
              <HeaderLink
                className={
                  category === "Profile" ? "header-link-bold" : "header-link"
                }
                onClick={() => setCategory("Profile")}
              >
                Profile
              </HeaderLink>
            </NavBar>
            <div style={{marginLeft:"20%"}}>
                <Text fontWeight={"bold"} fontFamily={"heading"} style={{fontSize:"50px"}}>Account Details</Text>
                <pre><Text fontFamily={"heading"} fontSize={"30px"}>                        Username                  :                  {localStorage.getItem('first_name')}</Text> </pre>
                <pre><Text fontFamily={"heading"} fontSize={"30px"}>                        Email                         :                  {localStorage.getItem('email')}</Text> </pre>
                <pre><Text fontFamily={"heading"} fontSize={"30px"}>                        Gender                       :                  {localStorage.getItem('gender')}</Text> </pre>
                <pre><Text fontFamily={"heading"} fontSize={"30px"}>                        Age                            :                  {localStorage.getItem('age')}</Text> </pre>
                <Text fontWeight={"bold"} fontFamily={"heading"} style={{fontSize:"50px"}}>Your Favourite Genres</Text> 
                {   
                    Favourite.map((items)=>{
                        return(
                        <>
                        <pre><Text fontFamily={"heading"} fontSize={"30px"}>                       {items.name}</Text></pre>
                        <br/>
                        </>
                        )
                    })
                }
                <Text fontWeight={"bold"} fontFamily={"heading"} style={{fontSize:"50px"}}>Linked Accounts</Text>
                <pre><Text fontFamily={"heading"} fontSize={"30px"}>                       Facebook                    :                  {localStorage.getItem('fb')}</Text></pre>
                {localStorage.getItem('fb') == "no"?      
                   <pre>                   <FacebookLogin
                   appId="686581165772458"
                   fields="first_name,email,picture,posts,last_name,birthday,age_range,gender"
                   scope="public_profile"
                   callback={responseFacebook}
                   icon="fa-facebook" /></pre>
                    : <></>
                }
            </div>
          <FooterCompound />
        </>
      );
}

export default Profile;
