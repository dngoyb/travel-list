import { useState } from 'react';
import Item from './Item';

function ParkingList({ items, onDeleteItem, onToggleItem, onClearList }) {
	const [sortBy, setSortBy] = useState('packed');

	let sortedItems;

	if (sortBy === 'input') sortedItems = items;
	if (sortBy === 'description')
		sortedItems = items
			.slice()
			.sort((a, b) => a.description.localeCompare(b.description));
	if (sortBy === 'packed')
		sortedItems = items.slice().filter((item) => item.packed);
	if (sortBy === 'unpack')
		sortedItems = items.slice().filter((item) => item.packed === false);

	return (
		<div className='list'>
			<ul>
				{sortedItems.map((item) => (
					<Item
						onDeleteItem={onDeleteItem}
						onToggleItem={onToggleItem}
						key={item.id}
						item={item}
					/>
				))}
			</ul>
			<div className='action'>
				<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
					<option value='input'>Sort by input order order</option>
					<option value='description'>Sort by description</option>
					<option value='packed'>Sort by packed status</option>
					<option value='unpack'>Sort by not packed status</option>
				</select>
				<button onClick={onClearList}>Clear List</button>
			</div>
		</div>
	);
}

export default ParkingList;
