import { VictoryAxis, VictoryBar, VictoryChart } from "victory";
import { Select } from "antd";
import useSatisfaction from "./useSatisfaction";
import { useEffect, useState } from "react";

const Satisfaction = () => {
  const { data: satisfactionData, isLoading: satisfactionLoading } =
    useSatisfaction();

  const [satisfactionList, setSatisfactionList] = useState([]);
  const [agentList, setAgentsList] = useState([]);
  const [tableArray, setTableArray] = useState([]);
  const [tickX, setTickX] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(0);

  const createAgentsList = () => {
    const filteredAgentList = [];
    filteredAgentList.push(0);

    if (satisfactionData)
      satisfactionData.map((satisfaction) => {
        !filteredAgentList.includes(satisfaction.agenteId) &&
          filteredAgentList.push(satisfaction.agenteId);
      });
    setAgentsList(filteredAgentList);
  };

  const satisfactionAverageList = () => {
    let satisAvList = [];
    if (satisfactionData) {
      satisAvList = satisfactionData.reduce((accumulator, satisfaction) => {
        const { agenteId, calificacion } = satisfaction;

        if (!accumulator[agenteId]) {
          accumulator[agenteId] = { sum: 0, count: 0 };
        }

        accumulator[agenteId].sum += calificacion;
        accumulator[agenteId].count += 1;

        return accumulator;
      }, {});

      const newSatisAvList = [];
      for (const [agenteId, { sum, count }] of Object.entries(satisAvList)) {
        newSatisAvList.push({
          agenteId: Number(agenteId),
          count: sum / count,
        });
      }
      return newSatisAvList;
    }
  };

  const toTableArr = () => {
    const tableArr = [];
    satisfactionList.map((satisfaction, index) => {
      console.log(satisfaction);
      tableArr.push({
        x: selectedAgent ? index + 1 : satisfaction.agenteId,
        y: selectedAgent ? satisfaction.calificacion : satisfaction.count,
      });
    });
    setTableArray(tableArr);
  };

  const toSelectArr = (agentList) => {
    const selectArr = [];
    agentList.map((agent) => {
      selectArr.push({
        value: agent,
        label: (
          <span key={agent}>{agent !== 0 ? `Agente ${agent}` : `Todos`}</span>
        ),
      });
    });
    return selectArr;
  };

  const handleSelectAgent = (value) => {
    setSelectedAgent(value);
  };

  useEffect(() => {
    if (satisfactionData) setSatisfactionList(satisfactionData);
  }, [satisfactionData]);

  useEffect(() => {
    createAgentsList();
  }, [satisfactionList]);

  useEffect(() => {
    let newTickX = [];

    satisfactionList.map((satisfaction, index) =>
      newTickX.push(selectedAgent ? index + 1 : satisfaction.agenteId)
    );

    setTickX(newTickX);
    toTableArr();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [satisfactionList, selectedAgent]);

  useEffect(() => {
    let newSatisfactionList = [];

    newSatisfactionList = selectedAgent
      ? satisfactionData.filter(
          (satisfaction) => satisfaction.agenteId === selectedAgent
        )
      : satisfactionAverageList();

    if (
      JSON.stringify(satisfactionList) !== JSON.stringify(newSatisfactionList)
    ) {
      setSatisfactionList(newSatisfactionList);
    }
  }, [selectedAgent, satisfactionList]);

  return (
    <div style={{ alignContent: "center", textAlign: "center" }}>
      {selectedAgent !== 0 ? (
        <h2>Ventas por agente</h2>
      ) : (
        <h2>Promedio de ventas</h2>
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "40vw" }}>
          <VictoryChart domainPadding={{ x: 30, y: 20 }}>
            <VictoryBar data={tableArray} />
            <VictoryAxis dependentAxis tickFormat={(tick) => `${tick} ☆`} />
            <VictoryAxis
              scale={"linear"}
              tickFormat={tickX}
              label={selectedAgent !== 0 ? "Encuesta" : "Agente"}
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
  );
};

export default Satisfaction;
