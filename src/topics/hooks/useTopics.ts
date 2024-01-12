import { useContext, useEffect, useState } from "react";
import { useAuthentication } from "src/authentication/hooks/useAuthentication";
import { context } from "src/common/context/context";
import { generateId } from "src/pocketbase/utils/generateId";
import { pb } from "src/pocketbase/utils/pocketbaseConfig";
import type { RecordModel } from "pocketbase";
import type { Topic } from "src/topics/types/Topic.type";

const mapTopic = (topic: RecordModel): Topic => {
  return {
    id: topic.id,
    name: topic.name,
    slipCount: topic.totalSlips,
  };
};

export const useTopics = () => {
  const { currentUser } = useAuthentication();
  const { topics, setTopics } = useContext(context);

  const [loading, setLoading] = useState<boolean>(true);

  const getTopics = async (): Promise<void> => {
    const topicsRes = await pb
      .collection("topicsWithSlipCounts")
      .getList(undefined, undefined);
    const mappedTopics = topicsRes.items.map(mapTopic);

    setTopics(mappedTopics);
    setLoading(false);
  };

  const createTopic = async (topicName: string): Promise<Topic> => {
    const topicId = generateId();

    const newTopic = await pb
      .collection("topics")
      .create({ id: topicId, name: topicName, user: currentUser?.id });

    const mappedNewTopic = mapTopic(newTopic);

    getTopics();

    return mappedNewTopic;
  };

  const updateTopic = async (
    topicId: string,
    updateTopicData: Topic
  ): Promise<void> => {
    const topicToUpdate = topics.find((topic) => topic.id === topicId);

    if (!topicToUpdate) {
      return;
    }

    const updatedTopic = await pb
      .collection("topics")
      .update(topicId, { ...updateTopicData });

    setTopics((currentTopics) => {
      return currentTopics.map((topic) =>
        topic.id === updatedTopic.id
          ? mapTopic({ ...updatedTopic, totalSlips: topic.slipCount })
          : topic
      );
    });
  };

  const deleteTopic = async (topicId: string): Promise<void> => {
    const topicsRes = await pb.collection("topics").delete(topicId);

    if (topicsRes) {
      setTopics((currentTopic) =>
        currentTopic.filter((topic) => topic.id !== topicId)
      );
    }
  };

  useEffect(() => {
    // may need to define our callbacks within the useEffect?
    //https://dev.to/vinodchauhan7/react-hooks-with-async-await-1n9g
    currentUser && getTopics();
  }, [currentUser]);

  return { topics, getTopics, createTopic, updateTopic, deleteTopic, loading };
};
