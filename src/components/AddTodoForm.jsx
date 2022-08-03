import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';

// AddTodoForm은 props로 todoList와 setTodoList를 받았습니다.
// 왜 일까요?
// 당연히 인풋에서 입력받은 투두 아이템을 기존 todoList에 추가하기 위함이겠죠?

// 아래 주석을 해제해서 비교해보세요
// input값에는 ref와 state로 접근할 수 있습니다.
// 다만 그 값을 관리해야 할 경우에는 state를 사용해야 합니다.
// 투두 추가처럼 버튼을 눌렀을 때 적혀있는 input 필드의 값을 가져오면 되는 경우에는
// ref를 사용할 수 있습니다.
// ref는 돔요소에 접근하는 것이기 때문에 인풋 필드에 값을 입력해도 리렌더링이 되지 않습니다.

//  useRef사용
const AddTodoForm = ({ todoList, setTodoList }) => {
  // ref를 사용할 때는 useRe를 통해 ref Object를 만들고
  // 접근하고자 하는 엘리먼트의 ref에 생성한 ref object를 할당해주면 됩니다
  const addRef = useRef();

  const onAddButtonClicked = () => {
    // 값을 변경하기 위해서는 무조건 setState함수를 사용해야 합니다
    // 직접적으로 state를 변화시키면 리액트 돔에서 상태가 업데이트 됐는지 알 수 없기 때문입니다.
    // 또한 setState를 이용해서 값을 업데이트 할 때
    // 이전 값과 비교하여 다를 때만 업데이트를 하는데
    // 오브젝트와 배열의 경우에는 데이터가 들어있는 메모리의 참조값이 저장되어 있기 때문에
    // 꼭 새로운 변수에 shallow copy를 하여 업데이트를 해주어야 합니다.
    const clone = [...todoList];
    const item = {
      id: new Date().getTime(),
      content: addRef.current.value,
      isDone: false,
    };
    clone.push(item);
    setTodoList(clone);
    addRef.current.value = '';
  };

  return (
    <div className='todo-add-section'>
      <form className='add-form'>
        <input type='text' className='add-input' ref={addRef} />
        <button
          className='add-button'
          onClick={(e) => {
            // form 태그 안에 button 태그가 있을 경우, 해당 버튼은 디폴트로 submit type이 됩니다
            // submit이 발생할 경우 페이지가 refreshing 되기 때문에
            //  e.preventDefault();를 사용하여 디폴트로 발생하는 refresh 이벤트를 막아줍니다.
            e.preventDefault();
            onAddButtonClicked();
          }}>
          {'+'}
        </button>
      </form>
    </div>
  );
};

// state 사용
// const AddTodoForm = ({ todoList, setTodoList }) => {
//   // 아래 주석을 해제해서 비교해보세요
//   // input값에는 ref와 state로 접근할 수 있습니다.
//   // 다만 그 값을 관리해야 할 경우에는 state를 사용해야 합니다.
//   // 투두 추가처럼 버튼을 눌렀을 때 적혀있는 input 필드의 값을 가져오면 되는 경우에는
//   // ref를 사용할 수 있습니다.
//   // ref는 돔요소에 접근하는 것이기 때문에 인풋 필드에 값을 입력해도 리렌더링이 되지 않습니다.

//   //State 사용
//   const [addInput, setAddInput] = useState('');

//   const onAddButtonClicked = () => {
//     // 1. todoList를 카피
//     // 2. 새로운 투두 아이템 생성
//     // 3. 카피한 배열에 새로운 아이템 추가
//     // 4. setState 함수를 통해 값 업데이트

//     const clone = [...todoList];
//     const item = {
//       id: new Date().getTime(),
//       content: addInput,
//       isDone: false,
//     };
//     clone.push(item);
//     setTodoList(clone);
//     setAddInput('');

//   // 사실 가장 좋은 방법은 setState함수에서 가장 최신값을 받아서 활용하는 것입니다
//   // setState 함수는 비동기로 실행되기 때문에
//   // 저희가 받아온 todoList의 값이 업데이트 하는 순간에 가장 최신값이라고 장담할 수 없습니다
//   // 따라서 setState 함수에서 받아온 최신값을 활용하는 것이 제일 좋습니다.

//   // setTodoList((prev) => {
//   //   const clone = [...prev];
//   //   const item = {
//   //     id: new Date().getTime(),
//   //     content: addInput,
//   //     isDone: false,
//   //   };
//   //   clone.push(item);
//   //   return clone;
//   // });
//   // setAddInput('');
// };

//   return (
//     <div className='todo-add-section'>
//       <form className='add-form'>
//         <input
//           type='text'
//           className='add-input'
//           value={addInput}
//           onChange={(e) => {
//             setAddInput(e.target.value);
//           }}

//         />
//         <button
//           className='add-button'
//           onClick={(e) => {

//             e.preventDefault();
//             onAddButtonClicked();
//           }}>
//           {'+'}
//         </button>
//       </form>
//     </div>
//   );
// };

export default AddTodoForm;
