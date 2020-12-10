$(document).ready(function () {
  $("#btnAccounts").click(function () {
    fetch("/tokenvortex/accounts/", {
      method: "GET",
      headers: {
        "authorization": "bearer bearertoken1",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });
  });
});
