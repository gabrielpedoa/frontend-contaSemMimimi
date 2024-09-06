import AssessmentIcon from "@mui/icons-material/Assessment";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { SideBarContainer } from "./styles";

type Anchor = "left";

export default function SideBar() {
  const [state, setState] = React.useState({
    left: false,
  });

  const topItems = ["Entradas", "Despesas"];
  const iconTopItems = [<AttachMoneyOutlinedIcon />, <MoneyOffIcon />];
  const bottomItems = ["Usuários", "Relatórios", "Objetivos"];
  const iconBottonItems = [
    <GroupAddOutlinedIcon />,
    <AssessmentIcon />,
    <ChecklistRtlIcon />,
  ];

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {topItems.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{iconTopItems[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {bottomItems.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{iconBottonItems[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <SideBarContainer>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            sx={{ color: "#fff", textDecoration: "none", height: "4em" }}
          >
            menu
          </Button>
          <Drawer
            anchor={anchor}
            open={state["left"]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </SideBarContainer>
  );
}
