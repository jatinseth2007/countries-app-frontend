export const initialState = {
    selectedCountries: {}
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'COUNTRIES_UPSERT':
            return {
                ...state,
                selectedCountries: {
                    ...state.selectedCountries,
                    ...action.payload.countries
                }
            };
        default:
            return state;
    }
};