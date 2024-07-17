import { useState, useEffect } from "react";
import { Login } from "../api/User";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import styles from "./LoginPage.module.css";

function LoginPage({ setCurrentUser }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [redirectToHome, setRedirectToHome] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const storedEmail = localStorage.getItem("email");
		const storedPassword = localStorage.getItem("password");
		if (storedEmail) {
			setEmail(storedEmail);
		}
		if (storedPassword) {
			setPassword(storedPassword);
		}
	}, []);

	const handleLogin = async () => {
		const response = await Login(email, password);
		if (response.status === 200) {
			setCurrentUser(true);
			localStorage.setItem("token", response.data.token);
			localStorage.setItem('user', response.data.id);
			setRedirectToHome(true);
		} else {
            toast.error('User not found');
		}
	};

	return (
		<div className={styles.container}>
		<Toaster position="top-center" reverseOrder={false} />
			<div className={styles.leftSide}>
				<h1 className={styles.header}>Already have an account?</h1>
				<p className={styles.subheader}>Your personal job finder is here</p>
				<input
					type="email"
					placeholder="Email"
					value={email}
					className={styles.input}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					className={styles.input}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className={styles.button} onClick={handleLogin}>
					<b>Sign in</b>
				</button>
				<div
					className={styles.signupRedirect}
					onClick={() => {
						navigate("/signup");
					}}
				>
					Don't have an account? <b><u>Sign Up</u></b>
				</div>
				{redirectToHome && <Navigate to="/" />}
			</div>
			<div className={styles.rightSide}>
				<h1 className={styles.header}>Your personal job finder</h1>
			</div>
		</div>
	);
}

export default LoginPage;
