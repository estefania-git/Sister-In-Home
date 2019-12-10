import styled from 'styled-components';

const FormWrapper = styled.form `
  display: ${props => props.show === true ? 'flex' : 'none' } ;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 0 auto;
  padding: 5% 0;
  .submit-button{
    padding: 1% 3%;
    border-width: 0;
    outline: none;
    border-radius: 2px;
    color: black;
    margin-right: 10px;
    transition: background-color .3s;
    background-color: #2ecc71;
    color: #ecf0f1;
  }

  .submit-button:hover, .submit-button:focus {
    box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
  }

  div {
    margin-bottom: 5%;
    
  }
`;

export default FormWrapper;