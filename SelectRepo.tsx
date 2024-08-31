import { ghClone } from "./cmd.ts";
import SelectInput from "npm:ink-select-input@6.0.0";
import React from "npm:react@17.0.2";

interface Item {
    label: string;
    value: string;
}

interface SelectRepoProps {
    repos: string[];
}

const SelectRepo = ({ repos }: SelectRepoProps) => {
    const handleSelect = async (item: Item) => {
        await ghClone(item.value);
    };

    const items = repos.map((repo) => ({
        label: repo,
        value: repo,
    })) satisfies Item[];

    return <SelectInput items={items} onSelect={handleSelect} limit={10} />;
};

export default SelectRepo;
