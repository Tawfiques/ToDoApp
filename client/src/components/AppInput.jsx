import AddTaskIcon from "@mui/icons-material/AddTask";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
export default function AppInput(props) {
  return (
    <div className="app--box__input">
      <TextField
        value={props.value}
        onChange={props.handleChange}
        name="title"
        variant="standard"
        color="warning"
        className="app--box__input__box"
        sx={{ pl:"10px", pr: "10px" }}
        placeholder="Buy Milk"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={props.AddItem} type="button" sx={{ pt: 0, pb: 2 }}>
                <AddTaskIcon fontSize="large" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
