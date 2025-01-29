import { icons } from "src/lib/icon/icons.constant";
import { cn } from "src/utils/cn";
import { Icon } from "../Icon/Icon";
import type { Colour } from "src/lib/colour/Colour.type";

type IconPickerProps = {
  selectedIconName: string;
  colour: Colour;
  onSelectIcon: (iconName: string) => void;
};

export default function IconPicker({
  selectedIconName,
  colour,
  onSelectIcon,
}: IconPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {icons.map((icon) => (
        <button
          key={icon.name}
          onClick={() => onSelectIcon(icon.name)}
          className={cn(
            "flex justify-center items-center h-8 w-8 p-1 rounded-full",
            selectedIconName === icon.name && colour.backgroundPill
          )}
        >
          <Icon
            iconName={icon.name}
            weight={selectedIconName === icon.name ? "fill" : "regular"}
            className={cn(colour.textPill)}
          />
        </button>
      ))}
    </div>
  );
}
