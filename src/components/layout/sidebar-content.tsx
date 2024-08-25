import { Link, List, ListItem } from "@mui/joy";
import { useContext } from "react";
import { Link as ReactLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import { linksArray } from "../arrays/links-array";
import { Flex } from "../shared/flex";

type Props = {
  textColor?: string;
};

export const SidebarContent = ({ textColor }: Props) => {
  const { pathname } = useLocation();
  const { hasData, loadingData } = useContext(AuthContext);

  return (
    <Flex y sx={{ mt: 6, pl: 1 }}>
      {!loadingData && (
        <List sx={{ p: 0 }}>
          {linksArray.map((link, index) => {
            const selected = pathname.includes(link.path);
            const isDisabled = (link.path === "/dashboard" || link.path === "/overview") && !hasData;
            return (
              <ListItem key={index}>
                <Link
                  component={ReactLink}
                  color="neutral"
                  underline="none"
                  to={link.path}
                  startDecorator={link.icons && (selected ? link.icons?.iconSelected : link.icons?.icon)}
                  sx={{ color: textColor }}
                  disabled={isDisabled}
                >
                  {link.icons && link.title}
                </Link>
              </ListItem>
            );
          })}
        </List>
      )}
    </Flex>
  );
};
