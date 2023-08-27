import { AiOutlinePlus } from "react-icons/ai";

import styles from "./AddDiv.module.css";
import EditableText from "./EditableText";
import { useState } from "react";

interface AddDivProps {
  handleAdd: (text: string) => void;
  placeholder: string;
}

export default function AddDiv({ handleAdd, placeholder }: AddDivProps) {
  const [editing, setEditing] = useState(false);

  return (
    <div className={styles.addDiv}>
      <section className={styles.addContent}>
        <AiOutlinePlus
          onClick={() => {
            setEditing(true);
          }}
          className={styles.addIcon}
        />
        <EditableText
          editing={editing}
          setEditing={setEditing}
          onChange={(text) => {
            handleAdd(text);
          }}
          placeholder={placeholder}
          text=""
        />
      </section>
    </div>
  );
}
