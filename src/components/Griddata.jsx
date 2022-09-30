import {Pagination, Select,Page, Grid, Card, Button } from "@shopify/polaris";
import React, { useState } from "react";
  

function Griddata() {
    const [perpage, setPerpage] = useState(1);
  const handleSelectChange = () => {
    setPerpage(perpage + 1);
  };
  const options = [
    { label: "Row Per Page", value: "today" },
    { label: perpage, value: perpage },
  ];
  return (
    <Page fullWidth>
      <Card sectioned>
        <Grid columns={{ xs: 1, sm: 4, md: 4, lg: 6, xl: 6 }}
          areas={{
            xs: ["product", "sales", "orders"],
            sm: [
              "product product product product",
              "sales sales orders orders",
            ],
            md: ["sales product product orders"],
            lg: ["product product product product sales orders"],
            xl: ["product product sales sales orders orders"],
          }}
        >
          <Grid.Cell area="product">
            <Pagination
              style={{
                height: "60px",
                background: "aquamarine",
              }}
              label="Results"
              hasPrevious
              onPrevious={() => {
                console.log("Previous");
              }}
              hasNext
              onNext={() => {
                console.log("Next");
              }}
            />
          </Grid.Cell>
          <Grid.Cell area="sales">
            <Select
              style={{
                height: "60px",
                background: "aquamarine",
              }}
              options={options}
              onChange={handleSelectChange}
              value=""
            />
          </Grid.Cell>
          <Grid.Cell area="orders">
            <Button
              style={{
                height: "60px",
                background: "aquamarine",
              }}
            >
              View Columns
            </Button>
          </Grid.Cell>
        </Grid>
      </Card>
    </Page>
  );
}
export default Griddata;
