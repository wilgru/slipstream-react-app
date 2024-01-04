import { useContext, useEffect, useState } from "react";
import { useAuthentication } from "src/authentication/hooks/useAuthentication";
import { context } from "src/common/context/context";
import { generateId } from "src/pocketbase/utils/generateId";
import { pb } from "src/pocketbase/utils/pocketbaseConfig";
import type { RecordModel, UnsubscribeFunc } from "pocketbase";
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
  const [unsubscribeFn] = useState<UnsubscribeFunc | undefined>(undefined);

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

  useEffect(() => {
    // may need to define our callbacks within the useEffect?
    //https://dev.to/vinodchauhan7/react-hooks-with-async-await-1n9g
    currentUser && getTopics();
  }, [currentUser]);

  return { topics, getTopics, createTopic, loading, unsubscribeFn };
};
