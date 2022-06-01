const getDifficultyKey = (name: string, stage: number) => {
  return `eseuri:${name}:${stage}:difficulty`;
}

const getDifficulty = (name: string, stage: number) => Number(localStorage.getItem(getDifficultyKey(name, stage)));
const setDifficulty = (name: string, stage: number, value: any) => localStorage.setItem(getDifficultyKey(name, stage), value);

export { getDifficulty, setDifficulty };