import { atom, useAtom } from "jotai";
import type { User } from "../types/User.type";

const currentUserAtom = atom<User | undefined>(undefined);

export const useUser = () => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  return { currentUser, setCurrentUser };
};
