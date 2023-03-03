import {
  Button,
  Flex,
  NumberInput,
  Paper,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import React from "react";
import { AstronautEntry } from "../../../interfaces/api.schema";
import { useServices } from "../../hooks/useServices";

export interface CreateAstronautProps {}

export const CreateAstronaut = () => {
  const { client, store } = useServices();
  const form = useForm<AstronautEntry>({
    initialValues: {
      firstName: "",
      lastName: "",
      exp: 0,
      job: "",
    },
  });

  const onSubmit = async (values: AstronautEntry) => {
    try {
      const { id } = await client.emit("createAstronaut", values);
      store.set("page", {
        name: "ViewAstronaut",
        id,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Flex gap="md" align="center" direction={"column"}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Flex gap={"sm"} direction={"column"}>
          <AstronautForm form={form} />
          <Flex gap={"sm"} align={"end"} justify={"end"}>
            <Button type="submit">CREATE ENTRY</Button>
            <Button
              variant={"white"}
              onClick={() => store.set("page", { name: "ListAstronaut" })}
            >
              CANCEL
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};

export const AstronautForm = ({
  form,
}: {
  form: UseFormReturnType<AstronautEntry>;
}) => {
  return (
    <Paper shadow="xs" mt={"lg"} radius={10}>
      <Flex>
        <Flex
          w={256}
          sx={(theme) => ({ background: theme.colors.indigo[4] })}
        ></Flex>
        <Flex p={"xl"} gap={"sm"} direction={"column"}>
          <Flex gap={"xs"}>
            <TextInput
              name="firstName"
              required
              minLength={2}
              {...form.getInputProps("firstName")}
              label="First name"
              placeholder={"Harry"}
            />
            <TextInput
              name="lastName"
              required
              minLength={2}
              {...form.getInputProps("lastName")}
              label="Last name"
              placeholder={"Potter"}
            />
          </Flex>
          <Flex gap={"xs"}>
            <NumberInput
              required
              min={0}
              max={40}
              {...form.getInputProps("exp")}
              label="Experience (years)"
              placeholder={"0"}
            />
          </Flex>
          <Flex gap={"xs"}>
            <Select
              required
              data={["Developer", "Designer", "Architect"]}
              {...form.getInputProps("job")}
              label="Actual position"
              placeholder={"Select job..."}
            />
          </Flex>
        </Flex>
      </Flex>
    </Paper>
  );
};
