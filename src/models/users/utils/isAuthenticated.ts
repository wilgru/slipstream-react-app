import { pb } from "src/connections/pocketbase";

export default function isAuthenticated() {
  return !!pb.authStore?.record;
}
