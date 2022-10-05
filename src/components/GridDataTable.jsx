import {
  Page,
  Card,
  DataTable,
  Pagination,
  Select,
  Grid,
  Button,
  DisplayText,
  Text,
  TextField,
  SkeletonBodyText,
  SkeletonPage,
  Modal,
  TextContainer,
  Checkbox,
} from "@shopify/polaris";
import React, { useEffect, useState, useCallback } from "react";

function GridDataTable() {
  const [ActivePage, setActivePage] = useState(1);
  const [SelectRowPerPage, setSelectRowPerPage] = useState(10);
  const [viewTable, setViewTable] = useState([]);
  const [inputarr, setInputarr] = useState([]);
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(true); // spinnner
  const [activator, setActivator] = useState(false);
  const [viewdata, setViewdata] = useState([]);
  //  const [active, setActive] = useState(true);
  const [val, setVal] = useState([]);
  let tokenData = JSON.parse(sessionStorage.getItem("data"));
  let Token = tokenData?.data?.token;
   const [checked, setChecked] = useState(true);
   const handleChange = useCallback((newChecked) => setChecked(newChecked), []);
  // console.table(inputarr);
  // console.table(val);
  console.log(viewdata);
  const options = [
    { label: "Row Per Page:10", value: "10" },
    { label: "Row Per Page:20", value: "20" },
    { label: "Row Per Page:50", value: "50" },
    { label: "Row Per Page:100", value: "100" },
  ];
  const options1 = [
    { label: "Equals", value: "100" },
    { label: "Row ", value: "20" },
    { label: "Page ", value: "50" },
  ];
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
      "Action",
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
  // console.log("Euals", inputarr);
  // console.log("viewtable",viewTable);
  console.log(viewdata);
  const head = heading[0].map((item, i) => {
    // console.log("item",item);
    return (
      <>
        <DisplayText element="p" size="small">
          {item}
        </DisplayText>
        {item != "Action" ? (
          <Select
            options={options1}
            value={val[i]}
            onChange={(e) => {
              let newval = [...val];
              newval[i] = e;
              setVal(newval);
            }}
          />
        ) : (
          ""
        )}
        {item != "Action" ? (
          <TextField
            placeholder={item}
            value={inputarr[i]}
            onChange={(e) => {
              let newinputarr = [...inputarr];
              newinputarr[i] = e;
              setInputarr(newinputarr);
            }}
          />
        ) : (
          ""
        )}
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
        setCount(data.data.count);
        data?.data?.rows.map((item) => {
          //// use the for loop
          // let arr = [];
          // for (let i = 0; i < heading[1].length; i++) {
          //   arr[i] = item[heading[1][i]];
          //   arr.push(<Button>View</Button>);
          // }
          //// use the map
          // let arr = heading[1].map((_, i) => {
          //   return item[heading[1][i]];
          // });
          // use the forEach method
          let arr = [];
          heading[1].forEach((_, i) => {
            arr[i] = item[heading[1][i]];
            arr.push(
              <Button
                onClick={() => {
                  setActivator(true);
                  setViewdata(item);
                }}
                primary
              >
                View Details
              </Button>
            );
          });
          temp.push(arr);
        });
        // console.log(temp, "temp");
        // setInputarr(new Array(temp.length).fill(""));
        setViewTable(temp);
        setActive(false);
      });
  }, [ActivePage, SelectRowPerPage]);

  //Select Row PerPage Options
  const handleSelectChange = (value) => {
    setSelectRowPerPage(value);
  };
  // const handleChange =(()=>{
  //   setActivator(true);
  // })

  // Table Row

  return (
    <>
      <Page fullWidth>
        <Text variant="headingLg" as="h1" alignment="start">
          Data Grid......
        </Text>
        <Text variant="headingLg" as="h1" size="large" alignment="start">
          {`showing from ${
            (ActivePage - 1) * (SelectRowPerPage + 1) <= count
          } to ${ActivePage * SelectRowPerPage < count} of ${count} Users`}
        </Text>

        <Card sectioned>
          <Grid columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
            <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 4, xl: 1 }}>
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
            <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4 }}>
              <Select
                placeholder="Select Rows Per Page"
                style={{
                  height: "60px",
                  background: "aquamarine",
                }}
                options={options}
                onChange={handleSelectChange}
                value={SelectRowPerPage}
              />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4 }}>
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
            <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 12, xl: 4 }}>
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
        {active && (
          <SkeletonPage primaryAction>
            <SkeletonBodyText />
          </SkeletonPage>
        )}
      </Page>
      <div style={{ height: "500px" }}>
        <Modal
          open={activator}
          onClose={() => {
            setActivator(false);
          }}
          title="Get shopify details of a specific user on Grid"
        >
          <TextContainer>
            <Text title=""> Name:{viewdata?.shopify?.name}</Text>
            <Text>Address:{viewdata?.shopify?.address1}</Text>
            <Text>City:{viewdata?.shopify?.city}</Text>
            <Text>Email: {viewdata?.shopify?.customer_email}</Text>
            <Text>
              Plan Display Name:{viewdata?.shopify?.plan_display_name}
            </Text>
            <Text>Phone:{viewdata?.shopify?.phone}</Text>
            <Checkbox
              label={viewdata?.shopify?.warehouses[0]?.name}
              checked={checked}
              onChange={handleChange}
            />
          </TextContainer>
        </Modal>
      </div>
    </>
  );
}

export default GridDataTable;
