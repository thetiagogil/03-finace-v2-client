import { SxProps } from "@mui/joy/styles/types";
import { ReactNode } from "react";
import { MAIN_WIDTH } from "../../utils/constants";
import { Navbar } from "../navigation/navbar";
import { SidebarDesktop } from "../navigation/sidebar-desktop";
import { Flex } from "../shared/flex";

type Props = {
  children?: ReactNode;
  sx?: SxProps;
  hasTabs?: boolean;
};

export const HomePageContainer = ({ children }: Props) => {
  return (
    <Flex y xc yc sx={{ height: "80vh" }}>
      {children}
    </Flex>
  );
};

export const FormPageContainer = ({ children }: Props) => {
  return (
    <Flex y xc sx={{ mt: 4 }}>
      {children}
    </Flex>
  );
};

export const AuthPageContainer = ({ children, hasTabs }: Props) => {
  return (
    <Flex x xc sx={{ p: { xs: 0, lg: 2 } }}>
      <SidebarDesktop />
      <Flex y sx={{ width: { xs: "100%", lg: MAIN_WIDTH } }}>
        <Navbar />
        <Flex y sx={{ bgcolor: "neutral.100", p: hasTabs ? 0 : 1, height: "100%" }}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};
