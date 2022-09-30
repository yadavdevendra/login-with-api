import { Page, Card, DataTable, TextField } from "@shopify/polaris";
import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function Datatable() {
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
//   const rows = [
//     ["Emerald Silk Gown", "$875.00", 124689, 140, "$122,500.00"],
//     ["Mauve Cashmere Scarf", "$230.00", 124533, 83, "$19,090.00"],
//     [
//       "Navy Merino Wool Blazer with khaki chinos and yellow belt",
//       "$445.00",
//       124518,
//       32,
//       "$14,240.00",
//     ],
//   ];
 const dev = [
    [
      "UserId",
      "Catlog",
      "Shop domain",
      "Shop email",
      "Shop Plan name",
      "Updated at",
      "Created at",
      "Shops myShopify domain",
    ]
]
  const heading = [
    [
      "UserId",
      "Catlog",
      "Shop domain",
      "Shop email",
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

  useEffect(() => {
    fetch(
      `https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=1&count=10`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        let mainArr = [];
        const myData = data.data.rows;
        // setSelected(myData);
        console.log(myData);
        myData.map((item) => {
          let arr = [];
          for (let i = 0; i < heading[1].length; i++) {
            arr[i] = item[heading[1][i]];
          }
          mainArr.push(arr);
        });
        setSelected(mainArr);

        // console.log(mainArr);
      })

      .catch((error) => console.log(error));
  }, []);
console.log(selected);
  return (
    <Page title="Data Table">
      <Card>
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
          headings={heading[0]}
          rows={selected}
        />
      </Card>
    </Page>
  );
}
export default Datatable;
