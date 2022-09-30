import {
  Select,
  Grid,
  TextField,
  Button,
  Pagination,
  Stack,
} from "@shopify/polaris";
import { useState, useEffect } from "react";
import { Heading } from "./Heading";
import { useLocation } from "react-router-dom";

function Dashboardadd() {
  const [selected, setSelected] = useState([]);
  const [perpage, setPerpage] = useState(1);
  const { state } = useLocation();
  // console.log("token", state.token);
  const token = state?.token;

  const handleSelectChange = () => {
    setPerpage(perpage + 1);
  };
  const options = [
    { label: "Row Per Page", value: "today" },
    { label: perpage, value: perpage },
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
        setSelected(data?.data?.rows);

        console.log("row data", data);
      })

      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className="rowperpage">
        <Stack>
          <div className="pagination">
            <Pagination
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
          </div>
          <div className="perpageselect">
            <Select options={options} onChange={handleSelectChange} value="" />
          </div>
          <div className="btnperpage">
            <Button>View Columns</Button>
          </div>
        </Stack>
      </div>
      <div className="dashadd">
        <Stack wrap={false}>
          {heading?.map((item, index) => {
            return <Heading key={index} item={item} />;
          })}
        </Stack>
      </div>

      {selected?.map((item) => {
        return (
          <div key={item.id} className="col">
            <Stack wrap={false}>
              <Stack.Item>
                <TextField placeholder={item.id} />
              </Stack.Item>
              <Stack.Item>
                <TextField placeholder={item.catalog} />
              </Stack.Item>
              <Stack.Item>
                <TextField placeholder={item.shopify.domain} />
              </Stack.Item>
              <Stack.Item>
                <TextField placeholder={item.email} />
              </Stack.Item>
              <Stack.Item>
                <TextField placeholder={item.shopify_plan} />
              </Stack.Item>
              <Stack.Item>
                <TextField placeholder={item.updated_at} />
              </Stack.Item>
              <Stack.Item>
                <TextField placeholder={item.created_at} />
              </Stack.Item>
              <Stack.Item>
                <TextField placeholder={item.shopify.domain} />
              </Stack.Item>
            </Stack>
          </div>
        );
      })}
    </div>
  );
}
export default Dashboardadd;
