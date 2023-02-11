import HeaderMain from "@/layout/HeaderMain";
import $auth from "@/services/auth/auth.service";
import { Container, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ResetPassForm from "../../components/ResetPassForm";

export default function resetPass() {
  const [isExpired, setIsExpired] = useState(false);

  const queryCode = useQuery(
    "checkCodePass",
    () =>
      $auth.checkCodePass({
        code: localStorage.getItem("code"),
      }),
    {
      enabled: false,
      onSuccess: (res) => {
        setIsExpired(res.status !== 200);
      },
      onError: (err) => {
        console.log(err);
        console.log("hola");
      },
    }
  );

  const getIsValidToken = async () => {
    await queryCode.refetch();
  };

  useEffect(() => {
    getIsValidToken();
  }, []);

  return (
    <Flex flexDirection="column">
      <HeaderMain title="" formShowed={""} isPageResetPass={true} />
      <Container py="1.5rem">
        {!isExpired ? (
          <ResetPassForm />
        ) : (
          <Text>The link has already expired</Text>
        )}
      </Container>
    </Flex>
  );
}
