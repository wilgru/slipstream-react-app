import type { User } from "../types/User.type";
import type { RecordModel } from "pocketbase";

export const mapUser = (recordModel: RecordModel): User => {
  return {
    id: recordModel.id,
    username: recordModel.username,
    email: recordModel.email,
    name: recordModel.name,
  };
};
