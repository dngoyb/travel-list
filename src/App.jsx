import { useState } from 'react';

const initialItems = [
	{ id: 1, description: 'Passports', quantity: 2, packed: false },
	{ id: 2, description: 'Socks', quantity: 12, packed: false },
	{ id: 3, description: 'Charger', quantity: 1, packed: false },
];

export default function App() {
	const [items, setItems] = useState(initialItems);

	function handleAddItems(item) {
		setItems((items) => [...items, item]);
	}

	function handleDeleteItem(id) {
		setItems((items) => items.filter((item) => item.id !== id));
	}

	function handleToggleItem(id) {
		setItems((items) =>
			items.map((item) =>
				item.id === id ? { ...item, packed: !item.packed } : item
			)
		);
	}

	return (
		<div className='app'>
			<Logo />
			<Form onAddItems={handleAddItems} />
			<ParkingList
				items={items}
				onDeleteItem={handleDeleteItem}
				onToggleItem={handleToggleItem}
			/>
			<Stats items={items} />
		</div>
	);
}

function Logo() {
	return <h1> 🏝️ Far Away 🧳 </h1>;
}
function Form({ onAddItems }) {
	const [description, setDescription] = useState('');
	const [quantity, setQuantity] = useState(1);

	function handleSubmit(e) {
		e.preventDefault();
		const newItem = {
			description,
			quantity,
			packed: false,
			id: Date.now(),
		};
		if (!description) return;
		onAddItems(newItem);
		setDescription('');
		setQuantity(1);
	}

	return (
		<form className='add-form' onSubmit={handleSubmit}>
			<h3>What do you need for your trip?</h3>
			<select
				value={quantity}
				onChange={(e) => setQuantity(Number(e.target.value))}>
				{Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
					<option value={num} key={num}>
						{num}
					</option>
				))}
			</select>
			<input
				type='text'
				placeholder='Item...'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button>Add</button>
		</form>
	);
}
function ParkingList({ items, onDeleteItem, onToggleItem }) {
	return (
		<div className='list'>
			<ul>
				{items.map((item) => (
					<Item
						onDeleteItem={onDeleteItem}
						onToggleItem={onToggleItem}
						key={item.id}
						item={item}
					/>
				))}
			</ul>
		</div>
	);
}

function Item({ item, onDeleteItem, onToggleItem }) {
	return (
		<li>
			<input
				type='checkbox'
				value={item.packed}
				onChange={() => onToggleItem(item.id)}
			/>
			<span style={item.packed ? { textDecorationLine: 'line-through' } : {}}>
				{item.quantity} {item.description}
			</span>

			<button onClick={() => onDeleteItem(item.id)}>❌</button>
		</li>
	);
}
function Stats({ items }) {
	if (!items.length)
		return (
			<p className='stats'>
				<em>Start adding some items to your parking list</em>
			</p>
		);
	const numItems = items.length;
	const numPacked = items.filter((item) => item.packed).length;
	const percentage = Math.round((numPacked / numItems) * 100);

	return (
		<footer className='stats'>
			<em>
				{percentage === 100
					? 'You got everything, Ready to go!'
					: `💼 You have ${numItems} items on your list, and you already packed
				${numPacked} (${percentage}%)`}
			</em>
		</footer>
	);
}
