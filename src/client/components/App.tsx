import { Container, MantineProvider } from "@mantine/core";
import React from "react";
import { ListAstronaut } from "./astronaut/ListAstronaut";
import { ViewAstronaut } from "./astronaut/ViewAstronaut";
import { CreateAstronaut } from "./astronaut/CreateAstronaut";
import { TopBar } from "./layout/TopBar";
import { Notifications } from "@mantine/notifications";
import { EditAstronaut } from "./astronaut/EditAstronaut";
import { useStore } from "../hooks/useStore";
import { createServices, Services } from "../hooks/useServices";

const Router = () => {
  const page = useStore("page");

  return (
    <>
      {page.name === "CreateAstronaut" && <CreateAstronaut />}
      {page.name === "ListAstronaut" && <ListAstronaut />}
      {page.name === "EditAstronaut" && <EditAstronaut astronautId={page.id} />}
      {page.name === "ViewAstronaut" && <ViewAstronaut astronautId={page.id} />}
    </>
  );
};

export const App = () => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        globalStyles: (theme) => ({
          body: { background: theme.colors.gray[0] },
        }),
      }}
    >
      <Notifications />
      <Services.Provider value={createServices()}>
        <TopBar />
        <Container>
          <Router />
        </Container>
      </Services.Provider>
    </MantineProvider>
  );
};
