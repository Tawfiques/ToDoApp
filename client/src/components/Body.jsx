import {
  Box,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
const theme = createTheme({
  palette: {
    primary: {
      main: "#F6A89E",
    },
    secondary: {
      main: "#33322E",
      light: "#F5EBFF",
      contrastText: "#47008F",
    },
  },
});
export default function Test() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs></Grid>
        <Grid item mb={4} display={"flex"} justifyContent={"center"}>
          <Box
            bgcolor={"#F9F3E5"}
            color={"#33322E"}
            borderRadius={5}
            minHeight={"70vh"}
            m={"3rem 5rem"}
            sx={{
              borderTop: 2,
              borderRight: 13,
              borderLeft: 2,
              borderBottom: 13,
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              color="#33322E"
              margin={"2rem 10rem"}
            >
              Things To Do
            </Typography>
            <Divider color="#33322E" sx={{ borderBottomWidth: 2 }} />
            <List>
              <ListItem>
                <TextField
                  variant="standard"
                  color="primary"
                  fullWidth
                  placeholder="Buy Milk"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 50,
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton type="button">
                          <AddCircleOutlineIcon
                            fontSize="large"
                            color="primary"
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </ListItem>
              <ListItem
                secondaryAction={
                  <IconButton edge="end">
                    <EditIcon color="secondary"/>
                  </IconButton>
                }
              >
                <Checkbox variant="soft" color="primary" />
                <Typography fontWeight="bold">Buy Bread</Typography>
              </ListItem>
            </List>
          </Box>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </ThemeProvider>
  );
}
