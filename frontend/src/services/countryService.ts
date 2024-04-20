import {IRes} from "../types";
import {ICountry} from "../interfaces";
import {axiosService} from "./axiosService";
import {urls} from "../constants";

const countryService = {
    getAll: (): IRes<ICountry[]> => axiosService.get(urls.countries.allCountries)
}

export {
    countryService
}