import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
  NumberInput,
  NumberInputField,
  FormControl,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import "iframe-resizer/js/iframeResizer.contentWindow";
import "./App.css";

function App() {
  let params = useParams();
  let data = params.str.split("|");
  let ingredients = data[0].split(";");
  let recipe = data[1];
  //let qty = data[2] ? data[2] : 14.5;
  ingredients.forEach(function (element, index) {
    ingredients[index] = element.split(",");
  });
  const [inputValue, setInputValue] = useState();

  return (
    <div>
      <Container maxW="container.lg" padding="0">
        <Heading className="capitalize-first" mb={5}>
          {recipe}
        </Heading>
        <FormControl mb={5}>
          <Flex alignItems="center" gap={3}>
            <Text as="b">Insira aqui o peso em KG:</Text>
            <NumberInput
              precision={2}
              step={0.2}
              type="text"
              id="inputField"
              defaultValue={inputValue}
              onChange={(valueString) => setInputValue(valueString)}
              flex={1}
            >
              <NumberInputField />
            </NumberInput>
          </Flex>
        </FormControl>
        <TableContainer>
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                <Th>Ingredientes</Th>
                <Th isNumeric>Quantidade</Th>
                <Th w="7em" textAlign="center">
                  Medida
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {ingredients.map(function (ingredient, i) {
                return (
                  <Tr key={i}>
                    <Td>{ingredient[0]}</Td>
                    <Td isNumeric>
                      {inputValue
                        ? ingredient[2].toLowerCase() === "gramas"
                          ? Math.round(ingredient[1] * inputValue)
                          : (ingredient[1] * inputValue).toFixed(2)
                        : 0}
                    </Td>
                    <Td textAlign="center">
                      {ingredient[2] ? ingredient[2] : ""}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default App;
