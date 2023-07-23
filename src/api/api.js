const API_URL = "https://raw.githubusercontent.com/ZheniaEU/meros-equity";

const checkResponse = (res) => {
   return res.ok ? res.json() : res.json().then((res) =>
      Promise.reject({ res }));
};

export async function getOkvedTreeData() {
   const response = await fetch(`${API_URL}/master/src/mocks/okvedTreeData.json`, {
      method: "GET",
      headers: {
         "Accept": "application/json"
      }
   });

   return checkResponse(response);
}
