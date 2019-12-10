import styled from "styled-components";

const TodoCard = styled.div`
  width: 45%;
  margin-bottom: 2%;
  background: #fff;
  border-radius: 2px;
  border: ${props =>
    props.done === true ? "1px solid green" : "1px solid red"};
  padding: 2%;

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  h3 {
    text-decoration: ${props =>
      props.done === true ? "line-through" : "none"};
  }

  button {
    padding: 2%;
    border-width: 0;
    outline: none;
    border-radius: 2px;
    color: black;
    margin-right: 10px;
    transition: background-color 0.3s;
  }

  button:hover,
  button:focus {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  }
`;

export default TodoCard;
