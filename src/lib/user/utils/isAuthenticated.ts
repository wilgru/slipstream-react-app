import { pb } from "src/lib/pocketbase/pocketbase";

export default function isAuthenticated() {
  return !!pb.authStore?.record;
}
