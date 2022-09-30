import React, { useState } from 'react'
import { Select, Grid, Card, TextField, Stack } from "@shopify/polaris";

export const Heading = ({item}) => {
const[selected , setSelected] = useState("");
  //  const options = [
  //    { label: "Equals", value: "today" },
  //    { label: "Yesterday", value: "yesterday" },
  //    { label: "Last 7 days", value: "lastWeek" },
  //  ];

function handleSelectChange(){

}
  return (
    <div>
      <Stack>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 12, xl: 6 }}>
          <Card>
            <Select
              label={item}
              options={["Equals"]}
              value={selected}
              onChange={handleSelectChange}
              // error="Province is required"
            />
          </Card>
          <TextField placeholder={item} />
        </Grid.Cell>
      </Stack>
    </div>
  );
}
