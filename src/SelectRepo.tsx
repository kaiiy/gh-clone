import { ink, React, ui } from "./deps.ts";

interface Item {
  label: string;
  value: string;
}

interface SelectRepoProps {
  repos: string[];
  onSelect: (item: string) => void;
}

const SelectRepo = ({ repos, onSelect }: SelectRepoProps) => {
  const { exit } = ink.useApp();

  const handleSelect = (repo: string) => {
    console.log(`Hi`);
    onSelect(repo);
    exit();
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
