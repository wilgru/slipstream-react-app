import { useEffect, useState } from "react";
import {
  DropdownMenu,
  type DropdownMenuOption,
} from "src/common/components/DropdownMenu/DropdownMenu";
import { CompareCleanStrings } from "src/common/utils/CompareCleanStrings";
import { TopicPill } from "src/topics/components/TopicPill/TopicPill";
import { handleEnterKeyDown } from "./utils/handleEnterKeyDown";
import type { AnyKeyValueOfSlip } from "./SlipEditor";
import type { Slip } from "src/slips/types/Slip.type";
import type { Topic } from "src/topics/types/Topic.type";

type SlipEditorTopicsBarProps = {
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

export const SlipEditorTopicsBar = ({
  editableSlip,
  topics,
  onClickAddTopic,
  onBlurAddTopic,
  onChangeSlipInternal,
  createTopic,
}: SlipEditorTopicsBarProps) => {
  const [addTopicInput, setAddTopicInput] = useState<string | undefined>(
    undefined
  );
  const [addTopicAutocompleteOptions, setAddTopicAutocompleteOptions] =
    useState<DropdownMenuOption[]>([]);

  const onSelectExistingTopic = async (topicToAdd: Topic) => {
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
  };

  const onSelectCreateNewTopic = async (topicToCreate: string) => {
    const newTopic = await createTopic(topicToCreate);
    onChangeSlipInternal({ topics: [...editableSlip.topics, newTopic] });
    setAddTopicInput(undefined);
  };

  const onChangeAddTopic = async (input: string) => {
    if (input === "\n") {
      return;
    }

    setAddTopicInput(input);

    let autocompleteOptions: DropdownMenuOption[] = [];

    const similarTopicsFound = topics.filter((topic) =>
      CompareCleanStrings(topic.name, input, "like")
    );

    autocompleteOptions = similarTopicsFound.map((topic) => ({
      name: topic.name,
      action: () => {
        onSelectExistingTopic(topic);
      },
    }));

    const exactTopicFound = topics.find((topic) =>
      CompareCleanStrings(topic.name, input)
    );

    if (!exactTopicFound) {
      autocompleteOptions.push({
        name: `Create '${input}'`,
        action: () => {
          onSelectCreateNewTopic(input);
        },
      });
    }

    setAddTopicAutocompleteOptions(autocompleteOptions);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
          handleEnterKeyDown(
            topics,
            addTopicInput,
            onSelectExistingTopic,
            onSelectCreateNewTopic
          );
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
  }, [addTopicInput, onSelectCreateNewTopic, onSelectExistingTopic, topics]);

  return (
    <div className="flex flex-row gap-2">
      {editableSlip.topics.map((topic) => {
        return (
          <TopicPill
            topic={topic}
            closable
            onClick={() =>
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
