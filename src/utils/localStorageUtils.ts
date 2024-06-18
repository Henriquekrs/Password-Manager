import { DataPassword } from "../types/formTypes";

export const savePasswordData = (newData: DataPassword) => {
  const passwordsData = JSON.parse(localStorage.getItem("passwords") || "[]");
  const updatedData = [...passwordsData, newData];
  localStorage.setItem("passwords", JSON.stringify(updatedData));
};
