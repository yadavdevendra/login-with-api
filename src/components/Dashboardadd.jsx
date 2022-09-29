import { Select,  Grid,  TextField, Button } from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import { Heading } from "./Heading";

function Dashboardadd() {
  const [selected, setSelected] = useState([]);
  const [title, settitle] = useState([]);
  const [option , setOption] = useState([])
  const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY2NDQ1ODI2OCwiaXNzIjoiaHR0cHM6XC9cL2FwcHMuY2VkY29tbWVyY2UuY29tIiwiYXVkIjoiMTAzLjk3LjE4NC4xMDYiLCJ0b2tlbl9pZCI6IjQwMzgxOSJ9.LYCLrZMcgXFrc-e8TSUzwgWS0_2HzKqQRXgGOQX6Pl0WtTi783DJsimq-XH1o0sEmnFtZZIh188Bc4VNf8SICZu2zFEsbTjPU4iJppvk_KssekTbhk7xwwH0CrY8jUIdALERS217yUNl8dg21bxZn-z0pC6fPr6ZOVFRQqSyDg6qc8IGoSgth8Nf2SVhvjjPB7oB6qjhVhdJlAX1wq9Pl1w4A385-f8IRPWJ4hZjNN9otunCLu0JhDGDpe_tc8PCydE_ZGGTML05D913OT6XnYKvgfnU0OhjN3IsDUplwmcSBEvGk4dYULldgs7wg6wPvtthvEkC316ryAnCZziZLw`;

  const handleSelectChange = useCallback((value) => setSelected(value), []);
   const options = [
     { label: "Row Per Page", value: "today" }
   ];
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
        setSelected(data.data.rows);

        console.log(data.data.rows);
      })

      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className="rowperpage">
        <Grid >
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
