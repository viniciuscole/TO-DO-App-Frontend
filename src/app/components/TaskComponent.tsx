import api from "@/api/api";
import styles from "./TaskComponent.module.css";
import List from "@/interface/list";
import Task from "@/interface/task";

import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { useState } from "react";
import Modal from "./Modal";
import EditableText from "./EditableText";

interface TaskComponentProps {
  task: Task;
  list: List;
  onEdit: () => void;
}

export default function TaskComponent({
  task,
  list,
  onEdit,
}: TaskComponentProps) {
  const [taskState, setTaskState] = useState<Task>(task);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleCheckTask = async () => {
    await api
      .put(`/task/${list._id}/${task._id}/toggle`)
      .then((res) => {
        onEdit();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteTask = async () => {
    setLoading(true);
    await api
      .delete(`/task/${list._id}/${task._id}`)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setModal(false);
        onEdit();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditTask = async (text: string) => {
    if (!text) return;
    await api
      .put(`/task/${list._id}/${task._id}`, { task: text })
      .then((res) => {
        setTaskState({ ...taskState, task: text });
        onEdit();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.taskDiv}>
      <section
        className={styles.taskContent}
        style={{
          textDecoration: task.isCompleted ? "line-through" : "none",
        }}
      >
        <div
          className={styles.checkbox}
          style={{
            backgroundColor: task.isCompleted ? "#2ecc71" : "#ecf0f1",
            borderColor: task.isCompleted ? "#2ecc71" : "#ecf0f1",
          }}
          onClick={() => {
            handleCheckTask();
          }}
        />
        <EditableText
          onChange={(text) => {
            handleEditTask(text);
          }}
          text={task.task}
          editing={editing}
          setEditing={setEditing}
        />
      </section>
      <section className={styles.icons}>
        <AiTwotoneEdit
          className={styles.iconTask}
          onClick={() => {
            setEditing(true); // Ativar modo de edição ao clicar no ícone de edição
          }}
        />
        <AiFillDelete
          className={styles.iconTask}
          onClick={() => {
            setModal(true);
          }}
        />
      </section>
      <Modal
        aviso="Tem certeza que deseja excluir esta tarefa?"
        onClickBotao={handleDeleteTask}
        setConfirmacaoVisivel={setModal}
        visivel={modal}
        loadingBotao={loading}
      />
    </div>
  );
}
