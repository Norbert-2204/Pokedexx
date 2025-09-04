import { Button as MuiButton } from "@mui/material";

const Button = ({ children, sx, ...rest }) => {
  return (
    <MuiButton sx={{ ...sx }} {...rest}>
      {children}
    </MuiButton>
  );
};
export default Button;
