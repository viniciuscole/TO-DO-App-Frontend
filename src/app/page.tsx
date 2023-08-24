"use client";

import api from "@/api/api";
import { useEffect } from "react";
import { useState } from "react";
import List from "@/interface/list";
import ListComponent from "./components/ListComponent";

export default function Home() {
  const [data, setData] = useState<List[]>([]);
  useEffect(() => {
    api.get("/").then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <main>
      {data.map((list, index) => {
        return <ListComponent list={list} last={index === data.length - 1} />;
      })}
    </main>
  );
}
