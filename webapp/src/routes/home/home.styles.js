import styled from 'styled-components';
import backgroundImg from '../../images/background.jpg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-image: url(${backgroundImg});
  background-size: cover;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(50, 69, 68, 0.8);
`;

export const Content = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
`;

export const GiphyImage = styled.img`
  max-height: 200px;
  max-width: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 320px;
  margin: 30px 0;
`;

export const Input = styled.input`
  margin-bottom: 30px;
  height: 48px;
  box-shadow: none;
  border-radius: 300px;
  border: 1px solid #fada5e;
  padding: 10px 20px;
  line-height: 28px;
  outline: none;
  font-size: 18px;
  letter-spacing: 2px;
  color: #151515;

  &::placeholder {
    color: #cccccc;
  }
`;

export const Button = styled.button`
  font-size: 18px;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 1em 1.75em;
  background-color: #fada5e;
  line-height: 1em;
  color: #fff;
  border: none;
  border-radius: 300px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: rgba(250, 218, 94, 0.8);
  }
`;

export const FormSummary = styled.div`
  margin-top: 30px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SuccessMessage = styled.div`
  color: #fff;
  font-size: 16px;
`;

export const ErrorMessage = styled.div`
  color: #940000;
  font-size: 16px;
`;
