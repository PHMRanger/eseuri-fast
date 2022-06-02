import { IText } from "./types";

export const storeText = (text: IText) => {
  const texts = getTexts();

  localStorage.setItem("eseuri:texts", JSON.stringify([...texts, text.name]));
  localStorage.setItem(`eseuri:${text.name}`, JSON.stringify(text));
};

export const updateText = (text: IText) => {
  localStorage.setItem(`eseuri:${text.name}`, JSON.stringify(text));
};

export const getTexts = (): string[] => {
  const texts_raw = localStorage.getItem("eseuri:texts");
  return texts_raw ? JSON.parse(texts_raw) : [];
};

export const getText = (name: string): IText => {
  const text = localStorage.getItem(`eseuri:${name}`);
  return text && JSON.parse(text);
}