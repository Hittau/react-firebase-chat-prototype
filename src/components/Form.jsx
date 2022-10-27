import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'

const Form = ({ title, handleClick }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	return (
		<Box
			width='300px'
			sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
		>
			<TextField
				label='Email'
				type='email'
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>
			<TextField
				label='Password'
				type='password'
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<Button variant='contained' onClick={() => handleClick(email, password)}>
				{title}
			</Button>
		</Box>
	)
}

export default Form
