import {
    gql
} from "@apollo/client";

export const FETCH_COUNTRIES = gql`
    query Countries($name: String!) {
        Countries(name: $name){
            name,
            population,
            currencies{
                name,
                code,
                symbol,
                exchangeRate
            }
        }
    }
`;