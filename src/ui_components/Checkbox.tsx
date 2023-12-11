import { Checkbox, Text } from "@create-figma-plugin/ui";
import { h, JSX } from "preact";

interface CheckboxProps {
  value: boolean;
  setValue: any;
  label: string;
}

export default function CheckboxElement({
  value,
  setValue,
  label,
}: CheckboxProps) {
  // const [value, setValue] = useState<boolean>(false);
  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    console.log(
      "event.currentTarget.checked :>> ",
      event.currentTarget.checked
    );
    const newValue = event.currentTarget.checked;
    setValue(newValue);
  }
  return (
    <Checkbox
      onChange={handleChange}
      value={value}
      onClick={(event: MouseEvent) => event.stopPropagation()}
      style={{ border: "none", cursor: "pointer" }}
    >
      <Text>{label}</Text>
    </Checkbox>
  );
}
