import { React, ui } from "./deps.ts";

interface Item {
  label: string;
  value: string;
}

interface SelectRepoProps {
  repos: string[];
  onSelect: (item: string) => void | Promise<void>;
}

const SelectRepo = ({ repos, onSelect }: SelectRepoProps) => {
  const handleSelect = async (repo: string) => {
    await onSelect(repo);
  };

  const items = repos.map((repo) => ({
    label: repo,
    value: repo,
  })) satisfies Item[];

  return (
    <ui.Select
      options={items}
      onChange={handleSelect}
      visibleOptionCount={10}
    />
  );
};

export default SelectRepo;
