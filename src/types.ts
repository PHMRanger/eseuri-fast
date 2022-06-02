export interface IWord {
  content: string;
  schedulerInfo: ISchedulerInfo;
};

export interface IParagraph {
  words: IWord[];
}

export interface IText {
  paragraphs: IParagraph[];
  name: string;
};

export interface ISchedulerInfo {
  learningSteps: number;
  learnedAt?: Date;
  interval: number;
};