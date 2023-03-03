import {
  Button,
  Container,
  Flex,
  Header,
  MediaQuery,
  Text,
  TextInput,
} from "@mantine/core";
import React from "react";
import { useStore } from "../../hooks/useStore";
import { useServices } from "../../hooks/useServices";

export interface HeaderProps {}
export const TopBar = () => {
  const query = useStore("query");
  const page = useStore("page");
  const { store } = useServices();

  return (
    <Header height={72}>
      <Container h={"100%"}>
        <Flex h={"100%"} direction="row" justify={"space-between"}>
          <Flex h={"100%"} direction="column" justify={"center"}>
            <Text fz="xl" tt="uppercase" lh={1}>
              Eleven
            </Text>
            <Text
              fz="xs"
              opacity={0.4}
              sx={(theme) => ({
                borderTop: "1px solid " + theme.black,
              })}
            >
              Astronaut Manager
            </Text>
          </Flex>
          <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
            <Flex h={"100%"} align={"center"}>
              <TextInput
                w={360}
                placeholder="Name, Job..."
                radius="xl"
                size="md"
                onChange={(ev) => {
                  const query = ev.target.value;
                  if (page.name !== "ListAstronaut" && !!query) {
                    store.set("page", { name: "ListAstronaut" });
                  }
                  store.set("query", query);
                }}
                value={query}
                rightSection={
                  query ? (
                    <Button
                      onClick={() => store.set("query", "")}
                      mr={10}
                      variant={"white"}
                      radius={50}
                    >
                      ×
                    </Button>
                  ) : null
                }
              />
            </Flex>
          </MediaQuery>
          <Flex h={"100%"} direction="column" justify={"center"}>
            <Button
              disabled={page.name === "CreateAstronaut"}
              onClick={() => store.set("page", { name: "CreateAstronaut" })}
            >
              ADD ASTRONAUT
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Header>
  );
};
