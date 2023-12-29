import { useEffect, useState } from "react";
import { useAuthentication } from "src/authentication/hooks/useAuthentication";
import { pb, pbDevConsoleLog } from "src/pocketbase/utils/pocketbaseConfig";
import type { RecordModel, UnsubscribeFunc } from "pocketbase";
import type { Topic } from "src/topics/types/Topic.type";

const mapTopic = (topic: RecordModel): Topic => {
  return {
    id: topic.id,
    name: topic.name,
    slipCount: topic.totalSlips,
  };
};

export const useTopics = (subscribe: boolean = true) => {
  const { currentUser } = useAuthentication();
  const [topics, setTopics] = useState<Topic[]>([]);
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

  const subscribeToTopics = async (): Promise<void> => {
    // const unsub = await pb
    pb.collection("topics").subscribe(
      "*",
      ({ action, record }) => {
        switch (action) {
          // TODO: this action gets triggered twice, need to stop all the actions from double triggering
          case "create":
            pbDevConsoleLog("created action triggered");

            setTopics((currentTopics) => {
              return currentTopics.map((currentTopic) => {
                return currentTopic.id === record.id
                  ? mapTopic(record)
                  : currentTopic;
              });
            });
            break;

          case "update":
            if (record.deleted) {
              setTopics((currentTopics) =>
                currentTopics.filter((topic) => topic.id !== record.id)
              );
            } else {
              setTopics((currentTopics) => {
                const a = currentTopics.map((topic) =>
                  topic.id === record.id ? mapTopic(record) : topic
                );

                return a;
              });
            }
            break;

          default:
            break;
        }
      },
      { expand: "topics" }
    );

    // setUnsubscribeFn(unsub);
    pbDevConsoleLog(
      "subscribed to 'topics' collection successfully. Listening for CRUD actions..."
    );
  };

  useEffect(() => {
    // may need to define our callbacks within the useEffect?
    //https://dev.to/vinodchauhan7/react-hooks-with-async-await-1n9g
    currentUser && getTopics();
    subscribe && subscribeToTopics();
  }, [currentUser]);

  return { topics, loading, unsubscribeFn };
};
