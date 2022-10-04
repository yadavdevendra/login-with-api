import {
  Page,
  Card,
  DataTable,
  Pagination,
  Select,
  Grid,
  Button,
Spinner,
  DisplayText,
  Text,
  TextField,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
  

function GridDataTable() {
  const [ActivePage, setActivePage] = useState(1);
  const [SelectRowPerPage, setSelectRowPerPage] = useState(10);
  const [viewTable, setViewTable] = useState([]);
  const [inputarr , setInputarr] = useState([]);
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(true); // spinnner
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
  console.log("Euals", inputarr);
  const head = heading[0].map((item,i) => {
    return (
      <>
        <DisplayText element="p" size="small">
          {item}
        </DisplayText>
        <Select options={options1} />
        <TextField
          placeholder={item}
          value={inputarr[i]}
          onChange={(e) => {
            let newinput = [...inputarr]
            newinput[i] = e
            setInputarr(newinput)
          }}
        />
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
        // console.log(data);
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
        // console.log(temp, "temp");
        setInputarr(new Array(heading[0].length).fill(""))
        setViewTable(temp);
        setActive(false)
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
            columns={{ xs: 6, sm: 4, md:4, lg: 4, xl: 4 }}
            areas={{
              xl: ["product sales sales space orders orders"],
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
              <Select placeholder="Select Rows Per Page"
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

        <Grid
          columns={{ xs: 6, sm: 4, md: 12, lg: 8, xl: 1 }}
        >
          <Card>
            <Grid.Cell area="product">
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
          </Card>
        </Grid>
        {active && (
          <Spinner accessibilityLabel="Spinner example" size="large" />
        )}
      </Page>
    </>
  );
}

export default GridDataTable;
