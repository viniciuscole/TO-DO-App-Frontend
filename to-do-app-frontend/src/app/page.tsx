"use client";

import api from "@/api/api";
import { useEffect } from "react";

export default function Home({ data }: { data: any }) {
  useEffect(() => {
    api.get("/").then((res) => {
      console.log(res.data);
    });
  }, []);

  return <main></main>;
}

export async function getServerSideProps() {
  const data = await api
    .get("/")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: {
      data,
    },
  };
}
