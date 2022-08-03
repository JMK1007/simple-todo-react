import React from 'react';

// props는 부모 컴포넌트에서 받은 값이라고 생각하면 됩니다
// React의 데이터 흐름은 위에서 아래로 내려갑니다.
// App.jsx에서 TodoHeader 컴포넌트에 doneCnt와 totalCnt를 props로 전달해주었고
//  <TodoHeader doneCnt={doneCnt} totalCnt={todoList.length} />;
// TodoHeader에서는 그 값들을 받아서 활용할 수 있습니다.
// 아래 주석처리된 부분처럼 props 객체를 받아서 props.doneCnt, props.totalCnt라고 사용할 수도 있고
// 구조분해할당을 통해 바로 꺼내서 사용할 수도 있습니다.

const TodoHeader = ({ doneCnt, totalCnt }) => {
  return (
    <header className='todo-header'>
      <h1 className='heading1'>{`You've done ${doneCnt} things out of ${totalCnt}`}</h1>
    </header>
  );
};

// const TodoHeader = (props) => {
//   return (
//     <header className='todo-header'>
//       <h1 className='heading1'>{`You've done ${props.doneCnt} things out of ${props.totalCnt}`}</h1>
//     </header>
//   );
// };

export default TodoHeader;
