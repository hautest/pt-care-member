import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

const isMemberListEditModeAtom = atom(false);

export const useSetIsMemberListEditModeAtom = () =>
  useSetAtom(isMemberListEditModeAtom);
export const useIsMemberListEditModeAtomValue = () =>
  useAtomValue(isMemberListEditModeAtom);
export const useIsMemberListEditModeAtom = () =>
  useAtom(isMemberListEditModeAtom);
