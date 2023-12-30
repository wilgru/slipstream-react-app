type TopicPillProps = {
  size?: "medium";
  name: string;
};

enum TopicPillSize {
  "medium" = "p-1",
}

export const TopicPill = ({
  size = "medium",
  name,
}: TopicPillProps): JSX.Element => {
  const topicPillBaseStyle =
    "border border-stone-700 bg-stone-300 text-stone-700 text-xs";
  const topicPillSize = TopicPillSize[size];

  const topicPillStyles = [topicPillBaseStyle, topicPillSize].join(" ");

  return <div className={topicPillStyles}>{name}</div>;
};
