import { Grid } from "antd";
const { useBreakpoint } = Grid;

const useMobile = () => {
  const screen = useBreakpoint();
  const mobile =
    !screen.xxl &&
    !screen.xl &&
    !screen.sm &&
    !screen.md &&
    !screen.lg &&
    screen.xs;
  return mobile;
};

export default useMobile;
