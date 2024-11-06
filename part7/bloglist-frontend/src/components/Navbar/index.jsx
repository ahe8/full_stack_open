import { Link } from "react-router-dom";
import { Typography, Box, AppBar, Toolbar, Button, Stack } from "@mui/material";


const linkStyle = {
  textDecoration: "none",
  color: "white",
};

const Navbar = ({ user, handleLogout }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                border: 1,
                p: 1,
                backgroundColor: 'black',
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Blog App
            </Typography>
            <Stack direction="row" spacing={2}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/" style={linkStyle}>
                  Blogs
                </Link>
              </Typography>

              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/users" style={linkStyle}>
                  Users
                </Link>
              </Typography>
            </Stack>

            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, ml: "1em", color: "yellowgreen", }}
            >
              {user.name} logged in
            </Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
