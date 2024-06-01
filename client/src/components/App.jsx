import Divider from "@mui/material/Divider";
import Header from "./Header";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTaskIcon from "@mui/icons-material/AddTask";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
export default function App() {
  return (
    <>
      <Header />
      <div className="app__container">
        <div></div>
        <div className="app--box">
          <div className="app--box__title">Things to do</div>
          <Divider
            color="#33322E"
            sx={{ borderBottomWidth: 2, mt: 2, mb: 2 }}
          />
          <div className="app--box__input">
            <TextField
              variant="standard"
              color="warning"
              className="app--box__input__box"
              sx={{ p: 0 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="button" sx={{ pt:0,pb:2}}>
                    <AddTaskIcon fontSize="large" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="app--box__items">
            <div className="app--box__item">
              <input className="app--box__item--checkbox" type="checkbox" />
              Buy Milk <DeleteIcon className="app--box__item--delete" />
            </div>
            <div className="app--box__item">
              <input className="app--box__item--checkbox" type="checkbox" />
              Clean Pc <DeleteIcon className="app--box__item--delete" />
            </div>
            <div className="app--box__item">
              <input className="app--box__item--checkbox" type="checkbox" />
              Clean Pc <DeleteIcon className="app--box__item--delete" />
            </div>
            <div className="app--box__item">
              <input className="app--box__item--checkbox" type="checkbox" />
              Clean Pc <DeleteIcon className="app--box__item--delete" />
            </div>
            <div className="app--box__item">
              <input className="app--box__item--checkbox" type="checkbox" />
              Clean Pc <DeleteIcon className="app--box__item--delete" />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
