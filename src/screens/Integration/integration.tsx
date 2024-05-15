import { PageView } from "@/components";
import { Integrations } from "@/utils/enums/integrations";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export const Integration = () => {
  const router = useRouter();
  const [screenType, setScreenType] = useState<"order" | "dashboard">("order");

  const getIntegration = () => {
    switch (router.query?.["integration-name"]) {
      case Integrations.MERCADO_LIVRE:
        return "Mercado Livre";
      default:
        return "Integração";
    }
  };
  return (
    <PageView>
      <div>
        <div>
          <h1>{getIntegration()}</h1>
        </div>

        <div>
          <ButtonGroup>
            <Button
              colorScheme={screenType === "order" ? "blue" : "gray"}
              onClick={() => setScreenType("order")}
            >
              {" "}
              Pedidos{" "}
            </Button>
            <Button
              colorScheme={screenType === "dashboard" ? "blue" : "gray"}
              onClick={() => setScreenType("dashboard")}
            >
              {" "}
              Dashboard{" "}
            </Button>
          </ButtonGroup>
        </div>

        <div>
          {screenType === "order" ? (
            <p>Você está vendo a lista de pedidos</p>
          ) : (
            <p>Vocês está vendo o dashboard</p>
          )}
        </div>
      </div>
    </PageView>
  );
};
