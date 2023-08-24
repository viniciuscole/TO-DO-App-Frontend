import styles from "./ListComponent.module.css";
import List from "@/interface/list";
import { useState } from "react";

import { AiFillDelete, AiOutlinePlus, AiTwotoneEdit } from "react-icons/ai";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

interface ListComponentProps {
  list: List;
  last?: boolean;
}

export default function ListComponent({
  list,
  last = true,
}: ListComponentProps) {
  const [open, setOpen] = useState(false);
  console.log(list);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className={styles.listOuterDiv}>
        <AiOutlinePlus className={last ? styles.icon : styles.hidden} />
        <div className={styles.listInnerDiv} onClick={handleClick}>
          <div className={styles.listname}>
            {list.list}
            <div className={styles.underlineDiv} />
          </div>
          {open ? (
            <BiSolidUpArrow
              className={`${styles.icon} ${styles.openTasksIcon}`}
            />
          ) : (
            <BiSolidDownArrow
              className={`${styles.icon} ${styles.openTasksIcon}`}
            />
          )}
        </div>
        <AiTwotoneEdit className={styles.icon} />
        <AiFillDelete className={styles.icon} />
      </div>
      {open && (
        <div className={styles.tasksDiv}>
          {list.tasks.map((task) => {
            return (
              <div className={styles.taskDiv}>
                <section>
                  <div className={styles.checkbox} />
                  <div className={styles.taskName}>{task.task}</div>
                  <p> - criado em {task.date.toString()}</p>
                </section>
                <section>
                  <AiTwotoneEdit className={styles.iconTask} />
                  <AiFillDelete className={styles.iconTask} />
                </section>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
