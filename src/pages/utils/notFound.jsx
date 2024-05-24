import { Content } from "antd/es/layout/layout";

const notFound = () => {
  return (
    <Content
      style={{
        justifyContent: "center",
        alignItems: "center",
        margin: "0 1rem 0.5rem 0",
      }}
    >
      Pagina no encontrada
    </Content>
  );
};

export default notFound;
