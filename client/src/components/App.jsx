import Divider from "@mui/material/Divider";
import Header from "./Header";
import AppInput from "./AppInput";
import ToDoItems from "./ToDoItems";
import { useState } from "react";
export default function App() {
  const [item, setitem] = useState({ title: "", done: false });
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setitem((prev) => ({ ...prev, [name]: value }));
  }

  const [items, setitems] = useState([]);

  function AddItem() {
    if(item.title!=""){
      setitems((prev) => [...prev, item]);
      setitem({ title: "", done: false });
    }

  }

  function DeleteItem(id) {
    setitems((prev) => {
      return prev.filter((value, index) => {
        return index !== id;
      });
    });
  }

  function ItemChecked(id) {
    setitems(
      items.map((item, index) =>
        index === id ? { ...item, done: !item.done } : item
      )
    );

  }

  return (
    <>
      <Header />
      <div className="app__container">
        <div></div>
        <div className="app--box">
          <div className="app--box__title">Things to do</div>
          <Divider color="#33322E" sx={{ borderBottomWidth: 2, mb: 2 }} />
          <AppInput
            value={item.title}
            handleChange={handleChange}
            AddItem={AddItem}
          />
          {items &&
            items.map((item, index) => (
              <ToDoItems
                key={index}
                id={index}
                item={item}
                DeleteItem={DeleteItem}
                ItemChecked={ItemChecked}
              />
            ))}
        </div>
        <div></div>
      </div>
    </>
  );
}
