import React from 'react';
import { memo } from 'react';
import { useState } from 'react';

// TodoItem은 memo로 컴포넌트를 감쌌습니다.
// memo는 컴포넌트를 메모이징합니다
// 컴포넌트는 state가 변경되었을 때, props 값이 변경되었을 때, 부모가 리렌더링 됐을 때 리렌더링 됩니다
// memo를 사용하여 컴포넌트를 메모이징하고 유니크한 키값으로 컴포넌트를 식별할 수 있다면
// 부모요소가 리렌더링 되어도 리액트 돔은 해당 컴포넌트를 리렌더링 하지 않습니다.
// 따라서 불필요한 렌더링을 줄일 수 있습니다.
// 현재는 추가될 때에는 리렌더링이 되지 않지만 삭제될 때 idx prop의 변화로 투두 아이템들이 리렌더링이 됩니다.
// 삭제시에도 불필요한 리렌더링을 막고 싶다면 배열이 아니라 오브젝트를 사용하여 id값을 키값으로 활용하는 방법이 있습니다.
// 렌더링 되는 컴포넌트들을 눈으로 확인하고 싶다면 구글 익스텐션인 React Developer Tools를 설치한 후
// 개발자 도구를 열어서 확인할 수 있습니다
// 렌더링 되는 컴포넌트들이 하이라이트됩니다.

const TodoItem = memo(({ item, setTodoList, idx }) => {
  // TodoItem에서는 state를 총 3가지 관리합니다.
  // 투두의 완료 상태를 나타내는 isDone
  // 수정 가능한 상태인지 구분하는 isEditable
  // 수정 상태 인풋 필드를 관리하는 editInput
  const [isDone, setIsDone] = useState(item.isDone);
  const [isEditable, setIsEditable] = useState(false);
  const [editInput, setEditInput] = useState(item.content);

  // 투두 체크 버튼을 눌렀을 때 todoList를 업데이트 해주고
  // 현재 컴포넌트의 isDone state도 변경해줍니다.
  const onCheckButtonClicked = () => {
    setTodoList((prev) => {
      const clone = [...prev];
      clone[idx].isDone = !isDone;
      return clone;
    });
    setIsDone(!isDone);
  };

  // 수정 버튼을 눌렀을 때 isEditable의 값을 true로 업데이트 해줍니다
  const onEditButtonClicked = () => {
    setIsEditable(true);
  };

  // 수정이 끝난 후 완료 버튼을 누르면
  // 변경된 todoList를 업데이트 해주고
  // isEditable을 false로 업데이트 해줍니다
  const onDoneButtonClicked = () => {
    setTodoList((prev) => {
      const clone = [...prev];
      clone[idx] = {
        id: item.id,
        content: editInput,
        isDone: isDone,
      };
      return clone;
    });
    setIsEditable(false);
  };

  // 삭제를 눌렀을 때 해당 인덱스 값의 아이템을 삭제하고 todoList를 업데이트 해줍니다.
  const onDeleteButtonClicked = () => {
    setTodoList((prev) => {
      const clone = [...prev];
      clone.splice(idx, 1);
      return clone;
    });
  };

  return (
    // isDone 값에 따라서 className을 조건부로 변화시켜서 스타일 변화를 줍니다
    <li className={`todo-item ${isDone && 'done'}`}>
      <button className='check-button' onClick={onCheckButtonClicked}></button>
      {/* isEditable 값에 따라서 인풋과 스판을 조건부로 렌더링 해줍니다 */}
      {isEditable ? (
        <input
          type='text'
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
        />
      ) : (
        <span>{item.content}</span>
      )}
      <div className='button-container'>
        {/* 버튼도 isEditable 값에 따라서 조건부 렌더링 해줍니다 */}
        {isEditable ? (
          <button className='edit-done-button' onClick={onDoneButtonClicked}>
            {'완료'}
          </button>
        ) : (
          <button className='edit-button' onClick={onEditButtonClicked}>
            <img src='/assets/images/pencil.png' alt='' />
          </button>
        )}
        <button className='delete-button' onClick={onDeleteButtonClicked}>
          <img src='/assets/images/delete.png' alt='' />
        </button>
      </div>
    </li>
  );
});

export default TodoItem;
