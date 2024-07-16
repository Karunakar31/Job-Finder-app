/* eslint-disable react/prop-types */

import { useState } from "react";
import { Login, Register } from "../api/User";
import { Navigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";


function RegisterPage({ setCurrentUser }) {
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [mobile, setMobile] = useState();
	const [password, setPassword] = useState();
	const [checkbox, setCheckbox] = useState(false);
    const [errors, setErrors] = useState({});
	const [showLoginRedirect, setShowLoginRedirect] = useState(false);

	const validate = () => {
        const errors = {};
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
        if (!name) errors.name = "Name is required";
        if (!email) {
            errors.email = "Email is required";
        } else if (!re.test(String(email).toLowerCase())) {
            errors.email = "Email is invalid";
        }
        if (!mobile) errors.mobile = "Mobile number is required";
        if (!password) errors.password = "Password is required";
        if (!checkbox) errors.checkbox = "You must agree to the terms";

        return errors;
    };

	const handleRegister = async () => {
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        registerUser();
    }

	const registerUser = async () => {
		const response = await Register(name, email, mobile, password);
		if (response.status === 201) {
			const loginResponse = await Login(email, password);
			if (loginResponse.status === 200) {
				setCurrentUser(true);
				const { data } = loginResponse;
				const { token } = data;
				localStorage.setItem("token", token);
				setShowLoginRedirect(true);
			}
		}
	};

	const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleRegister();
        }
    }


	return (
		<div className={styles.container}>
			<div className={styles.leftSide}>
			<h1 className={styles.header}>Create an account?</h1>
			<p className={styles.subheader}>Your personal job finder is here</p>
			<input
				type="text"
				placeholder="Name"
				value={name}
				className={styles.input}
				onChange={(e) => setName(e.target.value)}
				onKeyDown={handleKeyDown}
			/>{errors.name && <div className={styles.error}>{errors.name}</div>}
			<input
				type="email"
				placeholder="Email"
				value={email}
				className={styles.input}
				onChange={(e) => setEmail(e.target.value)}
				onKeyDown={handleKeyDown}
			/>{errors.email && <div className={styles.error}>{errors.email}</div>}
			<input
				type="number"
				placeholder="Mobile"
				value={mobile}
				className={styles.input}
				onChange={(e) => setMobile(e.target.value)}
				onKeyDown={handleKeyDown}
			/>{errors.mobile && <div className={styles.error}>{errors.mobile}</div>}
			<input
				type="password"
				placeholder="Password"
				value={password}
				className={styles.input}
				onChange={(e) => setPassword(e.target.value)}
				onKeyDown={handleKeyDown}
			/>{errors.password && <div className={styles.error}>{errors.password}</div>}
			<div className={styles.checkbox}>
                <input type="checkbox" name='terms&conditions' value={checkbox} onChange={() => setCheckbox(true)} onKeyDown={handleKeyDown}/>
                <label htmlFor="terms&conditions" >By creating an account, I agree to our terms of use and privacy policy</label>
                        </div>
			<div>{errors.checkbox && <div className={styles.error}>{errors.checkbox}</div>}
			</div>
			<button className={styles.button} onClick={handleRegister}>Create Account</button>
			{showLoginRedirect && <Navigate to="/" />}
			<div
				className={styles.signupRedirect}
				onClick={() => (window.location.href = "/login")}
				>
			Already have an account? <b><u>Sign In</u></b></div>
		</div>
		<div className={styles.rightSide}>
			<h1 className={styles.header}>Your personal job finder</h1>
		</div>
	</div>
	);
}

export default RegisterPage;
