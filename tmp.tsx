import React from "npm:react";
import { render } from "npm:ink";
import SelectInput from "npm:ink-select-input";

const Demo = () => {
	const handleSelect = (item: unknown) => {
		console.log(item);
		Deno.exit(0);
	};

	const items = [
		{
			label: "First",
			value: "first",
		},
		{
			label: "Second",
			value: "second",
		},
		{
			label: "Third",
			value: "third",
		},
	];

	return <SelectInput items={items} onSelect={handleSelect} />;
};

render(<Demo />);
