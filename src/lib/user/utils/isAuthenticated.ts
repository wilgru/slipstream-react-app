import { pb } from "src/pocketbase/pocketbase";

export default function isAuthenticated() {
  return !!pb.authStore?.record;
}
