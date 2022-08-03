import './App.css';
import { useMemo } from 'react';
import { useState } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoHeader from './components/TodoHeader';
import TodoItem from './components/TodoItem';

function App() {
  /**
   * state는 관리해야 할 변수입니다
   * UI상에서 업데이트 되는 값들은 대부분 state로 관리한다고 생각하면 됩니다
   *
   * useState는 state를 관리하기 위한 훅입니다
   * 배열 구조분해 할당을 통해 useState를 활용할 수 있습니다
   * 첫 번째 요소에는 값이 할당되고,
   * 두 번째 요소에는 스테이트를 업데이트 하기 위한 함수(setState)가 할당됩니다
   * useState에 들어가는 파라미터는 state의 초기값입니다.
   */

  // todoList는
  // {id : string , content: string, isDone:boolean} 배열로 만들겠습니다.
  // 초기값은 빈 배열로 줍니다
  const [todoList, setTodoList] = useState([]);

  // doneCnt는 투두리스트에서 완료된 개수를 저장하기 위해 사용되었습니다.
  // useMemo는 값을 메모이제이션하는 hook입니다.
  // 쉽게 말해서 값을 저장한다고 생각하면 됩니다
  // useMemo는 저장할 값을 반환하는 factory 함수와, deps라는 디펜던시 배열을 파라미터로 받습니다
  // 값은 메모이제이션 하기 때문에 factory 함수 안에서 쓰이는 값이 변화가 생길 때 업데이트 할 수 있도록 deps 배열 안에 작성해줘야 합니다.
  // doneCnt에 쓰인 factory 함수를 보면 안에 todoList state가 쓰인 걸 볼 수 있습니다.
  // todoList의 값이 변경될 때마다 doneCnt도 업데이트를 해줘야 하기 때문에 deps 배열에 추가해야 합니다.
  // 만약에 deps 배열에 todoList를 추가하지 않는다면 메모이징된 factory함수에는 빈 배열을 초기값으로 갖고 있는 todoList를 업데이트 하지 않고 계속 사용하겠죠?
  const doneCnt = useMemo(() => {
    return todoList.filter((item) => item.isDone).length;
  }, [todoList]);

  return (
    <div className='todo-root'>
      <TodoHeader doneCnt={doneCnt} totalCnt={todoList.length} />
      <AddTodoForm todoList={todoList} setTodoList={setTodoList} />
      <ul className='todo-list'>
        {todoList.map((item, idx) => {
          // key값은 props가 아니라 식별자입니다.
          // 따라서 겹치지 않는 유니크한 값을 전달해야 합니다.
          // 이렇게 map을 이용하여 컴포넌트들을 리턴할 경우에 key값을 주어야 합니다.
          // 돔트리와 가상돔에서 키값을 비교해서 일부만 리렌더링하기 때문에
          // 투두리스트처럼 순서가 동적으로 변할 수 있는 아이템의 경우에는 idx값을 키값으로 줘서는 안됩니다

          return (
            <TodoItem
              item={item}
              setTodoList={setTodoList}
              idx={idx}
              key={item.id}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
