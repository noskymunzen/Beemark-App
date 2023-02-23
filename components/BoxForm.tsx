import { Center, Flex, Text } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface FormProps extends PropsWithChildren {
  title: string;
}

const Form = ({ title, children }: FormProps) => {
  return (
    <Flex
      border="2px"
      borderColor="gray.200"
      width="100%"
      height="100%"
      justifyContent="center"
      pt="0.5rem"
      pb="1.5rem"
      borderRadius="10px"
    >
      <Flex
        width="80%"
        height="80%"
        display="flex"
        flexDirection="column"
        pb="0.5rem"
      >
        <Center>
          <Text my="0.5rem" fontSize="lg" fontWeight="semibold">
            {title}
          </Text>
        </Center>
        {children}
      </Flex>
    </Flex>
  );
};

export default Form;
