import { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Grid, IconButton, Input, Select, Switch, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [blocks, setBlocks] = useState([]);
  const [rows, setRows] = useState(1);
  const [columns, setColumns] = useState(1);
  const [gridProps, setGridProps] = useState({
    gap: "10px",
    justifyContent: "start",
    alignItems: "start",
  });
  const [flexProps, setFlexProps] = useState({
    gap: "10px",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  });

  const handleAddBlock = () => {
    setBlocks([...blocks, { size: 50, color: `hsl(${Math.random() * 360}, 70%, 70%)` }]);
  };

  const handleRemoveBlock = (index) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const handleGridPropsChange = (prop, value) => {
    setGridProps({ ...gridProps, [prop]: value });
  };

  const handleFlexPropsChange = (prop, value) => {
    setFlexProps({ ...flexProps, [prop]: value });
  };

  const renderBlocks = () => {
    return blocks.map((block, index) => (
      <Box key={index} width={`${block.size}px`} height={`${block.size}px`} bg={block.color} display="flex" alignItems="center" justifyContent="center" border="1px solid black">
        <IconButton aria-label="Remove block" icon={<FaTrash />} size="xs" onClick={() => handleRemoveBlock(index)} />
      </Box>
    ));
  };

  return (
    <VStack spacing={4}>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="display-mode" mb="0">
          Grid / Flexbox Mode:
        </FormLabel>
        <Switch id="display-mode" isChecked={isGrid} onChange={() => setIsGrid(!isGrid)} />
      </FormControl>

      {isGrid ? (
        <FormControl>
          <FormLabel>Grid Properties:</FormLabel>
          <Wrap>
            <WrapItem>
              <Input placeholder="Gap" value={gridProps.gap} onChange={(e) => handleGridPropsChange("gap", e.target.value)} />
            </WrapItem>
            <WrapItem>
              <Select value={gridProps.justifyContent} onChange={(e) => handleGridPropsChange("justifyContent", e.target.value)}>
                <option value="start">Start</option>
                <option value="end">End</option>
                <option value="center">Center</option>
                <option value="space-between">Space Between</option>
                <option value="space-around">Space Around</option>
                <option value="space-evenly">Space Evenly</option>
              </Select>
            </WrapItem>
            <WrapItem>
              <Select value={gridProps.alignItems} onChange={(e) => handleGridPropsChange("alignItems", e.target.value)}>
                <option value="start">Start</option>
                <option value="end">End</option>
                <option value="center">Center</option>
                <option value="stretch">Stretch</option>
                <option value="baseline">Baseline</option>
              </Select>
            </WrapItem>
          </Wrap>
        </FormControl>
      ) : (
        <FormControl>
          <FormLabel>Flexbox Properties:</FormLabel>
          <Wrap>
            <WrapItem>
              <Input placeholder="Gap" value={flexProps.gap} onChange={(e) => handleFlexPropsChange("gap", e.target.value)} />
            </WrapItem>
            <WrapItem>
              <Select value={flexProps.justifyContent} onChange={(e) => handleFlexPropsChange("justifyContent", e.target.value)}>
                <option value="flex-start">Flex Start</option>
                <option value="flex-end">Flex End</option>
                <option value="center">Center</option>
                <option value="space-between">Space Between</option>
                <option value="space-around">Space Around</option>
                <option value="space-evenly">Space Evenly</option>
              </Select>
            </WrapItem>
            <WrapItem>
              <Select value={flexProps.alignItems} onChange={(e) => handleFlexPropsChange("alignItems", e.target.value)}>
                <option value="flex-start">Flex Start</option>
                <option value="flex-end">Flex End</option>
                <option value="center">Center</option>
                <option value="stretch">Stretch</option>
                <option value="baseline">Baseline</option>
              </Select>
            </WrapItem>
          </Wrap>
        </FormControl>
      )}

      <Wrap>
        <WrapItem>
          <FormControl>
            <FormLabel>Rows:</FormLabel>
            <Input type="number" value={rows} onChange={(e) => setRows(parseInt(e.target.value, 10))} />
          </FormControl>
        </WrapItem>
        <WrapItem>
          <FormControl>
            <FormLabel>Columns:</FormLabel>
            <Input type="number" value={columns} onChange={(e) => setColumns(parseInt(e.target.value, 10))} />
          </FormControl>
        </WrapItem>
        <WrapItem>
          <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddBlock}>
            Add Block
          </Button>
        </WrapItem>
      </Wrap>

      {isGrid ? (
        <Grid templateColumns={`repeat(${columns}, minmax(50px, 1fr))`} templateRows={`repeat(${rows}, 1fr)`} gap={gridProps.gap} justifyContent={gridProps.justifyContent} alignItems={gridProps.alignItems}>
          {renderBlocks()}
        </Grid>
      ) : (
        <Flex direction="column" wrap="wrap" gap={flexProps.gap} justifyContent={flexProps.justifyContent} alignItems={flexProps.alignItems} style={{ maxHeight: `${50 * rows}px` }}>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <Flex key={rowIndex} gap={flexProps.gap} justifyContent={flexProps.justifyContent} alignItems={flexProps.alignItems}>
              {renderBlocks().slice(rowIndex * columns, (rowIndex + 1) * columns)}
            </Flex>
          ))}
          {renderBlocks()}
        </Flex>
      )}
    </VStack>
  );
};

export default Index;
