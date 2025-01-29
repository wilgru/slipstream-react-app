import { Plus, X } from "@phosphor-icons/react";
import { useCallback, useState } from "react";
import { components } from "react-select";
import CreatableSelect from "react-select/creatable";
import { colours } from "src/lib/colour/colours.constant";
import { useCreateJournal } from "src/lib/journal/hooks/useCreateJournal";
import { useGetJournals } from "src/lib/journal/hooks/useGetJournals";
import { cn } from "src/lib/utils/cn";
import type { Colour } from "src/lib/colour/Colour.type";
import type { Journal } from "src/lib/journal/types/Journal.type";
import type { Slip } from "src/lib/slip/types/Slip.type";

type JournalMultiSelectProps = {
  initialSlip: Slip;
  onChange: (journals: Journal[]) => void;
};

type Option = {
  label: string;
  value: string;
};

const getColourFromJournal = (
  journals: Journal[],
  journalId: string
): Colour => {
  const journal = journals.find((journal) => journal.id === journalId);

  return journal ? journal.colour : colours.orange;
};

export const JournalMultiSelect = ({
  initialSlip,
  onChange,
}: JournalMultiSelectProps) => {
  const { journals } = useGetJournals();
  const { createJournal } = useCreateJournal();

  const [value, setValue] = useState<Option[]>(
    initialSlip.journals.map((journal) => ({
      value: journal.id,
      label: journal.name,
    }))
  );

  const onCreateNewJournal = useCallback(
    async (journalToCreate: string) => {
      const newJournal = await createJournal(journalToCreate);

      setValue((currentValue) => [
        ...currentValue,
        { value: newJournal.id, label: newJournal.name },
      ]);

      onChange([...initialSlip.journals, newJournal]);
    },
    [createJournal, initialSlip.journals, onChange]
  );

  const options = journals.map((journal) => ({
    value: journal.id,
    label: journal.name,
    colour: journal.colour,
  }));

  return (
    <div className="flex flex-row gap-2">
      <CreatableSelect
        isMulti
        options={options}
        placeholder="Add journal"
        value={value}
        onChange={(selectedJournals) => {
          setValue([...selectedJournals]);

          onChange(
            selectedJournals.reduce((acc: Journal[], selectedJournal) => {
              const journal = journals.find(
                (journal) => journal.id === selectedJournal.value
              );

              if (journal) {
                acc.push(journal);
              }

              return acc;
            }, [])
          );
        }}
        onCreateOption={onCreateNewJournal}
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
            const { backgroundPill, text } = getColourFromJournal(
              journals,
              props.data.value
            );
            return cn(
              "rounded-full",
              "text-xs",
              "text-stone-700",
              backgroundPill,
              text // TODO: This only styles the 'X' for some reason
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
            color: undefined,
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
