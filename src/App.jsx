import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import "./App.css";
import { useRef, useState } from "react";

function App() {
  const doughRef = useRef(null);
  const hydrationRef = useRef(null);
  const countRef = useRef(null);
  const [doughWater, setDoughWater] = useState(null);
  const [doughFlour, setDoughFlour] = useState(null);
  const [bigaFlour, setBigaFlour] = useState(null);
  const [bigaWater, setBigaWater] = useState(null);
  const [salt, setSalt] = useState(null);
  const [yeast, setYeast] = useState(null);
  const getDoughValues = () => {
    const onePercHydration = 0.004577114;
    const water =
      Math.round(
        (doughRef.current.value *
          (onePercHydration * hydrationRef.current.value)) /
          0.5
      ) * 0.5;
    const flour =
      Math.round((doughRef.current.value - water - 62 - 28) / 0.5) * 0.5;
    setDoughWater(water * countRef.current.value);
    setDoughFlour(flour * countRef.current.value);
    setBigaFlour(62 * countRef.current.value);
    setBigaWater(28 * countRef.current.value);
    setYeast(
      0.5 * countRef.current.value + (67 - hydrationRef.current.value) * 0.02
    );
    setSalt(
      5.5 * countRef.current.value + (67 - hydrationRef.current.value) * 0.5
    );
  };

  return (
    <Box bg={"gray"} minH={"100vh"} minW={"100vw"} padding={"10px"}>
      <Stack spacing={3} maxW={"400px"}>
        <InputGroup>
          <InputLeftAddon>Cesto (g)</InputLeftAddon>
          <Input type="number" placeholder="300g" bg={"white"} ref={doughRef} />
          <InputRightAddon>g</InputRightAddon>
        </InputGroup>
        <InputGroup>
          <InputLeftAddon>Hydratácia (%)</InputLeftAddon>
          <Input
            type="number"
            placeholder="69"
            bg={"white"}
            ref={hydrationRef}
          />
          <InputRightAddon>%</InputRightAddon>
        </InputGroup>
        <InputGroup>
          <InputLeftAddon>Počet (ks)</InputLeftAddon>
          <Input type="number" placeholder="10" bg={"white"} ref={countRef} />
          <InputRightAddon>ks</InputRightAddon>
        </InputGroup>
        <Button colorScheme="green" onClick={() => getDoughValues()}>
          Zadaj
        </Button>
        <TableContainer>
          <Table variant="striped" colorScheme="gray" bg={"white"}>
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Biga</Th>
                <Th>Cesto</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Múka</Td>
                <Td>{bigaFlour}g</Td>
                <Td>{doughFlour}g</Td>
              </Tr>
              <Tr>
                <Td>Voda</Td>
                <Td>{bigaWater}g</Td>
                <Td>{doughWater}g</Td>
              </Tr>
              <Tr>
                <Td>Droždie</Td>
                <Td>{yeast}g</Td>
                <Td>0</Td>
              </Tr>
              <Tr>
                <Td>Soľ</Td>
                <Td>0</Td>
                <Td>{salt}g</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
}

export default App;
