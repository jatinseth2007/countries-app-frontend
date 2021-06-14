import { Header } from '../components/Header';
import { CountrySearch } from '../components/CountrySearch';
import { CountriesList } from '../components/CountriesList';

export const Home = () => {
    return (
        <>
            <Header></Header>
            <CountrySearch></CountrySearch>
            <CountriesList></CountriesList>
        </>
    );
};