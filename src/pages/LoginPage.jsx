import React, { useEffect, useState } from 'react'
import Form from '../components/Form'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'

const LoginPage = () => {
	const navigate = useNavigate()
	const [user, setUser] = useState({})

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser)
		})
	}, [])

	const handleLogin = (email, password) => {
		signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				navigate('/')
			})
			.catch(console.error)
	}

	return (
		<>
			{user ? (
				<Box
					mt={30}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<Typography variant="h6">You have been already logged</Typography>
					<Button variant="contained">
						<Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
							Go back
						</Link>
					</Button>
				</Box>
			) : (
				<Box mt={30} sx={{ display: 'flex', justifyContent: 'center' }}>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
						<Typography variant="h4">Login</Typography>
						<Form title="login" handleClick={handleLogin} />
						<Link to="/register">Register</Link>
					</Box>
				</Box>
			)}
		</>
	)
}

export default LoginPage
