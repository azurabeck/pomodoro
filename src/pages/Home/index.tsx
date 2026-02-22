import { Container } from "../../components/Container";
import { CountDown } from "../../components/CountDown";
import { MainTemplate } from "../../templates/MainTemplate";
import { MainForm } from "../../components/MainForm";
import type { TaskStateModel } from "../../models/TaskStateModel";

export type HomeProps = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
}

export const Home = () => {

  return (
    <MainTemplate>

        <Container> <CountDown /></Container>
        <MainForm />

    </MainTemplate>    
  )
}