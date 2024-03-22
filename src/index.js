import jsonfile from "jsonfile";
import fetchExodusMovementTokens from "./fetchExodusMovementTokens";
import fetchKvhnukeTokens from "./fetchKvhnukeTokens";
import fetchTopTokens from "./fetchTopTokens";

Promise.all([fetchKvhnukeTokens(), fetchExodusMovementTokens()])
  .then(([kvhnukeTokens, exodusMovementTokens]) =>
    kvhnukeTokens.map(kvhnukeToken => {
      const exodusMovementToken =
        exodusMovementTokens.find(t => t.address === kvhnukeToken.address) || {};

      return {
        address: kvhnukeToken.address,
        symbol: kvhnukeToken.symbol,
        decimals: kvhnukeToken.decimals,
        name: exodusMovementToken.properName || kvhnukeToken.symbol,
      };
    })
  )
  .then(tokens => {
    jsonfile.writeFile("eth-tokens.json", tokens, err => {
      console.error(err);
    });
  });

fetchTopTokens().then(tokens => {
  jsonfile.writeFile(
    "top50.json",
    tokens.map(token => ({
      address: token.address,
      name: token.name,
      decimals: token.decimals,
      symbol: token.symbol,
    })),
    err => {
      console.error(err);
    }
  );
});
