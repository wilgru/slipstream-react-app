import { useCallback, useEffect, useState } from "react";
import {
  DropdownMenu,
  type DropdownMenuOption,
} from "src/common/components/DropdownMenu/DropdownMenu";
import { CompareCleanStrings } from "src/common/utils/CompareCleanStrings";
import { TopicPill } from "src/topics/components/TopicPill/TopicPill";
import { useCreateTopic } from "src/topics/hooks/useCreateTopic";
import { useGetTopics } from "src/topics/hooks/useGetTopics";
import { handleEnterKeyDown } from "./utils/handleEnterKeyDown";
import type { Slip } from "src/slips/types/Slip.type";
import type { Topic } from "src/topics/types/Topic.type";

type EditSlipModalAttributesBarProps = {
  initialSlip: Slip;
  onChange: (topics: Topic[]) => void;
};

export const EditSlipModalAttributesBar = ({
  initialSlip,
  onChange,
}: EditSlipModalAttributesBarProps) => {
  const [showAutocompleteDropdownMenu, setShowAutocompleteDropdownMenu] =
    useState(false);
  const [addTopicInput, setAddTopicInput] = useState<string | undefined>(
    undefined
  );
  const [addTopicAutocompleteOptions, setAddTopicAutocompleteOptions] =
    useState<DropdownMenuOption[]>([]);

  const { topics } = useGetTopics();
  const { createTopic } = useCreateTopic();

  const onSelectExistingTopic = useCallback(
    async (topicToAdd: Topic) => {
      // if topic already added to the slip
      if (initialSlip.topics.some((topic) => topic.id === topicToAdd.id)) {
        setAddTopicInput(undefined);
        return;
      }

      if (topics.find((topic) => topic.id === topicToAdd.id)) {
        onChange([...initialSlip.topics, topicToAdd]);
        setAddTopicInput(undefined);
        return;
      }
    },
    [initialSlip, onChange, topics]
  );

  const onSelectCreateNewTopic = useCallback(
    async (topicToCreate: string) => {
      const newTopic = await createTopic(topicToCreate);
      onChange([...initialSlip.topics, newTopic]);
      setAddTopicInput(undefined);
    },
    [createTopic, initialSlip.topics, onChange]
  );

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

  useEffect(() => {
    setShowAutocompleteDropdownMenu(
      !!addTopicInput && !!addTopicAutocompleteOptions.length
    );
  }, [addTopicAutocompleteOptions.length, addTopicInput]);

  return (
    <div className="flex flex-row gap-2">
      {/* TODO: add type dropdown back in when working on it */}
      {/* <Button size="small">No Type</Button> */}

      {initialSlip.topics.map((topic) => {
        return (
          <TopicPill
            topic={topic}
            closable
            onClick={() =>
              onChange(
                initialSlip.topics.filter(
                  (initialSlipTopic) => initialSlipTopic.id !== topic.id
                )
              )
            }
          />
        );
      })}

      <DropdownMenu
        options={addTopicAutocompleteOptions}
        visible={showAutocompleteDropdownMenu}
        setVisible={setShowAutocompleteDropdownMenu}
      >
        <div className="flex justify-center h-full">
          <textarea
            value={addTopicInput ?? ""}
            placeholder="+ add topic"
            onChange={(e) => onChangeAddTopic(e.target.value)}
            className="text-xs h-4 my-auto overflow-y-hidden text-black placeholder-stone-500 border-black select-none resize-none outline-none"
          />
        </div>
      </DropdownMenu>
    </div>
  );
};
