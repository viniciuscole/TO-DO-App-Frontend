"use client";

import styles from "./Home.module.css";
import api from "@/api/api";
import { useEffect } from "react";
import { useState } from "react";
import List from "@/interface/list";
import ListComponent from "./components/ListComponent";
import AddTaskDiv from "./components/AddDiv";

export default function Home() {
  const [data, setData] = useState<List[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const getLists = async () => {
    api.get("/").then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getLists();
  }, []);

  const handleAddList = async (text: string) => {
    if (!text) return;
    await api
      .post("/list", { list: text })
      .then((res) => {
        getLists();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className={styles.homePage}>
      <h1>
        <span>📝</span> To Do List
      </h1>
      <section className={styles.content}>
        {data.map((list, index) => {
          return (
            <ListComponent
              list={list}
              onEdit={() => {
                getLists();
              }}
            />
          );
        })}
        <AddTaskDiv
          placeholder="Adicione uma lista"
          handleAdd={handleAddList}
        />
      </section>
    </main>
  );
}
