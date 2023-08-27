import styles from "./ListComponent.module.css";
import List from "@/interface/list";
import { useState } from "react";
import api from "@/api/api";

import { AiFillDelete, AiOutlinePlus, AiTwotoneEdit } from "react-icons/ai";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import Task from "@/interface/task";
import TaskComponent from "./TaskComponent";
import AddTaskDiv from "./AddDiv";
import EditableText from "./EditableText";
import Modal from "./Modal";

interface ListComponentProps {
  list: List;
  onEdit: () => void;
}

export default function ListComponent({ list, onEdit }: ListComponentProps) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleEditList = async (text: string) => {
    if (!text) return;
    setLoading(true);
    await api
      .put(`/list/${list._id}`, { list: text })
      .then((res) => {
        setLoading(false);
        onEdit();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteList = async () => {
    setLoading(true);
    await api
      .delete(`/list/${list._id}`)
      .then((res) => {
        setModal(false);
        setLoading(false);
        onEdit();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddTask = async (text: string) => {
    await api
      .post(`/list/${list._id}/task `, { task: text })
      .then((res) => {
        onEdit();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.list}>
      <div className={styles.listOuterDiv}>
        <div className={styles.listInnerDiv}>
          <section className={styles.header} onClick={handleClick}>
            <div className={styles.listname}>
              <EditableText
                onChange={(text) => {
                  handleEditList(text);
                }}
                text={list.list}
                editing={editing}
                setEditing={setEditing}
              />
              <div className={styles.underlineDiv} />
            </div>
            {open ? (
              <BiSolidUpArrow className={styles.openTasksIcon} />
            ) : (
              <BiSolidDownArrow className={styles.openTasksIcon} />
            )}
          </section>
          {open && (
            <div className={styles.tasksDiv}>
              {list.tasks.map((task) => {
                return (
                  <TaskComponent
                    task={task}
                    list={list}
                    onEdit={() => {
                      onEdit();
                    }}
                  />
                );
              })}
              <AddTaskDiv
                handleAdd={handleAddTask}
                placeholder="Adicione uma tarefa"
              />
            </div>
          )}
        </div>

        <AiTwotoneEdit
          className={styles.icon}
          onClick={() => {
            setEditing(true);
          }}
        />
        <AiFillDelete
          className={styles.icon}
          onClick={() => {
            setModal(true);
          }}
        />
      </div>
      <Modal
        aviso="Tem certeza que deseja excluir esta tarefa?"
        onClickBotao={handleDeleteList}
        setConfirmacaoVisivel={setModal}
        visivel={modal}
        loadingBotao={loading}
      />
    </div>
  );
}
