import { useApi } from "../../hooks/useApi";
import {
  Anchor,
  Avatar,
  Button,
  Flex,
  Grid,
  Loader,
  Paper,
  Text,
} from "@mantine/core";
import React from "react";
import { useServices } from "../../hooks/useServices";
import { notifications } from "@mantine/notifications";

export const ViewAstronaut = (props: { astronautId: string }) => {
  const { data, error } = useApi("findAstronaut", { id: props.astronautId });
  const { store, client } = useServices();

  if (data && data.content[0]) {
    const element = data.content[0];
    return (
      <Flex direction="column" p={"sm"} gap={"sm"}>
        <Anchor onClick={() => store.set("page", { name: "ListAstronaut" })}>
          Back
        </Anchor>
        <Flex direction="column" sx={{ gap: 1 }}>
          <Paper
            h={64}
            sx={(t) => ({ background: t.colors.cyan[3] })}
            shadow={"sm"}
            radius={0}
            p={"md"}
          ></Paper>
          <Flex>
            <Paper shadow={"sm"} radius={0} p={"md"}>
              <Avatar color="cyan" radius="xl">
                {element.firstName.toUpperCase()[0]}
                {element.lastName.toUpperCase()[0]}
                {element.lastName.toUpperCase()[1]}
              </Avatar>
            </Paper>
            <Paper sx={{ flex: 1 }} radius={0} shadow={"sm"} p={"md"}>
              <Grid>
                <Grid.Col span={3}>
                  <Flex direction={"column"}>
                    <Text c="dimmed" fz={"sm"}>
                      First name
                    </Text>
                    <Text>{element.firstName}</Text>
                  </Flex>
                </Grid.Col>
                <Grid.Col span={3}>
                  {" "}
                  <Flex direction={"column"}>
                    <Text c="dimmed" fz={"sm"}>
                      Last name
                    </Text>
                    <Text>{element.lastName}</Text>
                  </Flex>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Flex direction={"column"}>
                    <Text c="dimmed" fz={"sm"}>
                      Activity
                    </Text>
                    <Text>{element.job}</Text>
                  </Flex>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Flex direction={"column"}>
                    <Text c="dimmed" fz={"sm"}>
                      Experience
                    </Text>
                    <Text>{element.exp}y</Text>
                  </Flex>
                </Grid.Col>
              </Grid>
            </Paper>
          </Flex>
          <Paper
            h={128}
            sx={(t) => ({ background: t.colors.gray[2] })}
            shadow={"sm"}
            radius={0}
            p={"md"}
          ></Paper>
          <Paper radius={0} shadow={"xs"} p={"md"}>
            <Flex align={"flex-end"} justify={"end"} gap={"md"}>
              <Button
                onClick={() =>
                  store.set("page", {
                    name: "EditAstronaut",
                    id: props.astronautId,
                  })
                }
              >
                EDIT PROFILE
              </Button>
              <Button
                variant={"white"}
                onClick={async () => {
                  await client.emit("removeAstronaut", { id: element.id });
                  store.set("page", { name: "ListAstronaut" });
                  notifications.show({
                    title: "Deleted.",
                    message: `Astronaut ${element.firstName} has been delete. Long life to ${element.firstName} !`,
                  });
                }}
              >
                DELETE
              </Button>
            </Flex>
          </Paper>
        </Flex>
      </Flex>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <Loader />;
};
