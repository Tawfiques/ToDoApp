import Divider from "@mui/material/Divider";
import Header from "./Header";
import AppInput from "./AppInput";
import ToDoItems from "./ToDoItems";
import { useEffect, useState } from "react";
import { BASE_URL, addItemData, checkItem, deleteItemData, getItems, getUserData } from "../api";

export default function LoggedUser() {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const response = await getUserData();
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await getItems();
      setitems(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const [item, setitem] = useState({ title: "", done: false });
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setitem((prev) => ({ ...prev, [name]: value }));
  }

  const [items, setitems] = useState([]);

  async function AddItem() {
    if (item.title.trim() != "") {
      await addItemData(item);
      fetchData();
      setitem({ title: "", done: false });
    }
  }
  async function DeleteItem(id) {
      const item = items.find((item,index) => index=== id);
      await deleteItemData(item._id);
      fetchData();
  }

  async function ItemChecked(id) {
    const item = items.find((item,index) => index=== id);
    await checkItem(item._id);
    fetchData();
  }

  function GoogleLogout() {
    window.open(`${BASE_URL}/auth/logout`, "_self");
  }

  return (
    <>
      <Header
        GoogleLogout={GoogleLogout}
        name={user.name}
        picture={user.picture}
        isLogged={true}
      />
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
      <div className="footer">©{new Date().getFullYear()}</div>
    </>
  );
}
