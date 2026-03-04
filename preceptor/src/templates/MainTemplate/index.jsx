import { Container } from "../../components/Container";
import { Sidebar } from "../../components/Sidebar";
import "./styles.css";

export function MainTemplate({ children, onNavigate }) {
  return (
    <Container>
      <div className="app-layout">
        <Sidebar onNavigate={onNavigate} />
        <main className="main-content">{children}</main>
      </div>
    </Container>
  );
}
