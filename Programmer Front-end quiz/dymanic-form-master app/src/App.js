import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import RemoveIcon from '@material-ui/icons/Remove';
// import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { v4 as uuidv4 } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
		},
	},
	button: {
		margin: theme.spacing(1),
	},
}));

function App() {
	const classes = useStyles();
	const [inputFields, setInputFields] = useState([
		{ id: uuidv4(), product: '', price: 0, qty: 1 },
	]);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('InputFields', inputFields);
		let grandTotal = 0;
		for (let i = 0; i < inputFields.length; i++) {
			grandTotal += inputFields[i].price * inputFields[i].qty;
		}
		console.log(grandTotal);
		return grandTotal;
	};

	const handleChangeInput = (id, event) => {
		const newInputFields = inputFields.map((i) => {
			if (id === i.id) {
				i[event.target.name] = event.target.value;
			}
			return i;
		});

		setInputFields(newInputFields);
	};

	const handleAddFields = () => {
		setInputFields([...inputFields, { id: uuidv4(), product: '', price: 0, qty: 1 }]);
	};

	const handleRemoveFields = (id) => {
		const values = [...inputFields];
		values.splice(
			values.findIndex((value) => value.id === id),
			1
		);
		setInputFields(values);
	};

	// handling the add button
	const [isHovering, setIsHovering] = useState(false);

	const handleMouseEnter = () => {
		setIsHovering(true);
	};

	const handleMouseLeave = () => {
		setIsHovering(false);
	};

	return (
		<Container>
			<h1>Chart App</h1>
			<IconButton
				onClick={handleAddFields}
				style={{
					backgroundColor: isHovering ? 'black ' : 'grey',
					color: isHovering ? 'white' : 'white',
					borderRadius: 10,
				}}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				New
			</IconButton>
			<form className={classes.root} onSubmit={handleSubmit}>
				{inputFields.map((inputField) => (
					<div key={inputField.id}>
						<TextField
							name="product"
							label="Product Name"
							value={inputField.product}
							onChange={(event) => handleChangeInput(inputField.id, event)}
						/>
						<TextField
							name="price"
							label="Price"
							type="number"
							value={inputField.price}
							onChange={(event) => handleChangeInput(inputField.id, event)}
						/>
						<TextField
							name="qty"
							label="Qty"
							type="number"
							value={inputField.qty}
							onChange={(event) => handleChangeInput(inputField.id, event)}
						/>
						<TextField
							name="total"
							label="Total"
							type="number"
							value={inputField.price * inputField.qty}
							onChange={(event) => handleChangeInput(inputField.id, event)}
						/>
						<IconButton
							disabled={inputFields.length === 1}
							onClick={() => handleRemoveFields(inputField.id)}
							style={{
								backgroundColor: 'red',
								color: 'white',
								borderRadius: 10,
							}}
						>
							Delete
						</IconButton>
					</div>
				))}
				<Button
					className={classes.button}
					variant="contained"
					color="primary"
					type="submit"
					endIcon={<Icon>send</Icon>}
					onClick={handleSubmit}
				>
					Calculate
				</Button>
				<TextField
					style={{
						marginRight: 0,
					}}
					name="grandTotal"
					label="Grand Total"
					disabled
					// type="number"
					// value={}
				></TextField>
			</form>
		</Container>
	);
}

export default App;
