import { Select, Grid, TextField, Button } from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import { Heading } from "./Heading";

function Dashboardadd() {
  const [selected, setSelected] = useState([]);
  const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY2NDQ3NDI2OSwiaXNzIjoiaHR0cHM6XC9cL2FwcHMuY2VkY29tbWVyY2UuY29tIiwiYXVkIjoiMTAzLjk3LjE4NC4xMDYiLCJ0b2tlbl9pZCI6IjQwNDEzMCJ9.HvKmgPkUl4RsYfNtoVHFLPLYK9kJGOdrUX0i_PDuBelZZfnxHcHuOMmy0mWykXYiMZ3KBTAO38Oy-u4ftbBGy6ucf8SRdinQWSXG6GY-JMPUxiFXp6i9vmapXwLfrJF1IphBlqWIT3SWyrhlRF7SoifQMcF_jcH42vvkYzENchT8orGoYFZy8cv82vpwDsGHmQ1zIgkO2LmTFFc1KBcHQOiCXOABPCYOc_Fg4Uw6hafw0P5yYZjef7LGSYfEB4rUDO8li6lOxt67Xcnk3Xwu3fqKUDcxEhBwN1yrKU6Ih-HfRsSn4AY_aV5nDoI8i-eOw0zBESBhwiQbRXQiJrub3A`;

  const handleSelectChange = useCallback((value) => setSelected(value), []);
  const options = [{ label: "Row Per Page", value: "today" }];
  const heading = [
    "UserId",
    "Catlog",
    "Shop domain",
    "Shop email",
    "Shop Plan name",
    "Updated at",
    "Created at",
    "Shops myShopify domain",
  ];

  useEffect(() => {
    fetch(
      `https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=1&count=10`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setSelected(data?.data?.rows);

        console.log("row data", data);
      })

      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className="rowperpage">
        <Grid>
          <Select options={options} onChange={handleSelectChange} />
          <Button>View Columns</Button>
        </Grid>
      </div>
      <div className="dashadd">
        <Grid>
          {heading?.map((item, index) => {
            return <Heading key={index} item={item} />;
          })}
        </Grid>
      </div>

      {selected?.map((item) => {
        return (
          <div key={item.id} className="col">
            <Grid>
              <TextField placeholder={item.id} />
              <TextField placeholder={item.catalog} />
              <TextField placeholder={item.shopify.domain} />
              <TextField placeholder={item.email} />
              <TextField placeholder={item.shopify_plan} />
              <TextField placeholder={item.updated_at} />
              <TextField placeholder={item.created_at} />
              <TextField placeholder={item.shopify.domain} />
            </Grid>
          </div>
        );
      })}
    </div>
  );
}
export default Dashboardadd;
