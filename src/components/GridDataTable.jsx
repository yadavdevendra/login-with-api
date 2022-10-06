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
  Link,
  Stack,
  Loading,
  Form,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import RemovableTagWithLink from "./RemovableTagWithLink";

function GridDataTable() {
  const [ActivePage, setActivePage] = useState(1);
  const [SelectRowPerPage, setSelectRowPerPage] = useState(10);
  const [viewTable, setViewTable] = useState([]);
  const [inputarr, setInputarr] = useState([]);
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(true); // spinnner
  const [activator, setActivator] = useState(false);
  const [viewdata, setViewdata] = useState([]);
  const [query, setQuery] = useState("");
  const [val, setVal] = useState([]);
  let tokenData = JSON.parse(sessionStorage.getItem("data"));
  let Token = tokenData?.data?.token;

  const [checked, setChecked] = useState([]);
  const handleChange = (index) => {
    const newChecked = checked.map((check, i) => {
      if (index === i) return !check;
      return check;
    });
    setChecked(newChecked);
  };
  // console.log(checked);
  // console.table(inputarr);
  // console.table(val);
  // console.log(viewdata);
  const options = [
    { label: "Row Per Page:10", value: "10" },
    { label: "Row Per Page:20", value: "20" },
    { label: "Row Per Page:50", value: "50" },
    { label: "Row Per Page:100", value: "100" },
  ];
  const options1 = [
    { label: "Equals", value: "1" },
    { label: "Not Equals", value: "2" },
    { label: "Contains", value: "3" },
    { label: "Does Not Contains", value: "4" },
    { label: "Starts With", value: "5" },
    { label: "Ends With", value: "6" },
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
      "shop_url",
    ],
  ];
  const filterarr = [
    "user_id",
    "",
    "shops.domain",
    "shops.email",
    "shops.plan_name",
    "",
    "",
    "shops.myshopify_domain",
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
          <Form onSubmit={() => handlefilters()} preventDefault>
            <TextField
              placeholder={item}
              value={inputarr[i]}
              onChange={(e) => {
                let newinputarr = [...inputarr];
                newinputarr[i] = e;
                setInputarr(newinputarr);
              }}
            />
          </Form>
        ) : (
          ""
        )}
      </>
    );
  });
  function handlefilters() {
    // let query = `&filter[user_id][${val}]=${inputarr}`;
    // setQuery(query);
    let query = "";
    filterarr.map((fildata, i) => {
      if (
        (val[i] !== "" && val[i] !== undefined) ||
        (inputarr[i] !== "" && inputarr[i] !== undefined)
      ) {
        query += `&filter[${fildata}][${val[i]}]=${inputarr[i]}`;
      }
    });
    console.log(val, inputarr);
    console.log(query);
    setQuery(query);
  }

  useEffect(() => {
    let temp = [];
    fetch(
      `https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=${ActivePage}&count=${SelectRowPerPage}${query}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${Token}` },
      }
    )
      .then((x) => x.json())
      .then((data) => {
        console.log(data);
        setCount(data?.data?.count);
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
                  let warehousesLength = Object.keys(
                    item.shopify.warehouses
                  )?.length;
                  // console.log(warehousesLength);
                  setChecked(new Array(warehousesLength).fill(true));
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
        console.log(temp, "temp");
        // setInputarr(new Array(temp.length).fill(""));
        setViewTable(temp);
        setActive(false);
      });
  }, [ActivePage, SelectRowPerPage, query]);

  //Select Row PerPage Options
  const handleSelectChange = (value) => {
    setSelectRowPerPage(value);
  };

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
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 6 }}>
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
          <TextContainer alignment="center">
            <Text variant="bodyLg" as="h3" fontWeight="bold" alignment="ceter">
              Name: {viewdata?.shopify?.name}
            </Text>
            <Text variant="bodyLg" as="h3" fontWeight="bold" alignment="ceter">
              Address: {viewdata?.shopify?.address1}
            </Text>
            <Text variant="bodyLg" as="h3" fontWeight="bold" alignment="ceter">
              City: {viewdata?.shopify?.city}
            </Text>
            <Text variant="bodyLg" as="h3" fontWeight="bold" alignment="ceter">
              Email: {viewdata?.shopify?.customer_email}
            </Text>
            <Text variant="bodyLg" as="h3" fontWeight="bold" alignment="ceter">
              Plan Display Name: {viewdata?.shopify?.plan_display_name}
            </Text>
            <Text variant="bodyLg" as="h3" fontWeight="bold" alignment="ceter">
              Phone: {viewdata?.shopify?.phone}
            </Text>
            <Text variant="bodyLg" as="h3" fontWeight="bold" alignment="ceter">
              {viewdata.length !== 0 &&
                Object.values(viewdata?.shopify?.warehouses)?.map(
                  (house, i) => {
                    return (
                      <Checkbox
                        key={house.id}
                        label={house.name}
                        checked={checked[i]}
                        onChange={() => handleChange(i)}
                      />
                    );
                  }
                )}
            </Text>
            <Text variant="bodyLg" as="h3" fontWeight="bold" alignment="center">
              Domain:
              <Link url={"https://" + viewdata?.shopify?.myshopify_domain}>
                {viewdata?.shopify?.myshopify_domain}
              </Link>
            </Text>
          </TextContainer>
        </Modal>
      </div>
    </>
  );
}

export default GridDataTable;
