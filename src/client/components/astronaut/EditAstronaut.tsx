import { Button, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useApi } from "../../hooks/useApi";
import { AstronautForm } from "./CreateAstronaut";
import { AstronautEntry } from "../../../interfaces/api.schema";
import { useServices } from "../../hooks/useServices";

export interface EditAstronautProps {
  astronautId: string;
}

export const EditAstronaut = (props: EditAstronautProps) => {
  const { data } = useApi("findAstronaut", { id: props.astronautId });
  const { client, store } = useServices();

  const form = useForm<AstronautEntry>({
    initialValues: data?.content[0]
      ? data?.content[0]
      : {
          firstName: "",
          lastName: "",
          job: "",
          exp: 0,
        },
  });

  const onSubmit = async (values: AstronautEntry) => {
    if (!data?.content[0]) {
      return;
    }
    try {
      const { id } = await client.emit("updateAstronaut", {
        ...data?.content[0],
        ...values,
      });
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
            <Button type="submit">SAVE PROFILE</Button>
            <Button
              variant={"white"}
              onClick={() =>
                store.set("page", {
                  name: "ViewAstronaut",
                  id: props.astronautId,
                })
              }
            >
              CANCEL
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};
