import React, { useState } from 'react'
import { Select, Grid, Card, TextField } from "@shopify/polaris";

export const Heading = ({item}) => {
// const[selected , setSelected] = useState("");
   const options = [
     { label: "Equals", value: "today" },
     { label: "Yesterday", value: "yesterday" },
     { label: "Last 7 days", value: "lastWeek" },
   ];

function handleSelectChange(){

}
  return (
    <div className="heading">
      <Grid>
        <Grid.Cell columnSpan={{ xs: 2, sm: 12, md: 12, lg: 12, xl: 12 }}>
            <Select
              label={item}
              options={options}
              onChange={handleSelectChange}
              //   value={selected}
            />
            <TextField placeholder={item} />
        </Grid.Cell>
      </Grid>
    </div>
  );
}
