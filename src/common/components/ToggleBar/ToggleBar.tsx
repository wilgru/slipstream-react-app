import { Icon } from "src/common/components/Icon/Icon";

type ToggleBarProps = {
  children?: string | JSX.Element;
  className?: string;
  iconSize?: "small" | "medium" | "large";
  iconToggledOnColour?: string;
  colour?: { border: string; background: string; text: string };
  width?: "fit" | "full";
  size?: "small" | "medium" | "large";
  options: {
    child?: JSX.Element;
    className?: string;
    icon?: string;
    isToggled: boolean;
    disabled?: boolean;
    onClick?: () => void;
  }[];
};

enum ToggleSize {
  "small" = "px-2 py-1 text-xs font-normal",
  "medium" = "px-3 py-1 text-sm font-medium",
  "large" = "px-6 py-2 text-sm",
}

enum ToggleMinimumWidth {
  "small" = "1.5rem",
  "medium" = "2rem",
  "large" = "3rem",
}

enum ToggleBarWidth {
  "full" = "w-full text-center",
  "fit" = "",
}

export const ToggleBar = ({
  className,
  colour = { border: "stone-700", background: "stone-100", text: "stone-100" },
  width = "fit",
  size = "medium",
  options,
}: ToggleBarProps) => {
  const toggleBarBaseStyle = "border border-collapse border-stone-700 p-0";
  const toggleBarWidth = ToggleBarWidth[width];
  const toggleBarToggledOnColour = `bg-${colour.border} text-stone-100`;
  const toggleBarToggledOffColour = `bg-${colour.background} text-stone-700`;

  const toggleBarStyles = [toggleBarBaseStyle, toggleBarWidth].join(" ");

  const toggleSize = ToggleSize[size];
  const toggleMinimumWidth = ToggleMinimumWidth[size];

  return (
    <table className={`${className} ${toggleBarStyles}`}>
      <tr>
        {options.map((option) => (
          <td className="p-0 border border-stone-700">
            <button
              type="button"
              className={`
                flex flex-row justify-center items-center gap-2 font-medium text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 hover:bg-stone-800 hover:border-stone-800 hover:text-stone-100
                ${option.className} 
                ${
                  option.isToggled
                    ? toggleBarToggledOnColour
                    : toggleBarToggledOffColour
                } 
                ${toggleSize}`}
              style={{ minWidth: toggleMinimumWidth }}
              disabled={option.disabled}
              onClick={option.onClick}
            >
              {option.icon && (
                <Icon
                  iconName={option.icon}
                  size={"small"}
                  colour={option.isToggled ? colour.background : colour.border}
                />
              )}

              {option.child}
            </button>
          </td>
        ))}
      </tr>
    </table>
  );
};
