import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
export default function ToDoItems(props) {
  return (
    <div className="app--box__items">
      <div className="app--box__item ">
        <input className="app--box__item--checkbox" type="checkbox" checked={props.item.done} onChange={()=>props.ItemChecked(props.id)} />
        {props.item.done ? <s >{props.item.title}</s> : props.item.title}
        <IconButton
          className="app--box__item--delete"
          onClick={() => props.DeleteItem(props.id)}
          sx={{ml:"auto"}}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}
