import React, { useState } from "react";
import useContent from "../custom-hooks/useContent";
import HeaderWrapper from "../components/Header/HeaderWrapper";
import NavBar from "../components/Header/NavBar";
import Logo from "../components/Header/Logo";
import FeatureWrapper from "../components/Header/FeatureWrapper";
import FeatureTitle from "../components/Header/FeatureTitle";
import FeatureSubTitle from "../components/Header/FeatureSubTitle";
import PlayButton from "../components/Header/PlayButton";
import HeaderLink from "../components/Header/HeaderLink";
import PlayerVideo from "../components/Movies/PlayerVideo";
import PlayerOverlay from "../components/Movies/PlayerOverlay";
import FooterCompound from "../compounds/FooterCompound";
import { useHistory } from "react-router-dom";

import { 
    Text,
    Box,    
} from '@chakra-ui/react'

function Recommend() {
    const [post, setpost] = useState(JSON.parse(localStorage.getItem("post")));
    const [category, setCategory] = useState("recommendations");
    let history = useHistory();
    return(
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
                onClick={() => setCategory("recommendations")}
              >
                Recommendations
              </HeaderLink>
              <HeaderLink
                className={
                  category === "Profile" ? "header-link-bold" : "header-link"
                }
                onClick={() =>  history.push("/profile")}
              >
                Profile
              </HeaderLink>
            </NavBar>
            <div style={{marginLeft:"20%"}}>
                <Text fontWeight={"bold"} fontFamily={"heading"} style={{fontSize:"50px"}}>Your Recommendations</Text>
                {   
                    post.map((items)=>{
                        return(
                        <>
                        <pre><Text fontFamily={"heading"} fontSize={"30px"}>                       {items.movie}</Text></pre>
                        <br/>
                        </>
                        )
                    })
                }
            </div>
        </>
    );
}

export default Recommend;
