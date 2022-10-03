import {
  Page,
  Card,
  DataTable,
  Pagination,
  Select,
  Grid,
  Button,
  Stack,
  DisplayText,
  Text,
  TextField,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";

function GridDataTable() {
  const [ActivePage, setActivePage] = useState(1);
  const [SelectRowPerPage, setSelectRowPerPage] = useState(10);
  const [viewTable, setViewTable] = useState([]);
  const [count, setCount] = useState(0);
  let tokenData = JSON.parse(sessionStorage.getItem("data"));
  let Token = tokenData?.data?.token;

  const options = [
    { label: "Row Per Page:10", value: "10" },
    { label: "Row Per Page:20", value: "20" },
    { label: "Row Per Page:50", value: "50" },
    { label: "Row Per Page:100", value: "100" },
  ];
  const options1 = [{ label: "Equals", value: "100" }];
  const heading = [
    [
      "User_Id",
      "Catlog",
      "Shop domain",
      "Email",
      "Shop Plan name",
      "Updated at",
      "Created at",
      "Shops myShopify domain",
    ],
    [
      "id",
      "catalog",
      "shop_url",
      "email",
      "shopify_plan",
      "updated_at",
      "created_at",
      "username",
    ],
  ];
  const head = heading[0].map((item) => {
    return (
      <>
        <DisplayText element="p" size="small">
          {item}
        </DisplayText>
        <Select options={options1} value="" onChange={() => {}} />
        <TextField placeholder={item} />
      </>
    );
  });
  useEffect(() => {
    let temp = [];
    fetch(
      `https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=${ActivePage}&count=${SelectRowPerPage}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${Token}` },
      }
    )
      .then((x) => x.json())
      .then((data) => {
        console.log(data);
        setCount(data.count);
        data?.data?.rows.map((item) => {
          // let arr = [];
          // for (let i = 0; i < heading[1].length; i++) {
          //   arr[i] = item[heading[1][i]];
          // }
          let arr = heading[1].map((_, i) => {
            return item[heading[1][i]];
          });
          temp.push(arr);
          // temp.push(h)
          // temp = [...arr];
        });
        console.log(temp, "temp");
        setViewTable(temp);
      });
  }, [ActivePage, SelectRowPerPage]);

  //Select Row PerPage Options
  const handleSelectChange = (value) => {
    setSelectRowPerPage(value);
  };

  // Table Row

  return (
    <>
      <Page fullWidth>
        <Text variant="headingLg" as="h1" alignment="start">
          Data Grid......
        </Text>
        <Text variant="headingLg" as="h1" size="large" alignment="start">
          {`showing from ${(ActivePage - 1) * SelectRowPerPage + 1} to ${
            ActivePage * SelectRowPerPage
          } of Users`}
        </Text>

        <Card sectioned>
          <Grid
            columns={{ xs: 1, sm: 4, md: 8, lg: 6, xl: 6 }}
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
                label={ActivePage}
                hasPrevious
                onPrevious={() => {
                  if (ActivePage === 1) {
                    setActivePage(1);
                    return;
                  }
                  setActivePage(ActivePage - 1);
                }}
                hasNext
                onNext={() => {
                  if (ActivePage === Math.ceil(count / SelectRowPerPage)) {
                    setSelectRowPerPage(Math.ceil(count / SelectRowPerPage));
                    return;
                  }
                  setActivePage(ActivePage + 1);
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
                value={SelectRowPerPage}
              />
            </Grid.Cell>
            <Grid.Cell area="orders">
              <Button
                style={{
                  height: "60px",
                }}
              >
                View Columns
              </Button>
            </Grid.Cell>
          </Grid>
        </Card>

        <Card>
          <Grid>
          
            <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 8, lg: 8, xl: 12 }}>
              <DataTable
                columnContentTypes={[
                  "numeric",
                  "text",
                  "text",
                  "text",
                  "text",
                  "text",
                  "text",
                  "text",
                ]}
                headings={head}
                rows={viewTable}
              />
            </Grid.Cell>
          </Grid>
        </Card>
      </Page>
    </>
  );
}

export default GridDataTable;
