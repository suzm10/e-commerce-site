import React, { useContext, useEffect } from "react";
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Link,
  Container,
  Box,
  Typography,
  CircularProgress,
  Badge,
} from "@material-ui/core";
import { theme, useStyles } from "../utils/styles";
import Head from "next/head";
import NextLink from "next/link";
import { Store } from "./Store";
import getCommerce from "../utils/commerce";
import {
  CART_RETRIEVE_REQUEST,
  CART_RETRIEVE_SUCCESS,
} from "../utils/constants";

export default function Layout({
  children,
  commercePublicKey,
  title = "StreetKicks",
}) {
  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  useEffect(() => {
    const fetchCart = async () => {
      const commerce = getCommerce(commercePublicKey);
      dispatch({ type: CART_RETRIEVE_REQUEST });
      const cartData = await commerce.cart.retrieve();
      dispatch({ type: CART_RETRIEVE_SUCCESS, payload: cartData });
    };
    fetchCart();
  }, []);
  return (
    <React.Fragment>
      <Head>
        <meta charset="utf-8" />
        <title>{`${title} - StreetKicks`}</title>
        <link rel="icon" href="streetkicks.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="static"
          color="default"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <NextLink href="/">
              <Link
                variant="h6"
                color="inherit"
                noWrap
                href="/"
                className={classes.toolbarTitle}
              >
                StreetKicks
              </Link>
            </NextLink>
            <nav>
              <NextLink href="/cart">
                <Link
                  variant="button"
                  color="textPrimary"
                  href="/cart"
                  className={classes.link}
                >
                  {cart.loading ? (
                    <CircularProgress />
                  ) : cart.data.total_items > 0 ? (
                    <Badge badgeContent={cart.data.total_items} color="primary">
                      Cart
                    </Badge>
                  ) : (
                    "Cart"
                  )}
                </Link>
              </NextLink>
            </nav>
          </Toolbar>
        </AppBar>
        <Container component="main" className={classes.main}>
          {children}
        </Container>
        <Container maxWidth="md" component="footer">
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
              {"© "}
              StreetKicks 2021 | Report bugs and request features:
              support@streetkickswebapp.com
              {/* {" "}
              <a href="https://github.com/suzm10">
                <u>Suzan</u>
              </a> */}
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
