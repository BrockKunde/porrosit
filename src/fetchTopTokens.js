import fetch from "isomorphic-fetch";
import { getChecksumAddress } from "ethjs-account";

export default () =>
  fetch("https://api.ethplorer.io/getTopTokens?apiKey=freekey", {
    method: "GET",
    mode: "cors",
    cache: "default",
  })
    .then(response => {
      if (response.status === 204 || response.s) {
        return [];
      }

      return response.json().then(json => ({ json, response }));
    })
    .then(({ json, response }) => {
      if (response.ok) {
        return json.tokens.map(token => ({
          ...token,
          address: getChecksumAddress(token.address),
        }));
      }

      return [];
    })
    .catch(error => {
      console.log("Request failed", error);
    });
