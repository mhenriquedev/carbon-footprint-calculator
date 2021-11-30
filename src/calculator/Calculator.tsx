import { ChangeEvent, FormEvent, SetStateAction, useState } from 'react';
import { Button, Card, Col, Divider, Input, Row, Select } from 'antd';
import { OptionsNaturalGas } from '../enums/options-natural-gas.enums';
import { OptionsElectricity } from '../enums/options-electricity.enums';
import { OptionsFuelOil } from '../enums/options-fuel-oil.enums';
import { OptionsPropane } from '../enums/options-propane.enums';
import { OptionsTravel } from '../enums/options-travel.enums';
import Travel from './travel/Travel';
import { fetchGet } from '../functions/fetch-get';

const tabList = [
  {
    key: 'tab1',
    tab: 'Home Emissions',
  },
  {
    key: 'tab2',
    tab: 'Travel ',
  }
];

const { Option } = Select;

const optionsNaturalGas = (Object.entries(OptionsNaturalGas).map(([key, value]) => <Option key={key}  value={value}> {value}</Option>));
const optionsElectricity = (Object.entries(OptionsElectricity).map(([key, value]) => <Option key={key}  value={value}> {value}</Option>));
const optionsFuelOil = (Object.entries(OptionsFuelOil).map(([key, value]) => <Option key={key}  value={value}> {value}</Option>));
const optionsPropane = (Object.entries(OptionsPropane).map(([key, value]) => <Option key={key}  value={value}> {value}</Option>));
const optionsTravel = (Object.entries(OptionsTravel).map(([key, value]) => <Option key={key}  value={value}> {value}</Option>));

const Calculator = () => {
  const [activeTabKey1, setActiveTabKey1] = useState('tab1');

  const [inputValueNaturalGas, setInputValueNaturalGas] = useState<string>();
  const [inputValueElectricity, setInputValueElectricity] = useState<string>();
  const [inputValueFuelOil, setInputValueFuelOil] = useState<string>();
  const [inputValuePropane, setInputValuePropane] = useState<string>();
  const [inputValueTravel, setInputValueTravel] = useState<string>();

  const [naturalGasType, setNaturalGasType] = useState<OptionsNaturalGas>();
  const [electricityType, setElectricityType] = useState<OptionsElectricity>();
  const [fuelOilType, setFuelOilType] = useState<OptionsFuelOil>();
  const [propaneType, setPropaneType] = useState<OptionsPropane>();
  const [travelType, setTravelType] = useState<OptionsTravel>();

  const [naturalGasEmission, setNaturalGasEmission] = useState<string>();
  const [electricityEmission, setElectricityEmission] = useState<string>();
  const [fuelOilEmission, setFuelOilEmission] = useState<string>();
  const [propaneEmission, setPropaneEmission] = useState<string>();
  const [travelEmission, setTravelEmission] = useState<string>();

  const handleChangeInputNG = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setInputValueNaturalGas('');
      setNaturalGasEmission('');
      return;
    }

    const inputValue = e.target.value;

    setInputValueNaturalGas(inputValue);

    if (!naturalGasType) {
      return;
    }

    const enumKey = Object.keys(OptionsNaturalGas)[Object.values(OptionsNaturalGas).indexOf(naturalGasType)];

    const params = new URLSearchParams();
    params.append("amount", inputValue);
    params.append("type", enumKey);

    fetchGet('home-emission/natural-gas', params.toString()).then((data) => setNaturalGasEmission(data));
      
  }

  const handleChangeInputEL = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setInputValueElectricity('');
      setElectricityEmission('');
      return;
    }

    const inputValue = e.target.value;

    setInputValueElectricity(inputValue);

    if (!electricityType) {
      return;
    }

    const enumKey = Object.keys(OptionsElectricity)[Object.values(OptionsElectricity).indexOf(electricityType)];

    const params = new URLSearchParams();
    params.append("amount", inputValue);
    params.append("type", enumKey);

    fetchGet('home-emission/electricity', params.toString()).then((data) => setElectricityEmission(data));
  }

  const handleChangeInputFO = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setInputValueFuelOil('');
      setFuelOilEmission('');
      return;
    }

    const inputValue = e.target.value;

    setInputValueFuelOil(inputValue);

    if (!fuelOilType) {
      return;
    }

    const enumKey = Object.keys(OptionsFuelOil)[Object.values(OptionsFuelOil).indexOf(fuelOilType)];

    const params = new URLSearchParams();
    params.append("amount", inputValue);
    params.append("type", enumKey);

    fetchGet('home-emission/fuel-oil', params.toString()).then((data) => setFuelOilEmission(data));
  }

  const handleChangeInputPR = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setInputValuePropane('');
      setPropaneEmission('');
      return;
    }

    const inputValue = e.target.value;

    setInputValuePropane(inputValue);

    if (!propaneType) {
      return;
    }

    const enumKey = Object.keys(OptionsPropane)[Object.values(OptionsPropane).indexOf(propaneType)];

    const params = new URLSearchParams();
    params.append("amount", inputValue);
    params.append("type", enumKey);

    fetchGet('home-emission/propane', params.toString()).then((data) => setPropaneEmission(data));
  }

  const handleChangeOptionNG = (value: OptionsNaturalGas) => {

    if (!inputValueNaturalGas) {
      return;
    }

    const option = value;

    setNaturalGasType(option);

    const enumKey = Object.keys(OptionsNaturalGas)[Object.values(OptionsNaturalGas).indexOf(value)];

    const params = new URLSearchParams();
    params.append("amount", inputValueNaturalGas);
    params.append("type", enumKey);

    fetchGet('home-emission/natural-gas', params.toString()).then((data) => setNaturalGasEmission(data));
  }

  const handleChangeOptionEL = (value: OptionsElectricity) => {

    if (!inputValueElectricity) {
      return;
    }

    const option = value;

    setElectricityType(option);

    const enumKey = Object.keys(OptionsElectricity)[Object.values(OptionsElectricity).indexOf(value)];

    const params = new URLSearchParams();
    params.append("amount", inputValueElectricity);
    params.append("type", enumKey);

      fetchGet('home-emission/electricity', params.toString()).then((data) => setElectricityEmission(data));
  }

  const handleChangeOptionFO = (value: OptionsFuelOil) => {

    if (!inputValueFuelOil) {
      return;
    }

    const option = value;

    setFuelOilType(option);

    const enumKey = Object.keys(OptionsFuelOil)[Object.values(OptionsFuelOil).indexOf(value)];

    const params = new URLSearchParams();
    params.append("amount", inputValueFuelOil);
    params.append("type", enumKey);

    fetchGet('home-emission/fuel-oil', params.toString()).then((data) => setFuelOilEmission(data));
  }

  const handleChangeOptionPR = (value: OptionsPropane) => {

    if (!inputValuePropane) {
      return;
    }

    const option = value;

    setPropaneType(option);

    const enumKey = Object.keys(OptionsPropane)[Object.values(OptionsPropane).indexOf(value)];

    const params = new URLSearchParams();
    params.append("amount", inputValuePropane);
    params.append("type", enumKey);

    fetchGet('home-emission/propane', params.toString()).then((data) => setPropaneEmission(data));
  }

  const onTab1Change = (key: SetStateAction<string>) => {
    setActiveTabKey1(key);
  };

  return (
    <>
      <Card
        style={{ width: '100%' }}
        title="Your Current Emissions"
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={key => {
          onTab1Change(key);
        }}
      >

        {

          activeTabKey1 == 'tab1' ? 

          (
            <div>
              <i>Estimated pounds of CO2/year</i>

              <Row gutter={30}>
                <Col span={6}>
                  <Divider orientation="left">Natural Gas</Divider>
                  <Input type="number" onBlur={handleChangeInputNG}/>
                  <br />
                  <br />
      
                  <Select placeholder="Select" value={naturalGasType} style={{ width: 240 }} onChange={handleChangeOptionNG}>
                    {optionsNaturalGas}
                  </Select>
                  <br />
                  <br />
      
                  <Button style={{ width: '100%' }} type="primary" shape="default"  size={'large'}>
                    {naturalGasEmission || '0'} lbs
                  </Button>
      
                </Col>
                <Col span={6}>
                  <Divider orientation="left">Electricity</Divider>
                  <Input  type="number" onBlur={handleChangeInputEL}/>
                  <br />
                  <br />
      
                  <Select placeholder="Select" value={electricityType} style={{ width: 240 }} onChange={handleChangeOptionEL}>
                    {optionsElectricity}
                  </Select>
                  <br />
                  <br />
      
                  <Button style={{ width: '100%' }} type="primary" shape="default"  size={'large'}>
                    {electricityEmission || '0'} lbs
                  </Button>
                </Col>
                <Col span={6}>
                  <Divider orientation="left">Fuel Oil</Divider>
                  <Input  type="number" onBlur={handleChangeInputFO}/>
                  <br />
                  <br />
      
                  <Select placeholder="Select" style={{ width: 240 }} onChange={handleChangeOptionFO}>
                    {optionsFuelOil}
                  </Select>
      
                  <br />
                  <br />
      
                  <Button style={{ width: '100%' }} type="primary" shape="default"  size={'large'}>
                    {fuelOilEmission || '0'} lbs
                  </Button>
                </Col>
                <Col span={6}>
                  <Divider orientation="left">Propane</Divider>
                  <Input  type="number" onBlur={handleChangeInputPR}/>
                  <br />
                  <br />
                  
                  <Select placeholder="Select" style={{ width: 240 }} onChange={handleChangeOptionPR}>
                    {optionsPropane}
                  </Select>
                  <br />
                  <br />
      
                  <Button style={{ width: '100%' }} type="primary" shape="default"  size={'large'}>
                    {propaneEmission || '0'} lbs
                  </Button>
                </Col>
              </Row>
            </div>
            
          ) : 
          (

            <Travel 
              travelEmission={travelEmission} 
              optionsTravel={optionsTravel} 
              travelType={travelType}
              setTravelType={setTravelType}
              setInputValueTravel={setInputValueTravel}
              setTravelEmission={setTravelEmission}
              inputValueTravel={inputValueTravel}
            />
            // <Row gutter={30}>
            //   <Col span={6}>
            //     <Divider orientation="left">Travel</Divider>
            //     <Input type="number" placeholder="Distance in KM" onBlur={handleChangeInputTravel}/>
            //     <br />
            //     <br />

            //     <Select placeholder="Select transportation type" value={travelType} style={{ width: 240 }} onChange={handleChangeOptionTravel}>
            //       {optionsTravel}
            //     </Select>
            //     <br />
            //     <br />

            //     <Button style={{ width: '100%' }} type="primary" shape="default"  size={'large'}>
            //       {travelEmission || '0'} kg CO2e/yr
            //     </Button>

            //   </Col>
            // </Row>


          )
          
        }

      </Card>
      <br />
      <br />
    </>
  );
};

export default Calculator;