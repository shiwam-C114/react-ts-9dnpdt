import * as React from 'react';
import './style.css';
import { Button, ChakraProvider } from '@chakra-ui/react';
import { Box, Center, VStack } from '@chakra-ui/react';
import { Highlight } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { ListItem, UnorderedList } from '@chakra-ui/react';

export default function App() {
  const [bool, SetBool] = React.useState(true);
  const [task, SetTask] = React.useState('test');
  const [newTask, SetNewTask] = React.useState('');
  const [list, SetList] = React.useState([]);
  const choseOneRandomTask = () => {
    let randTask = list[parseInt((list.length * Math.random()).toString())];
    SetTask(randTask || 'nothing');
  };

  const addNewTask = () => {
    SetList([...list, newTask]);
    localStorage.setItem('list', JSON.stringify([...list, newTask]));
  };
  React.useEffect(() => {
    (async () => {
      let listFetched = await localStorage.getItem('list');
      listFetched = await JSON.parse(listFetched);
      SetList([...listFetched]);
    })();
  }, []);

  return (
    <ChakraProvider>
      <Box>
        <Center h="100vh">
          {bool ? (
            <Button
              onClick={() => {
                SetBool(false);
                choseOneRandomTask();
              }}
            >
              What Should I Do Now?
            </Button>
          ) : (
            <VStack>
              <Highlight
                query={task}
                styles={{
                  color: 'white',
                  px: '2',
                  py: '2',
                  bg: '#' + Math.random().toString(16).substr(-6),
                  rounded: '10px',
                }}
              >
                {task}
              </Highlight>
              <br />
              <br />
              <br />

              <Button
                onClick={() => {
                  choseOneRandomTask();
                }}
              >
                Pass...
              </Button>
            </VStack>
          )}
        </Center>
        <hr />
        <Center h="100vh">
          <VStack>
            <Input
              textAlign="center"
              onChange={(e) => SetNewTask(e.target.value)}
              m="2"
              placeholder="Input New Task"
            />
            <Button onClick={addNewTask} mr="4">
              ADD
            </Button>
            <UnorderedList>
              {list?.map((e, i) => (
                <ListItem key={i}>{e}</ListItem>
              ))}
            </UnorderedList>
          </VStack>
        </Center>
      </Box>
    </ChakraProvider>
  );
}
