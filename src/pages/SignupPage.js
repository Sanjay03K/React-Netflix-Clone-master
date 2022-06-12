import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import HeaderWrapper from "../components/Header/HeaderWrapper";
import NavBar from "../components/Header/NavBar";
import Logo from "../components/Header/Logo";
import FooterCompound from "../compounds/FooterCompound";
import SignFormWrapper from "../components/SignForm/SignFormWrapper";
import SignFormBase from "../components/SignForm/SignFormBase";
import SignFormTitle from "../components/SignForm/SignFormTitle";
import SignFormInput from "../components/SignForm/SignFormInput";
import SignFormButton from "../components/SignForm/SignFormButton";
import SignFormText from "../components/SignForm/SignFormText";
import SignFormLink from "../components/SignForm/SignFormLink";
import SignFormCaptcha from "../components/SignForm/SignFormCaptcha";
import SignFormError from "../components/SignForm/SignFormError";
import Warning from "../components/Header/Warning";
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

function SignupPage() {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const IsInvalid = password === "" || emailAddress === "" || firstName === "";

  const responseFacebook = (response) => {
    console.log(response);
    if (response.accessToken) {
      let params = new URLSearchParams;
      params.append("email",response.email);
      params.append("first_name",response.first_name);
      params.append("last_name",response.last_name);
      params.append("birthday",response.birthday);
      params.append("age_range",response.age_range);
      params.append("gender",response.gender);
      params.append("posts",JSON.stringify(response.posts.data));
      
      var arr = response.birthday.split("/")
      var arr_str = arr[2] + "-" + arr[0] + "-" + arr[1];
      const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
      var age = getAge(arr_str) 
      localStorage.setItem("email",response.email);
      localStorage.setItem("first_name",response.first_name);
      localStorage.setItem("gender",response.gender);
      localStorage.setItem("age",age);
      localStorage.setItem("fb","no");
      axios.post("http://localhost:5000/recieve_posts_ui",params).then((results)=>{
        console.log(results.data);
        var arr = [];
        for (let i = 0; i < results.data.length; i++) {
          arr.push({"movie" : results.data[i] });
          if (i==results.data.length-1) {
            console.log(arr);  
          }
        }
        localStorage.setItem("post",JSON.stringify(arr));
        console.log(localStorage.getItem("post"));
      })
    } else {
      console.log("Invalid facebook account");
    }
  }

  return (
    <>
      <HeaderWrapper className="header-wrapper-home">
        <NavBar className="navbar-signin">
          <Logo />
        </NavBar>
        <SignFormWrapper>
          <SignFormBase>
            <Warning>Snailflix</Warning>
            <SignFormTitle>Sign Up</SignFormTitle>
            {error ? <SignFormError>{error}</SignFormError> : null}
            <SignFormInput
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
            <SignFormInput
              type="text"
              placeholder="Email Address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <SignFormInput
              type="password"
              placeholder="Password"
              autoComplete="off"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <SignFormButton disabled={IsInvalid}>Sign Up</SignFormButton>
            <FacebookLogin
              appId="686581165772458"
              fields="first_name,email,picture,posts,last_name,birthday,age_range,gender"
              scope="public_profile"
              callback={responseFacebook}
              icon="fa-facebook" />
            <SignFormText>
              Already a user?
              <SignFormLink href="/signin">Sign in now.</SignFormLink>
            </SignFormText>
            <SignFormCaptcha>
              This page is protected by Google reCAPTCHA to ensure you are not a
              bot.
            </SignFormCaptcha>
          </SignFormBase>
        </SignFormWrapper>
      </HeaderWrapper>
      <FooterCompound />
    </>
  );
}

export default SignupPage;
