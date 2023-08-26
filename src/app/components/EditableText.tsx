import { useState } from "react";
import styles from "./EditableText.module.css";

interface EditableTextProps {
  text: string;
  onChange: (text: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  editing: boolean;
  setEditing: (editing: boolean) => void;
}

export default function EditableText({
  text,
  onChange,
  placeholder,
  editing,
  setEditing,
}: EditableTextProps) {
  const [value, setValue] = useState(text);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.editableTextDiv}>
      {editing ? (
        <input
          className={styles.input}
          value={value}
          onChange={handleChange}
          autoFocus
          onBlur={() => {
            setEditing(false);
            onChange(value);
          }}
        />
      ) : (
        <div
          className={styles.text}
          onClick={() => {
            setEditing(true);
          }}
        >
          {text || placeholder}
        </div>
      )}
    </div>
  );
}
