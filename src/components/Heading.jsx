import React, { useState } from "react";
import { Select, Grid, Card, TextField, Stack } from "@shopify/polaris";

export const Heading = ({ item }) => {
  const [selected, setSelected] = useState("");
  //  const options = [
  //    { label: "Equals", value: "today" },
  //    { label: "Yesterday", value: "yesterday" },
  //    { label: "Last 7 days", value: "lastWeek" },
  //  ];

  function handleSelectChange() {}
  return (
    <Stack.Item>
      <Select
        label={item}
        options={["Equals"]}
        value={selected}
        onChange={(val) => setSelected(val)}
        // error="Province is required"
      />
      <TextField placeholder={item} align="center" />
    </Stack.Item>
  );
};
