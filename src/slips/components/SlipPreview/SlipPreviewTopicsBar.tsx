import { useEffect, useState } from "react";
import {
  DropdownMenu,
  type DropdownMenuOption,
} from "src/common/components/DropdownMenu/DropdownMenu";
import { CompareCleanStrings } from "src/common/utils/CompareCleanStrings";
import { TopicPill } from "src/topics/components/TopicPill/TopicPill";
import { handleEnterKeyDown } from "./utils/handleEnterKeyDown";
import type { AnyKeyValueOfSlip } from "./SlipPreview";
import type { Slip } from "src/slips/types/Slip.type";
import type { Topic } from "src/topics/types/Topic.type";

type SlipPreviewTopicsBarProps = {
  editMode: boolean;
  editableSlip: Slip;
  topics: Topic[];
  onClickAddTopic: () => void;
  onBlurAddTopic: () => void;
  onChangeSlipInternal: (
    changedField: AnyKeyValueOfSlip,
    flush?: boolean
  ) => void;
  createTopic: (topic: string) => Promise<Topic>;
};

export const CREATE_TOPIC_ID = "CREATE_TOPIC";

export const SlipPreviewTopicsBar = ({
  editMode,
  editableSlip,
  topics,
  onClickAddTopic,
  onBlurAddTopic,
  onChangeSlipInternal,
  createTopic,
}: SlipPreviewTopicsBarProps) => {
  const [topicToAdd, setTopicToAdd] = useState<string | undefined>(undefined);
  const [addTopicAutocompleteOptions, setAddTopicAutocompleteOptions] =
    useState<DropdownMenuOption[]>([]);

  useEffect(() => {
    if (!editMode) {
      setTopicToAdd(undefined);
      setAddTopicAutocompleteOptions([]);
    }
  }, [editMode]);

  const onChangeTopicToAdd = async (topicToAdd: string) => {
    setTopicToAdd(topicToAdd);

    let autocompleteOptions = [];

    const similarTopicsFound = topics.filter((topic) =>
      CompareCleanStrings(topic.name, topicToAdd, "like")
    );

    autocompleteOptions = similarTopicsFound.map((topic) => ({
      ...topic,
      value: topic.name,
    }));

    const exactTopicFound = topics.find((topic) =>
      CompareCleanStrings(topic.name, topicToAdd)
    );

    if (!exactTopicFound) {
      autocompleteOptions.push({
        name: `Create '${topicToAdd}'`,
        value: topicToAdd,
        id: CREATE_TOPIC_ID,
      });
    }

    setAddTopicAutocompleteOptions(autocompleteOptions);
  };

  const onSubmitTopicToAdd = async (submittedTopicToAdd: Topic) => {
    // if topic already added to the slip
    if (
      editableSlip.topics.some((topic) => topic.id === submittedTopicToAdd.id)
    ) {
      setTopicToAdd(undefined);
      return;
    }

    if (topics.find((topic) => topic.id === submittedTopicToAdd.id)) {
      onChangeSlipInternal({
        topics: [...editableSlip.topics, submittedTopicToAdd],
      });
      setTopicToAdd(undefined);
      return;
    }

    if (
      submittedTopicToAdd.id === CREATE_TOPIC_ID &&
      submittedTopicToAdd.name
    ) {
      const newTopic = await createTopic(submittedTopicToAdd.name);
      onChangeSlipInternal({ topics: [...editableSlip.topics, newTopic] });
      setTopicToAdd(undefined);
      return;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          handleEnterKeyDown(topics, topicToAdd, onSubmitTopicToAdd);
          break;
        case "Escape":
          setTopicToAdd(undefined);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [topicToAdd, topics]);

  return (
    <div className="flex flex-row gap-2">
      {editableSlip.topics.map((topic) => {
        return <TopicPill name={topic.name} />;
      })}

      <DropdownMenu
        options={addTopicAutocompleteOptions}
        visible={!!topicToAdd && !!addTopicAutocompleteOptions.length}
        onClick={(selectedTopic) => {
          onSubmitTopicToAdd({
            name: selectedTopic.value,
            id: selectedTopic.id,
          });
        }}
      >
        <div className="flex justify-center h-full">
          <textarea
            value={topicToAdd ?? ""}
            placeholder="Add topic..."
            onClick={onClickAddTopic}
            onBlur={onBlurAddTopic}
            onChange={(e) => onChangeTopicToAdd(e.target.value)}
            className="text-xs h-4 my-auto overflow-y-hidden bg-stone-100 text-stone-700 placeholder-stone-500 border-stone-700 select-none resize-none outline-none"
          >
            add topic...
          </textarea>
        </div>
      </DropdownMenu>
    </div>
  );
};
