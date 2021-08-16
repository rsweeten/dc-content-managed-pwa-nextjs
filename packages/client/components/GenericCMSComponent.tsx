import React, { PropsWithChildren } from "react";
import {
  withStyles,
  WithStyles,
  Theme,
  Typography,
  Paper,
} from "@material-ui/core";
import Section, { SectionVariant } from "./Section";
import clsx from "clsx";

const styles = (theme: Theme) => ({
  root: {
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.palette.grey.A400,
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
    color: theme.palette.getContrastText(theme.palette.grey.A400),
    pre: {
      display: "block",
      padding: "10px 30px",
      margin: "0",
      overflow: "scroll",
      background: "#000",
    }
  }
});

export type GenericComponentMeta = {
  _meta:{
    name:string;
    schema:string;
    deliveryId:string;
  }
};

interface Props extends PropsWithChildren<WithStyles<typeof styles>> {
  className?: string;
  style?: React.CSSProperties;
}

const GenericCMSComponent: React.SFC<Props> = (props) => {
  const { classes, className, ...other } = props;

  const context:any = other;

  console.log("Meta,", other )

  return (
    <Section
      title={context._meta.name}
      variant={SectionVariant.CONTAINED}
      {...other}
    >
      <Paper>
        <Typography align="center" color="error">
          No Rendering Template Found for this content
        </Typography>
        <div style={{ backgroundColor: "black", color: "white" }}>
          <pre>{JSON.stringify(other, null, 2)}</pre>
        </div>
      </Paper>
    </Section>
  );
};

export default withStyles(styles)(GenericCMSComponent);