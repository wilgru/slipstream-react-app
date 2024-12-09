import { CompareCleanStrings } from "src/common/utils/CompareCleanStrings";
import type { Topic } from "src/topics/types/Topic.type";

export const handleEnterKeyDown = (
  topics: Topic[],
  topicToAdd: string | undefined,
  onSelectExistingTopic: (topicToAdd: Topic) => void,
  onSelectCreateNewTopic: (topicToCreate: string) => void
) => {
  if (!topicToAdd) {
    return;
  }

  const existingTopic = topics.find(
    (topic) => topicToAdd && CompareCleanStrings(topic.name, topicToAdd)
  );

  if (existingTopic) {
    onSelectExistingTopic(existingTopic);
    return;
  }

  onSelectCreateNewTopic(topicToAdd);
};
