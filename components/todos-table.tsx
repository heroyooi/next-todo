'use client';

import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { VerticalDotsIcon } from './icons';
import { Todo } from '@/types';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodosTable = ({ todos }: { todos: Todo[] }) => {
  // 할일 추가 가능 여부
  const [todoAddEnable, setTodoAddEnable] = useState(false);

  // 입력된 할일
  const [newTodoInput, setNewTodoInput] = useState('');

  // 로딩상태
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const notifyTodoAddedEvent = (msg: string) => toast.success(msg);

  const addATodoHandler = async () => {
    if (!todoAddEnable) {
      return;
    }
    setTodoAddEnable(false);
    setIsLoading(true);

    await new Promise((f) => setTimeout(f, 600));
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
      method: 'post',
      body: JSON.stringify({
        title: newTodoInput,
      }),
      cache: 'no-store',
    });
    setNewTodoInput('');
    router.refresh();
    setIsLoading(false);
    notifyTodoAddedEvent('할일이 성공적으로 추가되었습니다!');
    console.log(`할일 추가완료 : ${newTodoInput}`);
  };

  const TodoRow = (aTodo: Todo) => {
    return (
      <TableRow key={aTodo.id}>
        <TableCell>{aTodo.id}</TableCell>
        <TableCell>{aTodo.title}</TableCell>
        <TableCell>{aTodo.is_done ? '✅' : '미완료'}</TableCell>
        <TableCell>{`${aTodo.created_at}`}</TableCell>
        <TableCell>
          <div className='relative flex justify-end items-center gap-2'>
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size='sm' variant='light'>
                  <VerticalDotsIcon className='text-default-300' />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>상세보기</DropdownItem>
                <DropdownItem>수정</DropdownItem>
                <DropdownItem>삭제</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className='flex flex-col space-y-2'>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
        <Input
          type='text'
          label='새로운 할일'
          value={newTodoInput}
          onValueChange={(changedInput: string) => {
            setNewTodoInput(changedInput);
            setTodoAddEnable(changedInput.length > 0);
          }}
        />
        {todoAddEnable ? (
          <Button
            color='warning'
            className='h-14'
            onPress={async () => {
              await addATodoHandler();
            }}
          >
            추가
          </Button>
        ) : (
          <Popover placement='top' showArrow={true}>
            <PopoverTrigger>
              <Button color='default' className='h-14'>
                추가
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className='px-1 py-2'>
                <div className='text-small font-bold'>😀</div>
                <div className='text-tiny'>할일을 입력해주세요!</div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      <div className='h-6'>
        {isLoading && <Spinner size='sm' color='warning' />}
      </div>
      <Table aria-label='Example static collection table'>
        <TableHeader>
          <TableColumn>아이디</TableColumn>
          <TableColumn>할일내용</TableColumn>
          <TableColumn>완료여부</TableColumn>
          <TableColumn>생성일</TableColumn>
          <TableColumn>액션</TableColumn>
        </TableHeader>
        <TableBody emptyContent='보여줄 데이터가 없습니다.'>
          {todos && todos.map((aTodo: Todo) => TodoRow(aTodo))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodosTable;
