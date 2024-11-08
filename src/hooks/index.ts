import { Data } from "@/types";
import { RESTRICTIONS } from "@/utils/constants";
import { useEffect, useState } from "react";


export const usePersistentData = (defaultValue: Data, key: string) => {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    return data !== null
      ? JSON.parse(data)
      : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export const useToggleReply = () => {
  const [toggleReply, setToggleReply] = useState(false);
  const setReply = () => setToggleReply(!toggleReply); 

  return {toggleReply, setReply};
};

export const useToggleEdit = () => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const setEdit = () => setToggleEdit(!toggleEdit);

  return {toggleEdit, setEdit};
};

export const useToggleDelete = () => {
  const [toggleDelete, setToggleDelete] = useState(false);
  const setDelete = () => setToggleDelete(!toggleDelete);

  return {toggleDelete, setDelete};
};

export const useTruncate = () => {
  const [input, setInput] = useState("");

  const setValue = (value: string) => {
    if (value.length > RESTRICTIONS.COMMENT_LIMIT) {
      setInput(value.slice(0, RESTRICTIONS.COMMENT_LIMIT));
    } else {
      setInput(value);
    }
  };

  return {input, setValue};
};