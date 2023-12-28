type TopicPillProps = {
  size?: "medium";
  name: string;
};

enum TopicPillSize {
  "medium" = "p-1",
  "large" = "p-2",
}

export const TopicPill = ({
  size = "medium",
  name,
}: TopicPillProps): JSX.Element => {
  const topicPillStyles = `${TopicPillSize[size]} border border-stone-700 text-stone-700 text-xs`;

  return <div className={topicPillStyles}>{name}</div>;
};
