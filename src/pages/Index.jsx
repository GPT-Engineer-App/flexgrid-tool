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
    margin: "0px",
    alignSelf: "stretch",
  });
  const [flexProps, setFlexProps] = useState({
    gap: "10px",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: "0px",
    alignSelf: "stretch",
  });

  const handleAddBlock = () => {
    if (blocks.length < rows * columns) {
      setBlocks([...blocks, { size: 50, color: `hsl(${Math.random() * 360}, 70%, 70%)` }]);
    }
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

      {blocks.map((block, index) => (
        <FormControl key={index}>
          <FormLabel>Block Properties:</FormLabel>
          <Wrap>
            <WrapItem>
              <FormLabel htmlFor={`block-size-${index}`}>Block Size:</FormLabel>
              <Input id={`block-size-${index}`} placeholder="Size" value={block.size} onChange={(e) => setBlocks(blocks.map((b, idx) => (idx === index ? { ...b, size: parseInt(e.target.value, 10) } : b)))} />
            </WrapItem>
            <WrapItem>
              <FormLabel htmlFor={`block-color-${index}`}>Block Color:</FormLabel>
              <Input id={`block-color-${index}`} placeholder="Color" value={block.color} onChange={(e) => setBlocks(blocks.map((b, idx) => (idx === index ? { ...b, color: e.target.value } : b)))} />
            </WrapItem>
          </Wrap>
        </FormControl>
      ))}
      <FormControl>
        <FormLabel>{isGrid ? "Grid Container Properties:" : "Flexbox Container Properties:"}</FormLabel>
        <Wrap>
          <WrapItem>
            <FormLabel htmlFor="container-gap">Gap:</FormLabel>
            <Input id="container-gap" placeholder="Gap" value={isGrid ? gridProps.gap : flexProps.gap} onChange={(e) => (isGrid ? handleGridPropsChange("gap", e.target.value) : handleFlexPropsChange("gap", e.target.value))} />
          </WrapItem>
          <WrapItem>
            <FormLabel htmlFor="container-align-items">Align Items:</FormLabel>
            <Select id="container-align-items" value={isGrid ? gridProps.alignItems : flexProps.alignItems} onChange={(e) => (isGrid ? handleGridPropsChange("alignItems", e.target.value) : handleFlexPropsChange("alignItems", e.target.value))}>
              <option value="start">Start</option>
              <option value="end">End</option>
              <option value="center">Center</option>
              <option value="stretch">Stretch</option>
              <option value="baseline">Baseline</option>
            </Select>
          </WrapItem>
        </Wrap>
      </FormControl>

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
