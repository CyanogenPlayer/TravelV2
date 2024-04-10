import {IRes} from "../types";
import {ICountry} from "../interfaces";
import {axiosService} from "./axiosService";
import {urls} from "../constants";

const countryService = {
    getAll: (): IRes<ICountry[]> => axiosService.get(urls.countries.allCountries),
    getById: (countryId: string): IRes<ICountry> => axiosService.get(urls.countries.byId(countryId))
}

export {
    countryService
}