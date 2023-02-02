import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  FormControl,
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
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

const AddMarkModal = ({
  defaultValues,
  title,
  isOpen,
  onClose,
  newValues,
  currentValues,
  setNewValues,
  setCurrentValues,
  addInTags,
  removeInTags,
  tags,
  typeValues,
  revertValues,
}) => {
  const [tag, setTag] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onAddTag = (tag: string) => {
    addInTags(tag, typeValues);
    if (!inputRef.current) return;
    inputRef.current.value = "";
    setTag("");
  };

  const onChangeValues = (e, key, typeValues) => {
    if (typeValues === "newValues") {
      setNewValues({
        ...newValues,
        [key]: e.target.value,
      });
      return;
    }
    setCurrentValues({
      ...currentValues,
      [key]: e.target.value,
    });
  };

  const onCancelEdition = (typeValues) => {
    if (typeValues === "newValues") {
      onClose();
      return;
    }
    onClose();
    revertValues();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent width={{ base: "95%", md: "50%" }}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton onClick={() => onCancelEdition(typeValues)} />
        <ModalBody pb={5}>
          <FormControl>
            <FormLabel>Url</FormLabel>
            <Input
              defaultValue={defaultValues?.url}
              placeholder="ex: https://chakra-ui.com/"
              value={newValues?.url || defaultValues?.url}
              onChange={(e) => {
                onChangeValues(e, "url", typeValues);
              }}
            />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Title</FormLabel>
            <Input
              defaultValue={defaultValues?.title}
              placeholder="ex: Chakra UI"
              value={newValues?.title || defaultValues?.title}
              onChange={(e) => {
                onChangeValues(e, "title", typeValues);
              }}
            />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Excerpt</FormLabel>
            <Textarea
              defaultValue={defaultValues?.excerpt}
              placeholder="ex: Chakra UI is a simple, modular and accessible component library that gives..."
              value={newValues?.excerpt || defaultValues?.excerpt}
              onChange={(e) => {
                onChangeValues(e, "excerpt", typeValues);
              }}
            />
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
                bg="#E2E8F0"
                _hover={{ bg: "#CBD5E0" }}
                size="xs"
                onClick={() => onAddTag(tag)}
                rightIcon={<AddIcon />}
              >
                Tag
              </Button>
            </VStack>
            {tags?.map((tag, i) => (
              <Tag key={i} mb="5px" mx="2px">
                <TagLabel value={tag}>{tag}</TagLabel>
                <TagCloseButton onClick={() => removeInTags(tag, typeValues)} />
              </Tag>
            ))}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup gap="1">
            <Button size="sm" onClick={() => onCancelEdition(typeValues)}>
              Cancel
            </Button>
            <Button
              size="sm"
              color="gray.50"
              bg="#0987A0"
              _hover={{ bg: "#00A3C4" }}
              mr={3}
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
