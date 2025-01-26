import { pb } from "src/config/pocketbase";

export default function isAuthenticated() {
  return !!pb.authStore?.record;
}
