import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
export const Options = (props) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {
      label: "Name",
      value: "name",
    },
    {
      label: "QTY<=",
      value: "quantity,<=",
    },
    {
      label: "QTY>=",
      value: "quantity,>=",
    },
    {
      label: "Price<=",
      value: "price,<=",
    },
    {
      label: "Price>=",
      value: "price>=",
    },
    {
      label: "Supplier",
      value: "supplier",
    },
  ]);
  return (
    <DropDownPicker
      open={open}
      setOpen={setOpen}
      items={items}
      setItems={setItems}
      setValue={props.setOption}
      value={props.option}
      showTickIcon={true}
      placeholder={"Option"}
      style={{
        width: 100,
        marginVertical: 10,
        height: 50,
      }}
    />
  );
};
