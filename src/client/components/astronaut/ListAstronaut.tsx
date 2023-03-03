import { useApi } from "../../hooks/useApi";
import React from "react";
import { Avatar, Button, Flex, Menu, Paper, Text } from "@mantine/core";
import { useServices } from "../../hooks/useServices";
import { useStore } from "../../hooks/useStore";
import Label = Menu.Label;

export const ListAstronaut = () => {
  const { client, store } = useServices();
  const query = useStore("query");
  const { data, error, mutate } = useApi("findAstronaut", { query });

  if (data) {
    if (!data.content.length) {
      return (
        <Flex direction="column" align="center" justify="center" h={256}>
          <Text fz="xl">Empty !</Text>
          <Text fz="xs" opacity={0.4}>
            {query
              ? `No astronaut found for '${query}'.`
              : "Seems like there is no astronaut for now."}
          </Text>
        </Flex>
      );
    }

    const rows = data.content.map((element) => (
      <Paper shadow={"md"} key={element.id}>
        <Flex gap={"md"} p={"sm"}>
          <Flex>
            <Avatar color="cyan" radius="md">
              {element.firstName.toUpperCase()[0]}
              {element.lastName.toUpperCase()[0]}
              {element.lastName.toUpperCase()[1]}
            </Avatar>
          </Flex>
          <Flex sx={{ flex: 1 }}>
            <Flex
              w={150}
              justify={"center"}
              align={"center"}
              direction={"column"}
            >
              <Text fw={700} tt="uppercase">
                {element.job}
              </Text>
              <Text lh={1} fz={"xs"} c="blue">
                {element.exp === 0
                  ? "NEW"
                  : `${element.exp} year${element.exp > 1 ? "s" : ""}`}{" "}
              </Text>
            </Flex>
            <Flex justify={"center"} direction={"column"}>
              <Text lh={1.4} tt="capitalize">
                {element.firstName} {element.lastName}
              </Text>
              <Text c="dimmed" td={"italic"} lh={1} fz={"xs"}>
                Since {new Date(element.createdAt).toLocaleDateString()}.
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Button
              variant={"white"}
              onClick={() =>
                store.set("page", { name: "ViewAstronaut", id: element.id })
              }
            >
              VIEW PROFILE
            </Button>
          </Flex>
        </Flex>
      </Paper>
    ));

    return (
      <Flex gap={"sm"} direction={"column"} p={"md"}>
        {rows}
      </Flex>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <div />;
  //return <Loader />;
};
