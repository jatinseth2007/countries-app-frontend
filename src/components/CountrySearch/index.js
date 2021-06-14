import './index.css';
import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Autocomplete } from '@material-ui/lab';
import { addTokenHeader } from '../../helpers/_common';
import { TextField, Box, Button } from '@material-ui/core';
import { useStateValue } from '../../dataLayer/StateProvider';
import { FETCH_COUNTRIES } from '../../dataLayer/models/country';

export const CountrySearch = () => {
    const defaultErrorMessage = `we are facing error while searching, please try again later.`;
    const [amount, setAmount] = useState(0);
    const [selectedCountry, setSelectedCountry] = useState({});
    const [countryError, setCountryError] = useState('');
    const [amountError, setAmountError] = useState('');
    const [{ selectedCountries }, dispatch] = useStateValue();
    const [fetchCountries, { loading, data }] = useLazyQuery(FETCH_COUNTRIES, {
        onError: (error) => {
            const message = (error?.message) ? error.message : defaultErrorMessage;
            setCountryError(message);
        },
        context: {
            headers: {
                ...addTokenHeader()
            }
        }
    });

    const countriesSearchHandler = (searchText) => {
        if (searchText.length < 3) return;

        fetchCountries({
            variables: {
                name: searchText
            }
        });
    };

    const addCountriesHandler = () => {
        try {
            //validate Input
            const isValidated = validateForm();
            if (isValidated) {
                // add the countries to globl state...
                dispatch({
                    type: "COUNTRIES_UPSERT",
                    payload: {
                        countries: {
                            [selectedCountry.name]: {
                                ...selectedCountry,
                                amount
                            },
                        },
                    }
                });
                reset();
            }//EOI
        } catch (error) {
            console.error(error);
        }
    }

    const validateForm = () => {
        try {
            let isValid = true;
            //validating the country
            if (Object.keys(selectedCountry).length <= 0) {
                setCountryError("Invalid country");
                isValid = false;
            }//EOI
            //validating the amount
            if (amount <= 0) {
                setAmountError("Invalid amount");
                isValid = false;
            }//EOI

            return isValid;
        } catch (error) {
            throw error;
        }
    }

    const reset = () => {
        try {
            setSelectedCountry({});
            setAmount(0);
            setCountryError("");
            setAmountError("");
        } catch (error) {
            throw error;
        }
    }

    return (
        <div className="country-search-container">
            <h4 className="mb-1">Add Country</h4>
            <form onSubmit={(e) => {
                e.preventDefault();
                addCountriesHandler();
            }}>
                <Box className="" display="flex" justifyContent="center">
                    <Box display="flex" flexDirection="column">
                        <Autocomplete
                            size="small"
                            autoComplete={true}
                            autoHighlight={true}
                            id="combo-box-demo"
                            options={(data?.Countries) ? data.Countries : []}
                            loading={loading}
                            multiple={false}
                            getOptionLabel={(option) => {
                                let output = "";
                                if (option?.name) {
                                    output = option.name;
                                }
                                return output;
                            }}
                            style={{ width: 500 }}
                            renderInput={(params) => <TextField {...params} label="Search Country" variant="outlined" required={Object.keys(selectedCountry).length === 0} />}
                            onInputChange={(e, v) => {
                                if (e?.target?.value === v)
                                    countriesSearchHandler(v);
                            }}
                            onChange={(e, v) => {
                                if (v && v?.name)
                                    setSelectedCountry(v);
                            }}
                            getOptionSelected={(o, v) => {
                                let output = false;
                                if (o?.name && v?.name) {
                                    output = o.name.toUpperCase() === v.name.toUpperCase();
                                }
                                return output;
                            }}
                            value={selectedCountry}
                        />
                        {
                            (countryError.length > 0) && (<Box component="span" className="fs-m error">{countryError}</Box>)
                        }
                    </Box>
                    <Box display="flex" flexDirection="column">
                        <TextField
                            size="small"
                            error={false}
                            id="outlined-error-helper-text"
                            label="Amount"
                            helperText={``}
                            variant="outlined"
                            required
                            type="number"
                            step="any"
                            value={amount}
                            onChange={(e) => {
                                setAmount(e.target.value);
                            }}
                        />
                        {
                            (amountError.length > 0) && (<Box component="span" className="fs-m error">{amountError}</Box>)
                        }
                    </Box>
                </Box>
                <Box display="flex" className="mt-1">
                    <Button variant="contained" color="primary" type="submit">
                        Add
                    </Button>
                </Box>
            </form>
        </div>
    );
};