import { Button, Col, Divider, Input, Row, Select } from "antd";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { environment } from "../../constants/environment";
import { OptionsTravel } from "../../enums/options-travel.enums";
import { fetchGet } from "../../functions/fetch-get";

interface PropsTravel {
    travelEmission: string | undefined;
    optionsTravel: JSX.Element[];
    travelType: OptionsTravel | undefined;
    setTravelType: Dispatch<SetStateAction<OptionsTravel | undefined>>;
    setInputValueTravel: Dispatch<SetStateAction<string | undefined>>;
    setTravelEmission: Dispatch<SetStateAction<string | undefined>>;
    inputValueTravel: string | undefined;
}

function Travel(props: PropsTravel) {
    const { travelEmission, optionsTravel, travelType, setInputValueTravel, setTravelEmission, inputValueTravel, setTravelType } = props;

    const handleChangeInputTravel = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
          setInputValueTravel('');
          setTravelEmission('');
          return;
        }
    
        const inputValue = e.target.value;
    
        setInputValueTravel(inputValue);
    
        if (!travelType) {
          return;
        }
    
        const enumKey = Object.keys(OptionsTravel)[Object.values(OptionsTravel).indexOf(travelType)];
    
        const params = new URLSearchParams();
        params.append("amount", inputValue);
        params.append("type", enumKey);

        fetchGet('travel', params.toString()).then((data) => setTravelEmission(data));
      }

    const handleChangeOptionTravel = (value: OptionsTravel) => {

        if (!inputValueTravel) {
          return;
        }
    
        const option = value;
    
        console.log(`selected ${option}`);
        setTravelType(option);
    
        const enumKey = Object.keys(OptionsTravel)[Object.values(OptionsTravel).indexOf(value)];
    
        const params = new URLSearchParams();
        params.append("amount", inputValueTravel);
        params.append("type", enumKey);
    
        fetch(environment.apiUrl + '/travel?' + params.toString())
          .then(response => response.json())
          .then(data => setTravelEmission(data))
          .catch(err => {
            alert(err);
          });
      }

    

    return (
      <Row gutter={30}>
        <Col span={6}>
          <Divider orientation="left">Travel</Divider>
          <Input type="number" placeholder="Distance in KM" onBlur={handleChangeInputTravel}/>
          <br />
          <br />

          <Select placeholder="Select transportation type" value={travelType} style={{ width: 240 }} onChange={handleChangeOptionTravel}>
            {optionsTravel}
          </Select>
          <br />
          <br />

          <Button style={{ width: '100%' }} type="primary" shape="default"  size={'large'}>
            {travelEmission || '0'} kg CO2e/yr
          </Button>

        </Col>
      </Row>
    )
}

export default Travel;