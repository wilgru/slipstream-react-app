import { CompareCleanStrings } from "src/common/utils/CompareCleanStrings";
import { CREATE_TOPIC_ID } from "../SlipPreviewTopicsBar";
import type { Topic } from "src/topics/types/Topic.type";

export const handleEnterKeyDown = (
  topics: Topic[],
  topicToAdd: string | undefined,
  onSubmitTopicToAdd: (topicToAdd: Topic) => void
) => {
  const existingTopic = topics.find(
    (topic) => topicToAdd && CompareCleanStrings(topic.name, topicToAdd)
  );

  if (existingTopic) {
    onSubmitTopicToAdd(existingTopic);
    return;
  }

  topicToAdd &&
    onSubmitTopicToAdd({
      name: topicToAdd,
      id: CREATE_TOPIC_ID,
    });
};
