import {
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiEdit, FiMoreVertical, FiTrash } from "react-icons/fi";

const BookmarkCards = ({
  onOpen,
  img = "https://chakra-ui.com/og-image.png",
  //img = "https://res.cloudinary.com/practicaldev/image/fetch/s---i0cDVfO--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://thepracticaldev.s3.amazonaws.com/i/okch3o6nltafe4pdyfdg.png",
  url = "https://chakra-ui.com",
  title = "chakra UI",
  //excerpt = "",
  excerpt = "Chakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.",
  tags = ["framework ui", "development", "learning"],
}) => {
  return (
    <SimpleGrid columns={[1, 4]} mt="1rem" spacing={{ base: "1rem", md: "0" }}>
      <Flex justifyContent="center">
        <Flex
          height="350px"
          width="300px"
          flexDirection="column"
          border="1px"
          borderColor="gray.300"
        >
          <Flex
            position="absolute"
            width="298px"
            justifyContent="flex-end"
            pt="3px"
            pr="3px"
          >
            <Menu isLazy>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<FiMoreVertical />}
                colorScheme="whiteAlpha"
                color="blackAlpha.800"
              />
              {/* <HStack>
                  <Icon color="#F0F8FF" as={FiUser} boxSize="20px" />
                </HStack> */}
              {/* <Stack>
                  <IconButton
                    colorScheme="whiteAlpha"
                    color="blackAlpha.800"
                    aria-label="Call Sage"
                    fontSize="20px"
                    icon={<FiMoreVertical />}
                  />
                </Stack> */}

              <MenuList>
                <MenuItem onClick={onOpen}>
                  <HStack>
                    <Icon as={FiEdit} />
                    <Text>Edit</Text>
                  </HStack>
                </MenuItem>
                <MenuItem>
                  <HStack>
                    <Icon as={FiTrash} />
                    <Text>Delete</Text>
                  </HStack>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Image height="180px" width="300px" src={img} objectFit="cover" />
          <VStack
            height="170px"
            width="300px"
            px="1.5"
            mt="5px"
            justifyContent="space-around"
          >
            <Text fontSize="md" fontWeight="bold">
              {title}
            </Text>
            <Container>
              <Text fontSize="sm">{excerpt}</Text>
            </Container>
            <HStack>
              {tags.map((tag, i) => (
                <Tag variant="outline" key={i}>
                  {tag}
                </Tag>
              ))}
            </HStack>
          </VStack>
        </Flex>
      </Flex>
    </SimpleGrid>
  );
};

export default BookmarkCards;
