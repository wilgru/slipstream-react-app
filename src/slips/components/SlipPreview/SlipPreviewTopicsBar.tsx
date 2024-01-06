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
  editableSlip,
  topics,
  onClickAddTopic,
  onBlurAddTopic,
  onChangeSlipInternal,
  createTopic,
}: SlipPreviewTopicsBarProps) => {
  const [addTopicInput, setAddTopicInput] = useState<string | undefined>(
    undefined
  );
  const [addTopicAutocompleteOptions, setAddTopicAutocompleteOptions] =
    useState<DropdownMenuOption[]>([]);

  const onChangeAddTopic = async (input: string) => {
    setAddTopicInput(input);

    let autocompleteOptions = [];

    const similarTopicsFound = topics.filter((topic) =>
      CompareCleanStrings(topic.name, input, "like")
    );

    autocompleteOptions = similarTopicsFound.map((topic) => ({
      ...topic,
      value: topic.name,
    }));

    const exactTopicFound = topics.find((topic) =>
      CompareCleanStrings(topic.name, input)
    );

    if (!exactTopicFound) {
      autocompleteOptions.push({
        name: `Create '${input}'`,
        value: input,
        id: CREATE_TOPIC_ID,
      });
    }

    setAddTopicAutocompleteOptions(autocompleteOptions);
  };

  const onSubmitAddTopic = async (topicToAdd: Topic) => {
    // if topic already added to the slip
    if (editableSlip.topics.some((topic) => topic.id === topicToAdd.id)) {
      setAddTopicInput(undefined);
      return;
    }

    if (topics.find((topic) => topic.id === topicToAdd.id)) {
      onChangeSlipInternal({
        topics: [...editableSlip.topics, topicToAdd],
      });
      setAddTopicInput(undefined);
      return;
    }

    if (topicToAdd.id === CREATE_TOPIC_ID && topicToAdd.name) {
      const newTopic = await createTopic(topicToAdd.name);
      onChangeSlipInternal({ topics: [...editableSlip.topics, newTopic] });
      setAddTopicInput(undefined);
      return;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          handleEnterKeyDown(topics, addTopicInput, onSubmitAddTopic);
          break;
        case "Escape":
          setAddTopicInput(undefined);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [addTopicInput, topics]);

  return (
    <div className="flex flex-row gap-2">
      {editableSlip.topics.map((topic) => {
        return (
          <TopicPill
            name={topic.name}
            closable
            onClose={() =>
              onChangeSlipInternal({
                topics: editableSlip.topics.filter(
                  (editableSlipTopic) => editableSlipTopic.id !== topic.id
                ),
              })
            }
          />
        );
      })}

      <DropdownMenu
        options={addTopicAutocompleteOptions}
        visible={!!addTopicInput && !!addTopicAutocompleteOptions.length}
        onSelectOption={(selectedTopic) => {
          onSubmitAddTopic({
            name: selectedTopic.value,
            id: selectedTopic.id,
          });
        }}
      >
        <div className="flex justify-center h-full">
          <textarea
            value={addTopicInput ?? ""}
            placeholder="Add topic..."
            onClick={onClickAddTopic}
            onBlur={onBlurAddTopic}
            onChange={(e) => onChangeAddTopic(e.target.value)}
            className="text-xs h-4 my-auto overflow-y-hidden bg-stone-100 text-stone-700 placeholder-stone-500 border-stone-700 select-none resize-none outline-none"
          >
            add topic...
          </textarea>
        </div>
      </DropdownMenu>
    </div>
  );
};
