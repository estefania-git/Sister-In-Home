import styled from 'styled-components';

const PageTitle = styled.h2 `
;  font-size: 2.5rem;
  color: ${props => props.color ? props.color : 'white'};
  margin-top: 0;
  text-align: center;
`;

export default PageTitle