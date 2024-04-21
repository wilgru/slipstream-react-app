import { useSetAtom } from "jotai";
import { pb } from "src/pocketbase/utils/pocketbaseConfig";
import { slipsAtom } from "src/slips/atoms/slipsAtom";
import type { Topic } from "src/topics/types/Topic.type";

export const useTopics = () => {
  const setSlips = useSetAtom(slipsAtom);

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

    // update topic for any slips
    setSlips((currentSlips) =>
      currentSlips.map((currentSlip) =>
        currentSlip.topics.find((topic) => topic.id === topicId)
          ? {
              ...currentSlip,
              topics: currentSlip.topics.map((topic) =>
                topic.id === topicId
                  ? mapTopic({ ...updatedTopic, totalSlips: topic.slipCount })
                  : topic
              ),
            }
          : currentSlip
      )
    );
  };

  // useEffect(() => {
  //   // may need to define our callbacks within the useEffect?
  //   //https://dev.to/vinodchauhan7/react-hooks-with-async-await-1n9g
  //   currentUser && getTopics();
  // }, [currentUser]);

  return { updateTopic };
};
