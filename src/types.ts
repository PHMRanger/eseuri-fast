export interface IWord {
  content: string;
  learned: boolean;
};

export interface IParagraph {
  words: IWord[];
}

export interface IText {
  paragraphs: IParagraph[];
  name: string;
};