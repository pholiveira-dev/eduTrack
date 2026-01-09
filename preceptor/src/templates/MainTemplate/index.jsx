import { Container } from "../../components/Container";
import { Sidebar } from "../../components/Sidebar";
import "./styles.css";

export function MainTemplate({ children, onNavigate }) {
  return (
    <Container>
      <Sidebar onNavigate={onNavigate} />
      {children}
    </Container>
  );
}
