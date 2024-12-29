import { Plus, X } from "@phosphor-icons/react";
import { useCallback, useState } from "react";
import { components } from "react-select";
import CreatableSelect from "react-select/creatable";
import { customisationColours } from "src/common/constants/customisationColours";
import { cn } from "src/common/utils/cn";
import { useCreateTopic } from "src/topics/hooks/useCreateTopic";
import { useGetTopics } from "src/topics/hooks/useGetTopics";
import type { Colour } from "src/common/types/Colour";
import type { Slip } from "src/slips/types/Slip.type";
import type { Topic } from "src/topics/types/Topic.type";

type EditSlipModalAttributesBarProps = {
  initialSlip: Slip;
  onChange: (topics: Topic[]) => void;
};

type Option = {
  label: string;
  value: string;
};

const getTopicBackgroundColourFromTopicId = (
  topics: Topic[],
  topicId: string
): Colour => {
  const topic = topics.find((topic) => topic.id === topicId);
  console.log(topic);

  const topicCustomisationColour = customisationColours.find(
    (colour) => colour.name === topic?.colour
  );

  console.log(topicCustomisationColour);
  return (
    topicCustomisationColour ?? {
      name: "grey",
      textClass: "text-gray-400",
      backgroundClass: "bg-gray-400",
    }
  );
};

export const EditSlipModalAttributesBar = ({
  initialSlip,
  onChange,
}: EditSlipModalAttributesBarProps) => {
  const { topics } = useGetTopics();
  const { createTopic } = useCreateTopic();

  const [value, setValue] = useState<Option[]>(
    initialSlip.topics.map((topic) => ({
      value: topic.id,
      label: topic.name,
    }))
  );

  // const onSelectExistingTopic = useCallback(
  //   async (topicToAdd: Topic) => {
  //     // if topic already added to the slip
  //     if (initialSlip.topics.some((topic) => topic.id === topicToAdd.id)) {
  //       setAddTopicInput(undefined);
  //       return;
  //     }

  //     if (topics.find((topic) => topic.id === topicToAdd.id)) {
  //       onChange([...initialSlip.topics, topicToAdd]);
  //       setAddTopicInput(undefined);
  //       return;
  //     }
  //   },
  //   [initialSlip, onChange, topics]
  // );

  const onCreateNewTopic = useCallback(
    async (topicToCreate: string) => {
      const newTopic = await createTopic(topicToCreate);

      setValue((currentValue) => [
        ...currentValue,
        { value: newTopic.id, label: newTopic.name },
      ]);

      onChange([...initialSlip.topics, newTopic]);
    },
    [createTopic, initialSlip.topics, onChange]
  );

  // const onChangeAddTopic = async (input: string) => {
  //   if (input === "\n") {
  //     return;
  //   }

  //   setAddTopicInput(input);

  //   let autocompleteOptions: DropdownMenuOption[] = [];

  //   const similarTopicsFound = topics.filter((topic) =>
  //     CompareCleanStrings(topic.name, input, "like")
  //   );

  //   autocompleteOptions = similarTopicsFound.map((topic) => ({
  //     name: topic.name,
  //     action: () => {
  //       onSelectExistingTopic(topic);
  //     },
  //   }));

  //   const exactTopicFound = topics.find((topic) =>
  //     CompareCleanStrings(topic.name, input)
  //   );

  //   if (!exactTopicFound) {
  //     autocompleteOptions.push({
  //       name: `Create '${input}'`,
  //       action: () => {
  //         onSelectCreateNewTopic(input);
  //       },
  //     });
  //   }

  //   setAddTopicAutocompleteOptions(autocompleteOptions);
  // };

  const options = topics.map((topic) => ({
    value: topic.id,
    label: topic.name,
    colour: topic.colour,
  }));

  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     switch (e.key) {
  //       case "Enter":
  //         handleEnterKeyDown(
  //           topics,
  //           addTopicInput,
  //           onSelectExistingTopic,
  //           onSelectCreateNewTopic
  //         );
  //         break;
  //       case "Escape":
  //         setAddTopicInput(undefined);
  //         break;
  //     }
  //   };

  //   document.addEventListener("keydown", handleKeyDown, true);

  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown, true);
  //   };
  // }, [addTopicInput, onSelectCreateNewTopic, onSelectExistingTopic, topics]);

  return (
    <div className="flex flex-row gap-2">
      <CreatableSelect
        isMulti
        options={options}
        placeholder="Add to journal"
        value={value}
        onChange={(selectedTopics) => {
          setValue([...selectedTopics]);

          onChange(
            selectedTopics.reduce((acc: Topic[], selectedTopic) => {
              const topic = topics.find(
                (topic) => topic.id === selectedTopic.value
              );

              if (topic) {
                acc.push(topic);
              }

              return acc;
            }, [])
          );
        }}
        onCreateOption={onCreateNewTopic}
        components={{
          DropdownIndicator: (props) => {
            return (
              <components.DropdownIndicator {...props}>
                <Plus weight="bold" />
              </components.DropdownIndicator>
            );
          },
          MultiValueRemove: (props) => {
            return (
              <components.MultiValueRemove {...props}>
                <X weight="bold" size={12} />
              </components.MultiValueRemove>
            );
          },
        }}
        closeMenuOnSelect={false}
        isClearable={false}
        classNames={{
          control: ({ isFocused }) => {
            return cn(
              "bg-white",
              "rounded-md",
              "hover:bg-orange-100",
              isFocused && "bg-orange-100"
            );
          },
          placeholder: () => {
            return cn("text-xs", "text-stone-500", "cursor-pointer");
          },
          multiValue: (props) => {
            return cn(
              "rounded-full",
              "text-xs",
              getTopicBackgroundColourFromTopicId(topics, props.data.value)
                .backgroundClass
            );
          },
          multiValueRemove: () => {
            return cn("rounded-full");
          },
          input: () => {
            return cn("text-xs", "text-black");
          },
          dropdownIndicator: () => {
            return cn(
              "text-stone-500",
              "hover:text-orange-500",
              "rounded-md",
              "p-1",
              "cursor-pointer"
            );
          },
          menuList: () =>
            cn(
              "bg-white",
              "border",
              "border-black",
              "rounded-md",
              "p-1",
              "shadow-lighter"
            ),
          option: () =>
            cn(
              "leading-none",
              "text-sm",
              "p-1",
              "hover:bg-orange-100",
              "hover:text-orange-500",
              "outline-none",
              "rounded-sm",
              "cursor-pointer"
            ),
          noOptionsMessage: () => {
            return cn("text-sm", "text-stone-500", "p-1");
          },
        }}
        styles={{
          control: (base) => ({
            ...base,
            boxShadow: undefined,
            backgroundColor: undefined,
            borderWidth: undefined,
            borderRadius: undefined,
            minHeight: undefined,
          }),
          placeholder: (base) => ({
            ...base,
            cursor: undefined,
            fontSize: undefined,
            color: undefined,
          }),
          valueContainer: (base) => ({
            ...base,
            padding: undefined,
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: undefined,
            borderRadius: undefined,
          }),
          multiValueRemove: (base) => ({
            ...base,
            borderRadius: undefined,
          }),
          input: (base) => ({
            ...base,
            font: undefined,
            paddingTop: undefined,
            paddingBottom: undefined,
            margin: undefined,
          }),
          indicatorSeparator: (base) => ({
            ...base,
            display: "none",
          }),
          dropdownIndicator: () => ({}),
          option: () => ({}),
          noOptionsMessage: (base) => ({
            ...base,
            padding: undefined,
            fontSize: undefined,
            color: undefined,
          }),
        }}
      />

      {/* {initialSlip.topics.map((topic) => {
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
      </DropdownMenu> */}
    </div>
  );
};
