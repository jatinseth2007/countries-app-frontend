import { abbrNum, formatAmount } from '../../helpers/_common';
import { useStateValue } from '../../dataLayer/StateProvider';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';

export const CountriesList = () => {
    const [{ selectedCountries }, dispatch] = useStateValue();

    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Population</TableCell>
                        <TableCell align="center">Currency Name</TableCell>
                        <TableCell align="center">Currency Symbol</TableCell>
                        <TableCell align="center">Amount</TableCell>
                        <TableCell align="right">Exchanged</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.values(selectedCountries).map((row) => (
                        <TableRow key={row.name}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="center">{abbrNum(row.population, 2)}</TableCell>
                            <TableCell align="center">{row.currencies[0].name}</TableCell>
                            <TableCell align="center">{row.currencies[0].symbol}</TableCell>
                            <TableCell align="center">{row.amount} {row.currencies[0].code}</TableCell>
                            <TableCell align="right">{(row.currencies[0].exchangeRate) ? formatAmount(row.amount * row.currencies[0].exchangeRate, 2) : 0} SEK</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};