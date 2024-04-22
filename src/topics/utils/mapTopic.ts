import type { Topic } from "../types/Topic.type";
import type { RecordModel } from "pocketbase";

export const mapTopic = (topic: RecordModel): Topic => {
  return {
    id: topic.id,
    name: topic.name,
    colour: topic.colour ?? "default",
    slipCount: topic.totalSlips,
  };
};
