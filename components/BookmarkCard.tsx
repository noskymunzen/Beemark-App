import { Bookmark } from "@/types";
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
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiEdit, FiMoreVertical, FiTrash } from "react-icons/fi";

interface BookmarkCardProps {
  onEdit: () => void;
  onDelete: () => void;
  bookmark: Bookmark;
}

const BookmarkCard = ({ onEdit, onDelete, bookmark }: BookmarkCardProps) => {
  return (
    <Flex justifyContent="center">
      <Flex
        height="350px"
        width="300px"
        flexDirection="column"
        border="1px"
        borderRadius="8px"
        borderColor="gray.300"
      >
        <Flex
          position="absolute"
          width="298px"
          justifyContent="flex-end"
          pt="5px"
          pr="5px"
        >
          <Menu isLazy>
            <MenuButton
              borderRadius="20px"
              as={IconButton}
              aria-label="Options"
              icon={<FiMoreVertical />}
              colorScheme="whiteAlpha"
              color="blackAlpha.800"
            />
            <MenuList>
              <MenuItem onClick={onEdit}>
                <HStack>
                  <Icon as={FiEdit} />
                  <Text>Edit</Text>
                </HStack>
              </MenuItem>
              <MenuItem onClick={onDelete}>
                <HStack>
                  <Icon as={FiTrash} />
                  <Text>Delete</Text>
                </HStack>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Image
          borderTopRadius="8px"
          height="180px"
          width="300px"
          src={bookmark.imageURL}
          objectFit="contain"
        />
        <Link href={bookmark.url} target="_blank">
          <VStack
            cursor="pointer"
            height="170px"
            width="300px"
            px="1.5"
            py="1rem"
            justifyContent="space-around"
          >
            <Text fontSize="md" fontWeight="bold">
              {bookmark.title}
            </Text>
            <Container
              display="block"
              // overflow="hidden"
              height="80px"
              width="300px"
              textOverflow="ellipsis"
              fontSize="xs"
            >
              {bookmark.excerpt}
            </Container>
            <HStack>
              {bookmark.tags.slice(0, 3).map((tag, i) => (
                <Tag variant="outline" key={i}>
                  {tag}
                </Tag>
              ))}
            </HStack>
          </VStack>
        </Link>
      </Flex>
    </Flex>
  );
};

export default BookmarkCard;
