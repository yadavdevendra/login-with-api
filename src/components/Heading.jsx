import React, { useState } from 'react'
import { Select, Grid, Card, TextField } from "@shopify/polaris";

export const Heading = ({item}) => {
// const[selected , setSelected] = useState("");
   const options = [
     { label: "Today", value: "today" },
     { label: "Yesterday", value: "yesterday" },
     { label: "Last 7 days", value: "lastWeek" },
   ];

function handleSelectChange(){

}
  return (
    <div className="heading">
      <Grid>
        <Grid.Cell columnSpan={{ xs: 3, sm: 8, md: 9, lg: 12, xl: 12 }}>
          <Card title={item} >
            <Select
              options={options}
              onChange={handleSelectChange}
            //   value={selected}
            />
            <TextField placeholder={item} />
          </Card>
        </Grid.Cell>
      </Grid>
    </div>
  );
}
