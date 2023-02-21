import useForm from "@/hooks/useForm";
import { Bookmark } from "@/types";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagCloseButton,
  TagLabel,
  VStack,
} from "@chakra-ui/react";
import { FC, useRef, useState } from "react";

interface AddMarkModalProps {
  title: string;
  isOpen: boolean;
  onCancel: () => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  ctx: ReturnType<typeof useForm<Bookmark>>;
  onSubmit: () => void;
}

const AddMarkModal: FC<AddMarkModalProps> = ({
  title,
  isOpen,
  onCancel,
  onAddTag,
  onRemoveTag,
  ctx,
  onSubmit,
}) => {
  const [tag, setTag] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddTag = () => {
    onAddTag(tag);
    if (!inputRef.current) return;
    inputRef.current.value = "";
    setTag("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <ModalOverlay />
      <ModalContent width={{ base: "95%", md: "50%" }}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton onClick={() => onCancel()} />
        <ModalBody pb={5}>
          <FormControl isInvalid={ctx.touched.url && ctx.errors.url}>
            <FormLabel>Url</FormLabel>
            <Input
              placeholder="ex: https://chakra-ui.com/"
              value={ctx.values?.url}
              onBlur={() => ctx.touchField("url")}
              onChange={(e) => {
                ctx.setField("url", e.target.value);
              }}
            />
            <FormErrorMessage>{ctx.errors.url}</FormErrorMessage>
          </FormControl>
          <FormControl mt={2} isInvalid={ctx.touched.title && ctx.errors.title}>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="ex: Chakra UI"
              value={ctx.values?.title}
              onBlur={() => ctx.touchField("title")}
              onChange={(e) => {
                ctx.setField("title", e.target.value);
              }}
            />
            <FormErrorMessage>{ctx.errors.title}</FormErrorMessage>
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Tags</FormLabel>
            <Input
              placeholder="ex: framework UI"
              ref={inputRef}
              value={tag}
              onChange={(e) => {
                setTag(e.target.value);
              }}
            />
            <VStack align="flex-end" mt="2px">
              <Button
                mt="3px"
                borderColor="gray.300"
                bg="gray.200"
                _hover={{ bg: "#CBD5E0" }}
                size="xs"
                onClick={handleAddTag}
                rightIcon={<AddIcon />}
              >
                Tag
              </Button>
            </VStack>
            {ctx?.values?.tags?.map((tag, i) => (
              <Tag key={i} mb="5px" mx="2px">
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton onClick={() => onRemoveTag(tag)} />
              </Tag>
            ))}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup gap="1">
            <Button size="sm" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              size="sm"
              color="gray.50"
              bg="#0987A0"
              _hover={{ bg: "#00A3C4" }}
              mr={3}
              onClick={onSubmit}
            >
              Save
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddMarkModal;
