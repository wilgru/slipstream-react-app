import { pb } from "src/connection/pocketbase";

export default function isAuthenticated() {
  return !!pb.authStore?.record;
}
