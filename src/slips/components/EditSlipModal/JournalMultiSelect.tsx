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

type JournalMultiSelectProps = {
  initialSlip: Slip;
  onChange: (topics: Topic[]) => void;
};

type Option = {
  label: string;
  value: string;
};

const getCustomisationColourFromTopicId = (
  topics: Topic[],
  topicId: string
): Colour => {
  const topic = topics.find((topic) => topic.id === topicId);

  const customisationColour = customisationColours.find(
    (colour) => colour.name === topic?.colour
  );

  return (
    customisationColour ?? {
      name: "grey",
      textClass: "text-gray-400",
      backgroundClass: "bg-gray-400",
    }
  );
};

export const JournalMultiSelect = ({
  initialSlip,
  onChange,
}: JournalMultiSelectProps) => {
  const { topics } = useGetTopics();
  const { createTopic } = useCreateTopic();

  const [value, setValue] = useState<Option[]>(
    initialSlip.topics.map((topic) => ({
      value: topic.id,
      label: topic.name,
    }))
  );

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

  const options = topics.map((topic) => ({
    value: topic.id,
    label: topic.name,
    colour: topic.colour,
  }));

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
              getCustomisationColourFromTopicId(topics, props.data.value)
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
    </div>
  );
};
