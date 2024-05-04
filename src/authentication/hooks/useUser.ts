import { atom, useAtom } from "jotai";
import type { User } from "../types/User.type";

const currentUserAtom = atom<User | undefined>(undefined);

export const useUser = () => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom); //somehow store user data in a query cache/access the data from the cache here instead of an atom?

  return { currentUser, setCurrentUser };
};
