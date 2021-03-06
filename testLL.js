import React from "react";
import styled from "styled-components";
import magnifyingGlass from "../../../assets/magnifying.png";

const FormStyle = styled.form`
  display: flex;
  background-color: #e71242;
  color: white;
  flex-direction: column;
  padding: 2%;
  height: 33vh;
`;
const FlexRow = styled.div`
  display: inherit;
  flex-direction: row;
  margin-top: 3vh;
  justify-content: space-around;
`;
const PostcodeSearchBar = styled.input`
  display: flex;
  align-self: center;
  padding: 1%;
  margin: 2%;
  width: 75vw;
  height: 6vh;
  background-color: #e71242;
  border: 2px solid white;
  font: lato;
  color: white;
  font-size: 1.2rem;
  margin-top: 2em;
  &::placeholder {
    color: white;
  }
`;
const Radio = styled.input`
  display: none;
  text-align: center;
`;
const FakeRadio = styled.label`
  display: table;
  width: 20vw;
  height: 4vh;
  padding: 2%;
  color: white;
  background: #e71242;
  border: 2px solid white;
  text-align: center;
`;
const FakeRadioOn = styled.label`
  display: table;
  width: 20vw;
  height: 4vh;
  padding: 2%;
  color: #e71242;
  background: white;
  border: 2px solid #e71242;
  text-align: center;
`;

const Submit = styled.button`
  display: flex;
  color: white;
  background-color: none;
`;
const Question = styled.p`
  padding-top: 3.2em;
  font-size: 1rem;
  margin: 0 auto;
`;
const LabelSmall = styled.label`
  font-size: 1rem;
  margin: 0 auto;
  padding-top: 1em;
`;
const Padding = styled.div`
  margin: 5%;
  padding-top: 2em;
`;

const CheckBox = styled.input`
  color: #e71242;
  border: 2px solid white;
  margin-left 5%;
  margin-bottom: 0;
`;

const SearchForm = ({ ...props }) => {
  return (
    <FormStyle>
      {props.postcodeErrorMsg ? <p>{props.postcodeErrorMsg}</p> : ""}
      <FlexRow>
        <PostcodeSearchBar
          type="text"
          name="postcode"
          placeholder="Enter your postcode"
          value={props.postcode}
          onChange={props.handleChange}
        />
        <Submit type="submit" onClick={props.checkPostcode}>
          <img
            src={magnifyingGlass}
            width={40}
            height={40}
            vertical-align="center"
          />
        </Submit>
      </FlexRow>
      <Question>When do you need food? </Question>
      <FlexRow>
        {props.timeOption == "today" ? (
          <FakeRadioOn htmlFor="today">Today</FakeRadioOn>
        ) : (
          <FakeRadio htmlFor="today">Today</FakeRadio>
        )}
        <Radio
          id="today"
          type="radio"
          name="time"
          value="today"
          onChange={props.handleTime}
        />
        {props.timeOption == "tomorrow" ? (
          <FakeRadioOn htmlFor="tomorrow">Tomorrow</FakeRadioOn>
        ) : (
          <FakeRadio htmlFor="tomorrow">Tomorrow</FakeRadio>
        )}
        <Radio
          id="tomorrow"
          type="radio"
          name="time"
          value="tomorrow"
          onChange={props.handleTime}
        />
        {props.timeOption == "later" ? (
          <FakeRadioOn htmlFor="later">Later</FakeRadioOn>
        ) : (
          <FakeRadio htmlFor="later">Later</FakeRadio>
        )}
        <Radio
          id="later"
          type="radio"
          name="time"
          value="later"
          onChange={props.handleTime}
        />
      </FlexRow>
      <Padding>
        <LabelSmall htmlFor="advice-centres">See advice centres</LabelSmall>
        <CheckBox
          id="advice-centres"
          type="checkbox"
          name="advice-centres"
          onChange={props.toggleAdviceCentres}
        />
      </Padding>
    </FormStyle>
  );
};

export default SearchForm;
