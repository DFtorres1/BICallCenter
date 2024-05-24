import { VictoryAxis, VictoryBar, VictoryChart } from "victory";
import { Select } from "antd";
import { useEffect, useState } from "react";
import useSales from "./useSales";

const Sales = () => {
  const { data: salesVolumeData, isLoading: salesLoading } = useSales();

  const [salesVolumeList, setSalesVolumeList] = useState([]);
  const [agentList, setAgentsList] = useState([]);
  const [tableArray, setTableArray] = useState([]);
  const [tickX, setTickX] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(0);

  const salesAverageList = () => {
    let salesAverageList = [];
    if (salesVolumeData) {
      salesAverageList = salesVolumeData.reduce((accumulator, sale) => {
        const { idAgente, cantVenta } = sale;

        if (!accumulator[idAgente]) {
          accumulator[idAgente] = { sum: 0, count: 0 };
        }

        accumulator[idAgente].sum += cantVenta;
        accumulator[idAgente].count += 1;

        return accumulator;
      }, {});

      const newSalesAverageList = [];
      for (const [idAgente, { sum, count }] of Object.entries(
        salesAverageList
      )) {
        newSalesAverageList.push({
          idAgente: Number(idAgente),
          count: sum / count,
        });
      }
      return newSalesAverageList;
    }
  };

  const toSelectArr = (agentList) => {
    const selectArr = [];
    agentList.map((agent) => {
      selectArr.push({
        value: agent,
        label: <span key={agent}>{agent ? `Agente ${agent}` : `Todos`}</span>,
      });
    });
    return selectArr;
  };

  const handleSelectAgent = (value) => {
    setSelectedAgent(value);
  };

  useEffect(() => {
    if (salesVolumeData) setSalesVolumeList(salesVolumeData);
  }, [salesVolumeData]);

  useEffect(() => {
    let tableArr = [];
    let newTickX = [];
    let newSalesVolumeList = [];
    let filteredAgentList = [];

    filteredAgentList.push(0);

    if (salesVolumeData) {
      salesVolumeData.map((sale) => {
        !filteredAgentList.includes(sale.idAgente) &&
          filteredAgentList.push(sale.idAgente);
      });

      newSalesVolumeList = selectedAgent
        ? salesVolumeData.filter((sale) => sale.idAgente === selectedAgent)
        : salesAverageList();

      if (
        JSON.stringify(salesVolumeList) !== JSON.stringify(newSalesVolumeList)
      ) {
        setSalesVolumeList(newSalesVolumeList);
      }
    }

    if (salesVolumeList) {
      
      salesVolumeList.map((sale, index) => {
        newTickX.push(selectedAgent ? index + 1 : sale.idAgente);

        tableArr.push({
          x: selectedAgent ? index + 1 : sale.idAgente,
          y: selectedAgent ? sale.cantVenta : sale.count,
        });
      });

      if (JSON.stringify(agentList) !== JSON.stringify(filteredAgentList)) {
        setAgentsList(filteredAgentList);
      }

      setTableArray(tableArr);
    }
    setTickX(newTickX);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salesVolumeList, selectedAgent, agentList, salesVolumeData]);

  if (salesLoading) return <div>Loading...</div>;

  return salesVolumeList ? (
    <div style={{ alignContent: "center", textAlign: "center" }}>
      {selectedAgent ? <h2>Ventas por agente</h2> : <h2>Promedio de ventas</h2>}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "40vw" }}>
          <VictoryChart domainPadding={{ x: 30, y: 20 }}>
            <VictoryBar data={tableArray} />
            <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}$`} />
            <VictoryAxis
              scale={"linear"}
              tickFormat={tickX}
              label={selectedAgent ? "Venta" : "Agente"}
            />
          </VictoryChart>
        </div>
        <Select
          showSearch
          defaultValue={0}
          options={toSelectArr(agentList)}
          style={{ minWidth: "18vw" }}
          onChange={handleSelectAgent}
        />
      </div>
    </div>
  ) : (
    <>
      <Select
        showSearch
        defaultValue={null}
        options={toSelectArr(agentList)}
        style={{ minWidth: "18vw" }}
        onChange={handleSelectAgent}
      />
      <h2>Selecciona un agente para empezar</h2>
    </>
  );
};

export default Sales;
