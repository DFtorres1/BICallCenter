import { Table } from "antd";
import { useEffect, useState } from "react";
import useCalls from "./useCalls";

const Calls = () => {
  const [callsList, setCallsList] = useState([{}]);
  const {data: callListData, isPending: dataLoanding} = useCalls()

  useEffect(() => {
    setCallsList(callListData)
  },[callListData])

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const columns = [
    {
      title: "Fecha",
      dataIndex: "fechaHora",
      key: "fecha",
      render: (callDate) =>
        `${new Date(callDate).getDay()} de ${
          monthNames[new Date(callDate).getMonth()]
        } de ${new Date(callDate).getFullYear()}`,
      sorter: (a, b) => new Date(a.fechaHora) - new Date(b.fechaHora),
    },
    {
      title: "Hora",
      dataIndex: "fechaHora",
      key: "hora",
      render: (callDate) =>
        `${new Date(callDate).getMinutes()}:${new Date(callDate).getSeconds()}`,
    },
    {
      title: "Duración",
      dataIndex: "duracionLlamada",
      key: "duracionLlamada",
      sorter: (a, b) => a.duracionLlamada - b.duracionLlamada,
    },
    {
      title: "Cliente",
      dataIndex: "idCliente",
      key: "idCliente",
      sorter: (a, b) => a.idCliente - b.idCliente,
    },
    {
      title: "Agente",
      dataIndex: "idAgente",
      key: "idAgente",
      sorter: (a, b) => a.idAgente - b.idAgente,
    },
  ];

  useEffect(() => {
    let dataTypeList = [];
    callsList.map((call, key) => {
      let dataTypeObject = {
        key: String(key),
        fechaHora: call.fechaHora,
        duracionLlamada: call.duracionLlamada,
        idCliente: call.idCliente,
        idAgente: call.idAgente,
      };
      dataTypeList.push(dataTypeObject);
    });
    setCallsList(dataTypeList);
     
  }, [callsList]);

  return (
    <div style={{ maxWidth: "60vw" }}>
      <Table dataSource={callsList} columns={columns} />
    </div>
  );
};

export default Calls;
