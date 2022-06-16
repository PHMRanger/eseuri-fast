import { ISchedulerInfo } from "./types";

const DAY = 1000 * 60 * 60 * 24;

export const initInfo = (): ISchedulerInfo => {
  return { learningSteps: 0, interval: 1 };
};

export const updateInfo = (oldInfo: ISchedulerInfo, correct: boolean): ISchedulerInfo => {
  if (!oldInfo.learnedAt) {
    const learningSteps = Math.max(0, oldInfo.learningSteps + (correct ? 1 : -1));
    return { ...oldInfo, learningSteps, learnedAt: (learningSteps === 2 ? new Date() : undefined) };
  }

  if (oldInfo.learnedAt) {
    oldInfo.interval *= (correct ? (1 + 0.3) : (1 - 0.3));
    if (oldInfo.interval <= 1) return { learningSteps: 1, learnedAt: undefined, interval: 1 };
    return oldInfo;
  }

  return oldInfo;
};

export const isLearned = (info: ISchedulerInfo) => {
  return false;

  if (info.learnedAt) {
    return new Date(info.learnedAt).getTime() + DAY * info.interval > Date.now();
  }

  return info.learningSteps >= 2;
};