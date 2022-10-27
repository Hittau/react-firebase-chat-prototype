import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import {
	addDoc,
	collection,
	getDocs,
	orderBy,
	query,
	serverTimestamp
} from 'firebase/firestore'

const HomePage = () => {
	const [user, setUser] = useState({})
	const [messageValue, setMessageValue] = useState('')
	const [messages, setMessages] = useState([])

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser)
		})
	}, [])

	const logout = () => {
		signOut(auth)
	}

	useEffect(() => {
		const getData = async () => {
			const messagesRef = collection(db, 'messages')
			const q = query(messagesRef, orderBy('createdAt'))

			const messagesArr = []

			const querySnapshot = await getDocs(q)
			querySnapshot.forEach((doc) => {
				messagesArr.push({
					text: doc.data().text,
					id: doc.id,
					uid: doc.data().uid
				})
			})
			setMessages(messagesArr)
		}

		getData()
	}, [messages])

	const sendMessage = () => {
		addDoc(collection(db, 'messages'), {
			text: messageValue,
			createdAt: serverTimestamp(),
			uid: user.uid
		})
		setMessageValue('')
	}

	return (
		<>
			{user ? (
				<Box>
					<Box
						mb={6}
						sx={{
							background: '#ffa8a8'
						}}
					>
						<Container
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								padding: '12px 0'
							}}
						>
							<Typography variant="h4">Chat</Typography>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
								<Typography variant="span">{user?.email}</Typography>
								<Button variant="contained" onClick={logout}>
									Logout
								</Button>
							</Box>
						</Container>
					</Box>
					<Box>
						<Container>
							<Box
								mb={2}
								sx={{
									width: '100%',
									height: '60vh',
									border: '2px solid gray',
									borderRadius: '8px',
									overflow: 'auto',
									padding: '20px'
								}}
							>
								{messages.map((message) => (
									<p
										key={message.id}
										style={{
											position: 'relative',
											maxWidth: 'max-content',
											color: '#fff',
											background:
												user.uid === message.uid ? '#727272' : '#50b75c',
											marginLeft: user.uid === message.uid ? 'auto' : '0',
											padding: '5px 10px',
											borderRadius: '15px'
										}}
									>
										{message.text}
									</p>
								))}
							</Box>
							<Box sx={{ width: '100%', display: 'flex' }}>
								<TextField
									onChange={(e) => setMessageValue(e.target.value)}
									label="Message"
									type="text"
									value={messageValue}
									sx={{ flexBasis: '30%' }}
								/>
								<Button variant="contained" onClick={sendMessage}>
									Send
								</Button>
							</Box>
						</Container>
					</Box>
				</Box>
			) : (
				<Navigate to="/register" />
			)}
		</>
	)
}

export default HomePage
