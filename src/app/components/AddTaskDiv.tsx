import List from "@/interface/list";
import { AiOutlinePlus } from "react-icons/ai";

import styles from "./AddTaskDiv.module.css";
import EditableText from "./EditableText";
import { useState } from "react";
import api from "@/api/api";

interface AddDivProps {
  handleAdd: (text: string) => void;
  placeholder: string;
}

export default function AddTaskDiv({ handleAdd, placeholder }: AddDivProps) {
  const [editing, setEditing] = useState(false);

  return (
    <div className={styles.addTaskDiv}>
      <section className={styles.addTaskContent}>
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
