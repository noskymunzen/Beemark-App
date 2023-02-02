import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

const SecctionProfile = ({
  title,
  value,
  btnName,
  section,
  onChangeBtnName,
  form,
}) => {
  return (
    <Box>
      <Heading size="xs" textTransform="uppercase">
        {title}
      </Heading>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        width="100%"
        mt="0.5rem"
      >
        {btnName === "Cancel" ? (
          <Box minW={{ base: "auto", md: "350px" }}>{form}</Box>
        ) : (
          <Text pt="2" fontSize="sm">
            {value}
          </Text>
        )}
        <Flex
          flexDirection="row"
          justifyContent="flex-end"
          gap={1}
          mt={{ base: "0.8rem", md: "0" }}
        >
          {btnName === "Cancel" && (
            <Button
              minW="75px"
              color="white"
              bg="#0987A0"
              _hover={{ backgroundColor: "#086F83" }}
              fontSize="13px"
            >
              Save
            </Button>
          )}
          <Button
            minW="75px"
            variant="outline"
            fontSize="13px"
            value={btnName}
            onClick={(e) => {
              onChangeBtnName(e.target.value, section);
            }}
          >
            {btnName}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SecctionProfile;
